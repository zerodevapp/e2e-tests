import { type PublicClient } from "viem";
import { PrivateKeySigner, type SmartAccountSigner } from "@alchemy/aa-core";
import type { Contract, Project } from "../../src/types";
import { PRIVATE_KEY, PROVIDERS, TEAM_ID } from "../../src/constants";
import { erc721Context, projectContext, publicClientContext } from "../../src/contexts";
import { batching } from "../../src/tests";

interface LocalTestContext  {
    project: Project,
    publicClient: PublicClient,
    erc721: Contract,
    owner: SmartAccountSigner
}

const chains = ['arbitrum', 'polygonMumbai', 'goerli'] as const

// runs test for each chains
describe.each(chains)(
    'batching',
    (chainName) => {
        const projectPayload = { chainName, teamId: TEAM_ID, projectName: 'TestProject' }
        beforeEach(projectContext.beforeEach(projectPayload))
        afterEach(projectContext.afterEach(projectPayload))

        beforeEach(publicClientContext.beforeEach({ chainName }))
        beforeEach(erc721Context.beforeEach({ chainName }))

        beforeEach<LocalTestContext>(context => {
            context.owner = PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY)
        })

        // runs test for each provider
        describe.each(PROVIDERS)(
            `${chainName}`,
            (provider) => {
                it<LocalTestContext>(provider, async ({project, owner, erc721, publicClient}) => {
                    await batching({
                        project,
                        owner,
                        erc721,
                        publicClient,
                        provider
                    })
                }, 120000)
            }
        )
    }
)
