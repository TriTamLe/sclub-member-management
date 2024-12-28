import { z } from "zod";

import { ZHouse } from "@/app/sclub-member/(overview)/(types)/houses";

import { ZGender } from "./gender";
import { ZMemberType } from "./member-types";
import { ZPosition } from "./position";

export const ZMemberObject = z.object({
  address: z.string().max(500, { message: "Address is too long" }),
  avatar: z.string().url({ message: "Invalid URL" }).optional(),
  birthday: z.string().datetime({ message: "Invalid date" }),
  email: z.string().email({ message: "Invalid email" }),
  fullName: z
    .string({ required_error: "Please enter the full name" })
    .max(100, { message: "Name is too long" }),
  gender: ZGender.optional(),
  house: ZHouse,
  id: z.string().uuid(),
  joiningYear: z.string().length(4, { message: "Invalid year" }),
  major: z.string().max(100, { message: "Major is too long" }).optional(),
  memberType: ZMemberType,
  phone: z
    .string()
    .regex(/^\+?[0-9]+$/, { message: "Invalid phone number" })
    .optional(),
  positions: ZPosition.array().optional(),
  university: z
    .string()
    .max(500, { message: "University name is too long" })
    .optional(),
  universityGrade: z
    .number({ message: "Invalid university grade" })
    .int({ message: "Invalid university grade" })
    .min(1, { message: "Invalid university grade" })
    .max(8, { message: "Invalid university grade" })
    .optional(),
});

export type TMember = z.infer<typeof ZMemberObject>;
