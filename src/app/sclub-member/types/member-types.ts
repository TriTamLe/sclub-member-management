import { z } from "zod";

export const ZMemberTypeValue = z.enum(
  ["regular_member", "former_member", "elder"],
  { required_error: "Please select the member type" },
);

export const ZMemberType = z.object({
  value: ZMemberTypeValue,
  name: z.string(),
});

export type TMemberType = z.infer<typeof ZMemberType>;
