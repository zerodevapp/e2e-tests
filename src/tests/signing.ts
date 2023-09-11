import { ZeroDevProvider } from "@zerodev/sdk";
import { verifyMessage } from '@ambire/signature-validator';
import ethers from 'ethers';
import { deploying } from "./deploying";
import type { Hex } from "viem";

type SigningOptions = {
    provider: ZeroDevProvider
    jsonRpcProvider: ethers.providers.JsonRpcProvider
}

export async function signMessage({provider, jsonRpcProvider}: SigningOptions) {
    // needs to be deployed
    await deploying({provider})

    const message = 'Hello World'
    const signature = await provider.signMessage(message)
    const isValidSig = await verifyMessage({
        signer: await provider.getAddress(),
        message,
        signature,
        provider: jsonRpcProvider
    })
    expect(isValidSig).toBeTruthy()
}

export async function signTypedData({provider, jsonRpcProvider}: SigningOptions) {
    // needs to be deployed
    await deploying({provider})

    const domain = {
        name: "Ether Mail",
        version: "1",
        chainId: 1,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC" as Hex,
    };

    const types = {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      };
  
    const message = {
        from: {
            name: "Cow",
            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
            name: "Bob",
            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
    };

    const typedData = {
        types,
        message,
        primaryType: 'Mail',
        domain
    }

    const signature = await provider.signTypedData(typedData)
    const isValidSig = await verifyMessage({
        signer: await provider.getAddress(),
        typedData,
        signature,
        provider: jsonRpcProvider
        // this is needed so that smart contract signatures can be verified
    })
    expect(isValidSig).toBeTruthy()
    // expect(hash).toBeDefined()
    // expect(await ecdsaProvider.waitForUserOperationTransaction(hash as Hex)).toBeDefined()
}
