import { ECDSAProvider } from "@zerodev/sdk";
import type { Hex } from "viem";
import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";


test
    .extend(projectFixtures)
    .extend(ownerFixtures)
("deploying", async ({ polygonMumbaiProject, privateKeyOwner }) => {
    let ecdsaProvider = await ECDSAProvider.init({
        projectId: polygonMumbaiProject.id, 
        owner: privateKeyOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER"
            }
        }
    });

    const { hash } = await ecdsaProvider.sendUserOperation({
        target: "0x0000000000000000000000000000000000000000",
        data: "0x",
        value: 0n,
    });

    expect(hash).toBeDefined()

    expect(await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)).toBeDefined()

}, 120000)