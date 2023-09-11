import { ECDSAProvider } from "@zerodev/sdk";
import { encodeFunctionData, type Hex, type PublicClient } from "viem";
import type { Contract, Project } from "../types";
import type { SmartAccountSigner, UserOperationCallData } from "@alchemy/aa-core";
import { createGasSponsoringPolicy, createProject } from "../api";
import { deploying } from "./deploying";

type ERC20GasOptions = {
	project: Project
	owner: SmartAccountSigner,
	publicClient: PublicClient
	erc20: Contract
}

export async function erc20Gas({ project, owner, publicClient, erc20 }: ERC20GasOptions) {
    const ecdsaProvider = await ECDSAProvider.init({
        projectId: project.id, 
        owner,
        opts: {
            paymasterConfig: {
                policy: 'VERIFYING_PAYMASTER',
            },
        }
    });

    const projectWithoutSponsoring = await createProject(project.teamId, 'Sponsorless', project.chainId)

    const erc20ECDSAProvider = await ECDSAProvider.init({
        projectId: projectWithoutSponsoring.id, 
        owner,
        opts: {
            paymasterConfig: {
                policy: 'TOKEN_PAYMASTER',
                gasToken: 'TEST_ERC20'
            },
        }
    })

	const address = await ecdsaProvider.getAddress()

	const getBalance = async () => await publicClient.readContract({ address: erc20.address, abi: erc20.abi, functionName: 'balanceOf', args: [address] }) as bigint
	let balanceSnapshot: bigint
	let oldBalanceSnapshot = await getBalance()
	expect(oldBalanceSnapshot).toBe(0n)

	const userOperation: UserOperationCallData = {
		target: erc20.address,
		data: encodeFunctionData({abi: erc20.abi, functionName: 'mint', args: [address, 1000000000]})
	}
	const { hash } = await ecdsaProvider.sendUserOperation(userOperation);
	await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)

	// minted erc20 token
	balanceSnapshot = await getBalance()
	expect(balanceSnapshot).toBeGreaterThan(oldBalanceSnapshot)
	oldBalanceSnapshot = balanceSnapshot

	// uses gas sponsoring by default
	await deploying({ provider: ecdsaProvider })
	balanceSnapshot = await getBalance()
	expect(balanceSnapshot).toBe(oldBalanceSnapshot)
	oldBalanceSnapshot = balanceSnapshot

	// uses erc20 gas
	await deploying({ provider: erc20ECDSAProvider })
	balanceSnapshot = await getBalance()
	expect(balanceSnapshot).toBeLessThan(oldBalanceSnapshot)
	oldBalanceSnapshot = balanceSnapshot

	// if gas sponsoring is set, it overwrites erc20 gas payment
	await createGasSponsoringPolicy(projectWithoutSponsoring)
	await deploying({ provider: erc20ECDSAProvider })
	balanceSnapshot = await getBalance()
	expect(balanceSnapshot).toBe(oldBalanceSnapshot)
}
