import { type PublicClient } from "viem";
import { PrivateKeySigner, type SmartAccountSigner } from "@alchemy/aa-core";
import type { Contract, Project } from "../../src/types";
import { PROVIDERS, TEAM_ID } from "../../src/constants";
import { erc721Context, projectContext, publicClientContext } from "../../src/contexts";
import { batching } from "../../src/tests";
import { generatePrivateKey } from "viem/accounts";
import { ECDSAProvider } from "@zerodev/sdk";

interface LocalTestContext  {
    project: Project,
    publicClient: PublicClient,
    erc721: Contract,
    owner: SmartAccountSigner
}

const chains = ['arbitrum', 'polygonMumbai', 'goerli', 'polygon'] as const

// runs test for each chain
describe.each(chains)(
    'batching',
    (chainName) => {
        const projectPayload = { chainName, teamId: TEAM_ID, projectName: 'TestProject' }
        beforeEach(projectContext.beforeEach(projectPayload))
        afterEach(projectContext.afterEach(projectPayload))

        beforeEach(publicClientContext.beforeEach({ chainName }))
        beforeEach(erc721Context.beforeEach({ chainName }))

        beforeEach<LocalTestContext>(context => {
            context.owner = PrivateKeySigner.privateKeyToAccountSigner(generatePrivateKey())
        })

        // runs test for each provider
        describe.each(PROVIDERS)(
            `${chainName}`,
            (provider) => {
                it<LocalTestContext>(provider, async ({project, owner, erc721, publicClient}) => {
                    const ecdsaProvider = await ECDSAProvider.init({
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
                    await batching({
                        provider: ecdsaProvider,
                        erc721,
                        publicClient,
                    })
                }, 480000)
            }
        )
    }
)
