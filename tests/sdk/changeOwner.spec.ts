import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { changeOwner } from "../../src/tests";


test
    .extend(projectFixtures)
    .extend(ownerFixtures)
("changeOwner", async ({ polygonMumbaiProject, privateKeyOwner }) => {
    await changeOwner({ project: polygonMumbaiProject, owner: privateKeyOwner })
}, 360000)