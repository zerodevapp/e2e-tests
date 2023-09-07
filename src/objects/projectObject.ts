import { z } from "zod";
import { CHAINS } from "../constants";

export const projectObject = z.object({
    id: z.string(),
    name: z.string(),
    chainId: z.enum(CHAINS),
    teamId: z.string(),
})