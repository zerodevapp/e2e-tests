import { z } from "zod";

export const teamObject = z.object({
  id: z.string(),
  name: z.string(),
});
