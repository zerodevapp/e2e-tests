import {
  ECDSAProvider,
  Operation,
  ParamCondition,
  SessionKeyProvider,
} from "@zerodev/sdk";
import { getFunctionSelector, pad, type PublicClient } from "viem";
import { PrivateKeySigner, type SmartAccountSigner } from "@alchemy/aa-core";
import type { Contract, Project, Provider } from "../../src/types";
import { generatePrivateKey } from "viem/accounts";
import type { ExpectStatic } from "vitest";
import { minting } from "./minting";

type SessionKeyOptions = {
  project: Project;
  owner: SmartAccountSigner;
  publicClient: PublicClient;
  erc721: Contract;
  provider?: Provider;
};

export async function sessionKey(
  { project, owner, publicClient, erc721, provider }: SessionKeyOptions,
  expect: ExpectStatic,
) {
  let ecdsaProvider = await ECDSAProvider.init({
    projectId: project.id,
    owner,
    bundlerProvider: provider,
    opts: {
      paymasterConfig: {
        policy: "VERIFYING_PAYMASTER",
        paymasterProvider: provider,
      },
      providerConfig: {
        bundlerProvider: provider,
      },
    },
  });

  const sessionKey = PrivateKeySigner.privateKeyToAccountSigner(
    generatePrivateKey(),
  );

  const sessionKeyProvider = await SessionKeyProvider.init({
    projectId: project.id,
    defaultProvider: ecdsaProvider,
    bundlerProvider: provider,
    opts: {
      paymasterConfig: {
        policy: "VERIFYING_PAYMASTER",
        paymasterProvider: provider,
      },
      providerConfig: {
        bundlerProvider: provider,
      },
    },
    usePaymaster: true,
    sessionKey,
    sessionKeyData: {
      validAfter: 0,
      validUntil: 9999999999,
      permissions: [
        {
          target: erc721.address,
          valueLimit: 0n,
          sig: getFunctionSelector("mint(address)"),
          operation: Operation.Call,
          rules: [
            {
              condition: ParamCondition.EQUAL,
              offset: 0,
              param: pad(await ecdsaProvider.getAddress(), { size: 32 }),
            },
          ],
        },
      ],
    },
  });
  await minting({ provider: sessionKeyProvider, publicClient, erc721 }, expect);
}
