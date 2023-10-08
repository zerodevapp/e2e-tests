import { test, type TestAPI } from "vitest";
import { CHAIN_MAP, CHAIN_NODE_MAP } from "../constants";
import type { ChainId, ChainName } from "../types";
import { createPublicClient, http, type PublicClient } from "viem";
import * as chains from "viem/chains";

type PublicClientFixtures = {
  [chainName in `${keyof typeof CHAIN_NODE_MAP}PublicClient`]: PublicClient;
};

const createPublicClientFixture = (chainName: ChainName, chainId: ChainId) => {
  //@ts-expect-error
  return async ({ task }, use) => {
    const publicClient = createPublicClient({
      chain: Object.values(chains).find(
        (chain) => chain.id === parseInt(chainId)
      ),
      transport: http(CHAIN_NODE_MAP[chainName]),
    });
    await use(publicClient);
  };
};

export const publicClientFixtures: Parameters<
  typeof test.extend<PublicClientFixtures>
>[0] = Object.fromEntries(
  Object.entries(CHAIN_MAP).map(([chainName, chainId]) => [
    `${chainName}PublicClient`,
    createPublicClientFixture(chainName as ChainName, chainId as ChainId),
  ])
) as unknown as PublicClientFixtures;

export const withPublicClientFixtures = (environment: TestAPI = test) =>
  environment.extend<PublicClientFixtures>(publicClientFixtures);
