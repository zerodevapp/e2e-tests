import { ECDSAProvider } from "@zerodev/sdk";
import type { Hex } from "viem";
import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { deploying } from "../../src/tests/deploying";


test
    .extend(projectFixtures)
    .extend(ownerFixtures)
("deploying", async ({ polygonMumbaiProject, privateKeyOwner }) => {
    await deploying({
        project: polygonMumbaiProject,
        owner: privateKeyOwner
    })
}, 120000)