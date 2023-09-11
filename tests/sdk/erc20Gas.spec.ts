import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { erc20Gas } from "../../src/tests";
import { publicClientFixtures } from "../../src/fixtures/publicClientFixtures";
import { contractFixtures } from "../../src/fixtures/contractFixtures";


test
    .extend(projectFixtures)
    .extend(ownerFixtures)
    .extend(publicClientFixtures)
    .extend(contractFixtures)
("erc20Gas", async ({ polygonMumbaiProject, privateKeyOwner, polygonMumbaiPublicClient, polygonMumbaiERC20 }) => {

    await erc20Gas({ project: polygonMumbaiProject, owner: privateKeyOwner, publicClient: polygonMumbaiPublicClient, erc20: polygonMumbaiERC20 })
}, 360000)