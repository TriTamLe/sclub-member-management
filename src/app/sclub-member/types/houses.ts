import { z } from "zod";

export const ZHouse = z.enum(
  ["ants_house", "smile_house", "storm_house", "shark_house"],
  {
    required_error: "Please select a house",
  },
);

export type THouse = z.infer<typeof ZHouse>;

export const HOUSE_NAME: Record<THouse, string> = {
  ants_house: "Ants House",
  smile_house: "Smile House",
  storm_house: "Storm House",
  shark_house: "Shark House",
};
