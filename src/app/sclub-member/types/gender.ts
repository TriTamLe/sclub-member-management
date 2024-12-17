import { z } from "zod";

export const ZGenderValue = z.enum(["male", "female", "other"], {
  required_error: "Please select your gender",
});

export const ZGender = z.object({
  value: ZGenderValue,
  name: z.string(),
});

export type TGender = z.infer<typeof ZGender>;
