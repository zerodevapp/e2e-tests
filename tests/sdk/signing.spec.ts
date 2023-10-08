import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { signMessage, signTypedData } from "../../src/tests";
import { ECDSAProvider } from "@zerodev/sdk";
import { CHAIN_MAP, CHAIN_NODE_MAP } from "../../src/constants";
import ethers from "ethers";
import type { ChainName } from "../../src/types";
import { teamFixtures } from "../../src/fixtures/teamFixtures";

describe("signing", () => {
  test.extend(teamFixtures).extend(projectFixtures).extend(ownerFixtures)(
    "signing",
    async ({ polygonMumbaiProject, privateKeyOwner, expect }) => {
      const ecdsaProvider = await ECDSAProvider.init({
        projectId: polygonMumbaiProject.id,
        owner: privateKeyOwner,
        opts: {
          paymasterConfig: {
            policy: "VERIFYING_PAYMASTER",
          },
        },
      });
      const chainName = Object.entries(CHAIN_MAP).find(
        ([_, id]) => id === polygonMumbaiProject.chainId
      )![0] as ChainName;
      const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
        CHAIN_NODE_MAP[chainName]
      );
      await signMessage(
        {
          provider: ecdsaProvider,
          jsonRpcProvider,
        },
        expect
      );

      await signTypedData(
        {
          provider: ecdsaProvider,
          jsonRpcProvider,
        },
        expect
      );
    },
    30000
  );
});
