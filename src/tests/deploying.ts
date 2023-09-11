import { ECDSAProvider } from "@zerodev/sdk";
import { type Hex } from "viem";
import { type SmartAccountSigner } from "@alchemy/aa-core";
import type { Project } from "../../src/types";
import { PROVIDERS } from "../../src/constants";

type DeployingOptions = {
    project: Project
    owner: SmartAccountSigner
    provider?: typeof PROVIDERS[number]
}

export async function deploying({ project, owner, provider}: DeployingOptions) {
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

    const { hash } = await ecdsaProvider.sendUserOperation({
        target: "0x0000000000000000000000000000000000000000",
        data: "0x",
        value: 0n,
    });

    expect(hash).toBeDefined()

    expect(await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)).toBeDefined()
}
