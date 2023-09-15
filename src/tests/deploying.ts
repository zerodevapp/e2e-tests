import { ZeroDevProvider } from "@zerodev/sdk";
import { type Hex } from "viem";
import type { ExpectStatic } from "vitest";

type DeployingOptions = {
    provider: ZeroDevProvider,
}

export async function deploying({ provider }: DeployingOptions, expect: ExpectStatic) {
    const { hash } = await provider.sendUserOperation({
        target: "0x0000000000000000000000000000000000000000",
        data: "0x",
        value: 0n,
    });
    expect(hash).toBeDefined()
    expect(await provider.waitForUserOperationTransaction(hash as Hex)).toBeDefined()
}
