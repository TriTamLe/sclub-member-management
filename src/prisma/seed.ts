import { PrismaClient } from "@prisma/client";

// seeding the data for houses, member types and positions, use for development only
async function main() {
  const client = new PrismaClient();

  //seeding houses
  await client.house.createMany({
    data: [
      { id: 1, value: "ants_house" },
      { id: 2, value: "smile_house" },
      { id: 3, value: "storm_house" },
      { id: 4, value: "shark_house" },
    ],
  });

  //seeding member types
  await client.memberType.createMany({
    data: [
      { id: 0, value: "regular_member" },
      { id: 1, value: "former_member" },
      { id: 2, value: "elder" },
    ],
  });

  //seeding positions
  await client.position.createMany({
    data: [
      { id: 0, value: "house_staff" },
      { id: 1, value: "house_head" },
      { id: 2, value: "head_of_media" },
      { id: 3, value: "media_staff" },
      { id: 4, value: "head_of_human_resources" },
      { id: 5, value: "human_resources_staff" },
      { id: 6, value: "head_of_event" },
      { id: 7, value: "event_staff" },
      { id: 8, value: "head_of_relations" },
      { id: 9, value: "relations_staff" },
      { id: 10, value: "vice_president" },
      { id: 11, value: "president" },
    ],
  });
}

main();
