import { changeOwner } from "../../src/tests";
import { CHAIN_MAP, PROVIDERS } from "../../src/constants";
import {
  createGasSponsoringPolicy,
  createProject,
  deleteProject,
} from "../../src/api";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { teamFixtures } from "../../src/fixtures/teamFixtures";

const chains = [
  // "arbitrum",
  "polygonMumbai",
  // "goerli",
  // "polygon",
  // "base",
  // "sepolia",
] as const;

// runs test for each chain
describe.sequential("changeOwner", () => {
  for (let provider of PROVIDERS) {
    describe(provider || "Default", () => {
      for (let chain of chains) {
        it.extend(ownerFixtures)
          .extend(teamFixtures)
          .concurrent(
            chain,
            async ({ privateKeyOwner: owner, team, expect }) => {
              const project = await createProject(
                team,
                "TestProject",
                CHAIN_MAP[chain]
              );
              await createGasSponsoringPolicy(project);
              await changeOwner({ project, owner, provider }, expect);
              await deleteProject(project);
            },
            1000000
          );
      }
    });
  }
});
