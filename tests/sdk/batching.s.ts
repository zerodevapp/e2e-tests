import { batching } from "../../src/tests";
import { CHAIN_MAP, CHAIN_NODE_MAP, ERC721_ABI, ERC721_MAP, PROVIDERS } from "../../src/constants";
import { createGasSponsoringPolicy, createProject, createTeam, deleteProject } from "../../src/api";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { createPublicClient, http } from "viem";
import * as viemChains from 'viem/chains'
import { ECDSAProvider } from "@zerodev/sdk";
import { teamFixtures } from "../../src/fixtures/teamFixtures";

const chains = ['arbitrum', 'polygonMumbai', 'goerli', 'polygon', 'base', 'sepolia'] as const

// runs test for each chain
describe.sequential('batching', () => {
    for (let provider of PROVIDERS)  {
        describe(provider, () => {
            // beforeAll(async () => {
            //     await Promise.all((await listProjects(TEAM_ID)).map(deleteProject))
            // })
            // afterAll(async () => {
            //     await Promise.all((await listProjects(TEAM_ID)).map(deleteProject))
            // })
            for (let chain of chains) {
                it.extend(ownerFixtures).extend(teamFixtures).concurrent(
                    chain,
                    async ({privateKeyOwner: owner, team, expect}) => {
                        const chainId = CHAIN_MAP[chain]
                        const project = await createProject(team.id, 'TestProject', chainId)
                        await createGasSponsoringPolicy(project)
                        const ecdsaProvider = await ECDSAProvider.init({
                            projectId: project.id, 
                            owner,
                            opts: {
                                paymasterConfig: {
                                    policy: "VERIFYING_PAYMASTER",
                                },
                            }
                        });
                        const publicClient = createPublicClient({ 
                            chain: (Object.values(viemChains)).find(chain => chain.id === parseInt(chainId)) as viemChains.Chain,
                            transport: http(CHAIN_NODE_MAP[chain])
                        })
                        const erc721 = {
                            address: ERC721_MAP[chain],
                            abi: ERC721_ABI
                        }
                        await batching({provider: ecdsaProvider, publicClient, erc721 }, expect),
                        await deleteProject(project)
                    },
                    240000
                )
            }
        })
    }
})
