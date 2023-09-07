import { createGasSponsoringPolicy, createProject, deleteProject } from "../../src/api"
import { PRIVATE_KEY, TEAM_ID } from "../../src/constants"
import { ECDSAProvider } from "@zerodev/sdk";
import { PrivateKeySigner } from "@alchemy/aa-core";

describe("base", () => {
    it("can send", async () => {
        const project = await createProject(TEAM_ID, 'RandomProject', '80001')
        const policy = await createGasSponsoringPolicy(project.id)

        const owner = PrivateKeySigner.privateKeyToAccountSigner(PRIVATE_KEY);
        let ecdsaProvider = await ECDSAProvider.init({
            projectId: project.id, 
            owner,
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

        expect(hash).not.toBeNull()


        await deleteProject(project.id)
    })
})