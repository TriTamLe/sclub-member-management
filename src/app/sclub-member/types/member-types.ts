import {z} from "zod";

export const ZMemberType = z.enum(
    ["regular_member", "former_member", "elder"],
    {required_error: "Please select the member type"},
);


export type TMemberType = z.infer<typeof ZMemberType>;
