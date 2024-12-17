import { z } from "zod";

export const ZHousesValue = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export type THousesValue = z.infer<typeof ZHousesValue>;

export const ZHousesName = z.enum([
  "Ants House",
  "Smile House",
  "Storm House",
  "Shark House",
]);

export type THousesName = z.infer<typeof ZHousesName>;

export const ZHousesLogo = z.enum(["🐜", "😊", "⛈️", "🦈"]);
//TODO[Tam Le]: Add the real logo later

export type THousesLogo = z.infer<typeof ZHousesLogo>;

export const ZHouse = z.object({
  value: ZHousesValue,
  name: ZHousesName,
  logo: ZHousesLogo,
});

export type THouse = z.infer<typeof ZHouse>;
