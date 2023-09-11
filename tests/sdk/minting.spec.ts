import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { publicClientFixtures } from "../../src/fixtures/publicClientFixtures";
import { contractFixtures } from "../../src/fixtures/contractFixtures";
import { minting } from "../../src/tests";
import { ECDSAProvider } from "@zerodev/sdk";

test
    .extend(projectFixtures)
    .extend(ownerFixtures)
    .extend(publicClientFixtures)
    .extend(contractFixtures)
("minting", async ({ polygonMumbaiProject, polygonMumbaiPublicClient, polygonMumbaiERC721, privateKeyOwner }) => {
    const ecdsaProvider = await ECDSAProvider.init({
        projectId: polygonMumbaiProject.id, 
        owner: privateKeyOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER",
            },
        }
    });
    await minting({
        provider: ecdsaProvider,
        erc721: polygonMumbaiERC721,
        publicClient: polygonMumbaiPublicClient
    })
}, 120000)