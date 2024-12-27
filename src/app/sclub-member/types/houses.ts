import {z} from "zod";


export const ZHouse = z.enum([
    "ants_house",
    "smile_house",
    "storm_house",
    "shark_house",
], {
    required_error: "Please select a house",
});

export type THousesValue = z.infer<typeof ZHouse>;

export type THouse = z.infer<typeof ZHouse>;
