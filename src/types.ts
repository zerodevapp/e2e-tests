import type { z } from "zod";
import type { CHAINS } from "./constants";
import { projectObject } from "./objects/projectObject";
import type { policyObject } from "./objects";

export type Chain = typeof CHAINS[number]
export type Project = z.infer<typeof projectObject>
export type Policy = z.infer<typeof policyObject>