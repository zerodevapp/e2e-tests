import { ZeroDevProvider } from "@zerodev/sdk";
import { type Hex, encodeFunctionData, type PublicClient } from "viem";
import { type UserOperationCallData } from "@alchemy/aa-core";
import type { Contract } from "../../src/types";
import type { ExpectStatic } from "vitest";

type BatchingOptions = {
    provider: ZeroDevProvider
    publicClient: PublicClient
    erc721: Contract
}

export async function batching({ provider, publicClient, erc721}: BatchingOptions, expect: ExpectStatic) {
    const address = await provider.getAddress()

    const oldBalance = await publicClient.readContract({ address: erc721.address, abi: erc721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    const userOperation: UserOperationCallData = {
        target: erc721.address,
        data: encodeFunctionData({abi: erc721.abi, functionName: 'mint', args: [address]})
    }

    const { hash } = await provider.sendUserOperation([
        userOperation,
        userOperation
    ]);
    await provider.waitForUserOperationTransaction(hash as Hex)

    const newBalance = await publicClient.readContract({ address: erc721.address, abi: erc721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    expect(newBalance).toBe(oldBalance + 2n)
}
