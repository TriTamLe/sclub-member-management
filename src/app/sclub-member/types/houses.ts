import { z } from "zod";

export const ZHousesValue = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export type THousesValue = z.infer<typeof ZHousesValue>;

export const ZHousesName = z.enum([
  "ants_house",
  "smile_house",
  "storm_house",
  "shark_house",
]);

export type THousesName = z.infer<typeof ZHousesName>;

export const ZHouse = z.object({
  value: ZHousesValue,
  name: ZHousesName,
});

export type THouse = z.infer<typeof ZHouse>;
