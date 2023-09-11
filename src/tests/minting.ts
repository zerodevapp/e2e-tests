import { ECDSAProvider } from "@zerodev/sdk";
import { type Hex, encodeFunctionData, type PublicClient } from "viem";
import { type SmartAccountSigner, type UserOperationCallData } from "@alchemy/aa-core";
import type { Contract, Project } from "../../src/types";
import { PROVIDERS } from "../../src/constants";

type MintingOptions = {
    project: Project
    owner: SmartAccountSigner
    publicClient: PublicClient
    erc721: Contract
    provider?: typeof PROVIDERS[number]
}

export async function minting({ project, owner, publicClient, erc721, provider}: MintingOptions) {
    let ecdsaProvider = await ECDSAProvider.init({
        projectId: project.id, 
        bundlerProvider: provider,
        owner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
                paymasterProvider: provider
            },
        }
    });
    const address = await ecdsaProvider.getAddress()

    const oldBalance = await publicClient.readContract({ address: erc721.address, abi: erc721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    const userOperation: UserOperationCallData = {
        target: erc721.address,
        data: encodeFunctionData({abi: erc721.abi, functionName: 'mint', args: [address]})
    }

    const { hash } = await ecdsaProvider.sendUserOperation(userOperation);

    await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)

    const newBalance = await publicClient.readContract({ address: erc721.address, abi: erc721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    expect(newBalance).toBe(oldBalance + 1n)
}
