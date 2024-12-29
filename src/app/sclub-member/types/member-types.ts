import { z } from "zod";

export const ZMemberType = z.enum(
  ["regular_member", "former_member", "elder"],
  { required_error: "Please select the member type" },
);
export type TMemberType = z.infer<typeof ZMemberType>;
export const MEMBER_TYPE_NAME: Record<TMemberType, string> = {
  elder: "Elder",
  former_member: "Former member",
  regular_member: "Regular member",
};
