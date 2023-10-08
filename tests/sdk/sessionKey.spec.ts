import { sessionKey } from "../../src/tests";
import {
  CHAIN_MAP,
  CHAIN_NODE_MAP,
  ERC721_ABI,
  ERC721_MAP,
  PROVIDERS,
} from "../../src/constants";
import {
  createGasSponsoringPolicy,
  createProject,
  deleteProject,
} from "../../src/api";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { createPublicClient, http } from "viem";
import * as viemChains from "viem/chains";
import { teamFixtures } from "../../src/fixtures/teamFixtures";

const chains = [
  "arbitrum",
  "polygonMumbai",
  "goerli",
  "polygon",
  "base",
  "sepolia",
] as const;

// runs test for each chain
describe.sequential("sessionKey", () => {
  for (let provider of PROVIDERS) {
    describe(provider || "Default", () => {
      for (let chain of chains) {
        it.extend(ownerFixtures)
          .extend(teamFixtures)
          .concurrent(
            chain,
            async ({ privateKeyOwner: owner, team, expect }) => {
              const chainId = CHAIN_MAP[chain];
              const project = await createProject(team, "TestProject", chainId);
              await createGasSponsoringPolicy(project);
              const publicClient = createPublicClient({
                chain: Object.values(viemChains).find(
                  (chain) => chain.id === parseInt(chainId),
                ) as viemChains.Chain,
                transport: http(CHAIN_NODE_MAP[chain]),
              });
              const erc721 = {
                address: ERC721_MAP[chain],
                abi: ERC721_ABI,
              };
              await sessionKey(
                { project, owner, publicClient, erc721, provider },
                expect,
              );
              await deleteProject(project);
            },
            30000,
          );
      }
    });
  }
});
