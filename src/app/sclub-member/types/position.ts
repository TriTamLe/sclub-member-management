import {z} from "zod";

export const ZPositionValue = z.enum([
    "house_staff",
    "house_head",
    "head_of_media",
    "media_staff",
    "head_of_human_resources",
    "human_resources_staff",
    "head_of_event",
    "event_staff",
    "head_of_relations",
    "relations_staff",
    "vice_president",
    "president",
]);
export type TPositionValue = z.infer<typeof ZPositionValue>;

export const ZPosition = z.object({
    value: ZPositionValue,
    term: z.number().min(1),
});

export type TPosition = z.infer<typeof ZPosition>;
