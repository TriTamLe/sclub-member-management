import { z } from "zod";

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
export const POSITION_NAME: Record<TPositionValue, string> = {
  event_staff: "Event Staff",
  head_of_event: "Head of Event",
  head_of_human_resources: "Head of Human Resources",
  head_of_media: "Head of Media",
  head_of_relations: "Head of Relations",
  house_head: "House Head",
  house_staff: "House Staff",
  human_resources_staff: "Human Resources Staff",
  media_staff: "Media Staff",
  president: "President",
  relations_staff: "Relations Staff",
  vice_president: "Vice President",
};
