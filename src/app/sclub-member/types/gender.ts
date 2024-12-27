import {z} from "zod";

export const ZGender = z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
});


export type TGender = z.infer<typeof ZGender>;
