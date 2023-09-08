import { ECDSAProvider } from "@zerodev/sdk";
import { type Hex, encodeFunctionData, type PublicClient, createPublicClient, http } from "viem";
import { PrivateKeySigner, type SmartAccountSigner, type UserOperationCallData } from "@alchemy/aa-core";
import type { Contract, Project } from "../../src/types";
import { createGasSponsoringPolicy, createProject, deleteProject } from "../../src/api";
import { CHAIN_MAP, CHAIN_NODE_MAP, ERC721_ABI, ERC721_MAP, PRIVATE_KEY, PROVIDERS, TEAM_ID } from "../../src/constants";
import * as chains from 'viem/chains'

interface LocalTestContext  {
    project: Project,
    publicClient: PublicClient,
    erc721: Contract,
    owner: SmartAccountSigner
}

describe.each(['arbitrum', 'polygonMumbai', 'goerli'] as const)(
    'batching',
    (chainName) => {
        beforeEach<LocalTestContext>(async (context) => {
            const chainId = CHAIN_MAP[chainName]
            context.project = await createProject(TEAM_ID, 'Random Project', chainId)
            await createGasSponsoringPolicy(context.project.id)
            
            context.publicClient = createPublicClient({ 
                chain: (Object.values(chains)).find(chain => chain.id === parseInt(chainId)) as chains.Chain,
                transport: http(CHAIN_NODE_MAP[chainName])
            })

            context.erc721 = {
                address: ERC721_MAP[chainName],
                abi: ERC721_ABI
            }

            context.owner = PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY)
        })
        afterEach<LocalTestContext>(async (context) => {
            await deleteProject(context.project.id)
        })
        describe.each(PROVIDERS)(
            `${chainName}`,
            (provider) => {
                it<LocalTestContext>(provider, async ({project, owner, erc721, publicClient}) => {
                    let ecdsaProvider = await ECDSAProvider.init({
                        projectId: project.id, 
                        owner,
                        bundlerProvider: provider,
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

                    const { hash } = await ecdsaProvider.sendUserOperation([
                        userOperation,
                        userOperation
                    ]);
                    await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)

                    const newBalance = await publicClient.readContract({ address: erc721.address, abi: erc721.abi, functionName: 'balanceOf', args: [address] }) as bigint

                    expect(newBalance).toBe(oldBalance + 2n)

                }, 120000)
            }
        )
    }
)
