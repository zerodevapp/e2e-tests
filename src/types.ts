import type { z } from "zod";
import { projectObject } from "./objects/projectObject";
import type { policyObject } from "./objects";
import type { Abi, Hex } from "viem";
import { CHAIN_IDS, CHAIN_MAP } from "./constants";

export type ChainName = keyof typeof CHAIN_MAP
export type ChainId = typeof CHAIN_IDS[number]
export type Project = z.infer<typeof projectObject>
export type Policy = z.infer<typeof policyObject>
export type Contract = {
    address: Hex,
    abi: Abi
}