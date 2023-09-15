import { ECDSAProvider } from "@zerodev/sdk";
import { PrivateKeySigner, type SmartAccountSigner } from "@alchemy/aa-core";
import type { Project } from "../../src/types";
import { generatePrivateKey } from "viem/accounts";
import { deploying } from "./deploying";
import type { Hex } from "viem";
import type { ExpectStatic } from "vitest";

type ChangeOwnerOptions = {
    project: Project
    owner: SmartAccountSigner
}

export async function changeOwner({ project, owner: originalOwner}: ChangeOwnerOptions, expect: ExpectStatic) {
    const newOwner = PrivateKeySigner.privateKeyToAccountSigner(generatePrivateKey())

    let ecdsaProvider = await ECDSAProvider.init({
        projectId: project.id, 
        owner: originalOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
            },
        }
    });

    const accountAddress = await ecdsaProvider.getAddress()

    await deploying({ provider: ecdsaProvider }, expect)

    const { hash} = await ecdsaProvider.changeOwner(await newOwner.getAddress())
    await ecdsaProvider.waitForUserOperationTransaction(hash as Hex);

    await expect(() => deploying({provider: ecdsaProvider }, expect)).rejects.toThrowError(/The bundler has failed to include UserOperation in a batch:/)

    ecdsaProvider = await ECDSAProvider.init({
        projectId: project.id, 
        owner: newOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
            },
            accountConfig: { 
                accountAddress
            },
        }
    });

    await deploying({ provider: ecdsaProvider }, expect)
}
