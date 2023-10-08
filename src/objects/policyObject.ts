import { z } from "zod";

export const policyObject = z.object({
  id: z.string(),
  projectId: z.string(),
  strategy: z.enum(["pay_for_user", "send_transaction"]),
  policyGroup: z.enum(["project", "contract", "wallet"]),
});
