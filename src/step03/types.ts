import { z } from "zod";

export const UserSchema = z.object({
  type: z.union([z.literal("admin"), z.literal("guest"), z.literal("staff")]),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
