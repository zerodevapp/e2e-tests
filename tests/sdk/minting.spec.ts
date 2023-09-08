import { ECDSAProvider } from "@zerodev/sdk";
import { type Hex, encodeFunctionData } from "viem";
import { projectFixtures } from "../../src/fixtures/projectFixtures";
import { ownerFixtures } from "../../src/fixtures/ownerFixtures";
import { publicClientFixtures } from "../../src/fixtures/publicClientFixtures";
import { contractFixtures } from "../../src/fixtures/contractFixtures";

test
    .extend(projectFixtures)
    .extend(ownerFixtures)
    .extend(publicClientFixtures)
    .extend(contractFixtures)
("minting", async ({ polygonMumbaiProject, polygonMumbaiPublicClient, polygonMumbaiERC721, privateKeyOwner }) => {
    let ecdsaProvider = await ECDSAProvider.init({
        projectId: polygonMumbaiProject.id, 
        owner: privateKeyOwner,
        opts: {
            paymasterConfig: {
                policy: "VERIFYING_PAYMASTER"
            }
        }
    });
    const address = await ecdsaProvider.getAddress()

    const oldBalance = await polygonMumbaiPublicClient.readContract({ address: polygonMumbaiERC721.address, abi: polygonMumbaiERC721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    const { hash } = await ecdsaProvider.sendUserOperation({
        target: polygonMumbaiERC721.address,
        data: encodeFunctionData({abi: polygonMumbaiERC721.abi, functionName: 'mint', args: [address]})
    });
    await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)

    const newBalance = await polygonMumbaiPublicClient.readContract({ address: polygonMumbaiERC721.address, abi: polygonMumbaiERC721.abi, functionName: 'balanceOf', args: [address] }) as bigint

    expect(newBalance).toBeGreaterThan(oldBalance)

}, 120000)