import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { publicClientFixtures } from "../../src/fixtures/publicClientFixtures";
import { contractFixtures } from "../../src/fixtures/contractFixtures";
import { minting } from "../../src/tests";

test
    .extend(projectFixtures)
    .extend(ownerFixtures)
    .extend(publicClientFixtures)
    .extend(contractFixtures)
("minting", async ({ polygonMumbaiProject, polygonMumbaiPublicClient, polygonMumbaiERC721, privateKeyOwner }) => {
    await minting({
        project: polygonMumbaiProject,
        owner: privateKeyOwner,
        erc721: polygonMumbaiERC721,
        publicClient: polygonMumbaiPublicClient
    })
}, 120000)