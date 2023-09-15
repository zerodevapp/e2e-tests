import { ECDSAProvider, SessionKeyProvider } from "@zerodev/sdk";
import { type PublicClient } from "viem";
import { PrivateKeySigner, type SmartAccountSigner } from "@alchemy/aa-core";
import type { Contract, Project } from "../../src/types";
import { generatePrivateKey } from "viem/accounts";
import { batching } from "./batching";
import type { ExpectStatic } from "vitest";

type SessionKeyOptions = {
    project: Project
    owner: SmartAccountSigner
    publicClient: PublicClient
    erc721: Contract
}

export async function sessionKey({ project, owner, publicClient, erc721}: SessionKeyOptions, expect: ExpectStatic) {
    let ecdsaProvider = await ECDSAProvider.init({
        projectId: project.id, 
        owner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
            },
        }
    });
     
    const sessionKey = PrivateKeySigner.privateKeyToAccountSigner(generatePrivateKey())

    const sessionKeyProvider = await SessionKeyProvider.init({
        projectId: project.id,
        defaultProvider: ecdsaProvider,
        sessionKey,
        sessionKeyData: {
            validAfter: 0,
            validUntil: 9999999999,
            permissions: []
        }
    })
    await batching({ provider: sessionKeyProvider, publicClient, erc721 }, expect)
}
