import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { deploying } from "../../src/tests/deploying";
import { ECDSAProvider } from "@zerodev/sdk";


test
    .extend(projectFixtures)
    .extend(ownerFixtures)
("deploying", async ({ polygonMumbaiProject, privateKeyOwner }) => {
    const ecdsaProvider = await ECDSAProvider.init({
        projectId: polygonMumbaiProject.id, 
        owner: privateKeyOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
            },
        }
    });
    await deploying({ provider: ecdsaProvider })
}, 120000)