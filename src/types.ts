import type { z } from "zod";
import { projectObject } from "./objects/projectObject";
import type { policyObject, teamObject } from "./objects";
import type { Abi, Hex } from "viem";
import { CHAIN_IDS, CHAIN_MAP, PROVIDERS } from "./constants";
import type { TestContext } from "vitest";

export type ChainName = keyof typeof CHAIN_MAP
export type ChainId = typeof CHAIN_IDS[number]
export type Project = z.infer<typeof projectObject>
export type Policy = z.infer<typeof policyObject>
export type Team = z.infer<typeof teamObject>
export type Provider = typeof PROVIDERS[number]
export type Contract = {
    address: Hex,
    abi: Abi
}

export type Context<P, T> = {
    beforeEach?: (payload: P) => (context: TestContext & T) => Promise<void>
    afterEach?: (payload: P) => (context: TestContext & T) => Promise<void>
    beforeAll?: (payload: P) => () => Promise<void>
    afterAll?: (payload: P) => () => Promise<void>
}
