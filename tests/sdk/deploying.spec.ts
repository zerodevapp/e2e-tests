import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { deploying } from "../../src/tests/deploying";
import { ECDSAProvider } from "@zerodev/sdk";
import { createGasSponsoringPolicy, createProject, deleteProject } from "../../src/api";
import { CHAIN_MAP, PROVIDERS } from "../../src/constants";
import { teamFixtures } from "../../src/fixtures/teamFixtures";

const chains = ['arbitrum', 'polygonMumbai', 'goerli', 'polygon', 'base', 'sepolia'] as const

// runs test for each chain
describe.sequential('deploying', () => {
    for (let provider of PROVIDERS)  {
        describe(provider || 'Default', () => {
            for (let chain of chains) {
                it.extend(ownerFixtures).extend(teamFixtures).concurrent(
                    chain,
                    async ({privateKeyOwner: owner, team, expect}) => {
                        const project = await createProject(team, 'TestProject', CHAIN_MAP[chain])
                        await createGasSponsoringPolicy(project)
                        const ecdsaProvider = await ECDSAProvider.init({
                            projectId: project.id, 
                            owner,
                            bundlerProvider: provider,
                            opts: {
                                paymasterConfig: {
                                    policy: "VERIFYING_PAYMASTER",
                                    paymasterProvider: provider,
                                },
                                providerConfig: {
                                    bundlerProvider: provider
                                }
                            }
                        });
                        await deploying({ provider: ecdsaProvider }, expect)
                        await deleteProject(project)
                    },
                    60000
                )
            }
        })
    }
})
