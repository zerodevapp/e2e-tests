import { z } from "zod";
import { CHAIN_IDS } from "../constants";

export const projectObject = z.object({
  id: z.string(),
  name: z.string(),
  chainId: z.enum(CHAIN_IDS),
  teamId: z.string(),
});
