/* eslint-disable no-console */
import { faker } from "@faker-js/faker/locale/en";
import { PrismaClient } from "@prisma/client";

// seeding the data. Use for development only
const client = new PrismaClient();

async function deleteData() {
  console.log("deleting...");
  await client.memberPosition.deleteMany({});
  console.log("finish delete member position");
  await client.member.deleteMany({});
  console.log("finish delete member");
  await client.position.deleteMany({});
  console.log("finish delete position");
  await client.memberType.deleteMany({});
  console.log("finish delete member type");
  await client.house.deleteMany({});
  console.log("finish delete house");
  await client.gender.deleteMany({});
  console.log("finish delete gender");
}

async function seedingGender() {
  console.log("seeding gender");
  await client.gender.createMany({
    data: [
      { id: 0, value: "male" },
      { id: 1, value: "female" },
      { id: 2, value: "other" },
    ],
  });
}

async function seedingHouses() {
  console.log("seeding houses");
  await client.house.createMany({
    data: [
      { id: 1, value: "ants_house" },
      { id: 2, value: "smile_house" },
      { id: 3, value: "storm_house" },
      { id: 4, value: "shark_house" },
    ],
  });
}

async function seedingMemberTypes() {
  console.log("seeding member types");
  await client.memberType.createMany({
    data: [
      { id: 0, value: "regular_member" },
      { id: 1, value: "former_member" },
      { id: 2, value: "elder" },
    ],
  });
}

async function seedingPosition() {
  console.log("seeding position");
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

async function seedingGeneration(_term?: number) {
  console.log("seeding generations");
  const firstYear = 2009;
  const currentYear = new Date().getFullYear();
  const term = _term ?? currentYear - 2009 + 1;
  const isRegularMember = term === currentYear - 2009 + 1;

  const seedMembers = Array.from({ length: 100 }, () => {
    return {
      address: faker.location.streetAddress(),
      avatarUrl: faker.image.avatar(),
      birthdate: faker.date
        .between({
          from: firstYear - 23,
          to: firstYear - 18,
        })
        .toISOString(),
      createdAt: faker.date.past({}),
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      genderId: faker.number.int({ min: 0, max: 2 }),
      houseId: faker.number.int({ min: 1, max: 4 }),
      id: faker.string.uuid(),
      joiningYear: faker.number.int({ min: 1, max: term + 1 }),
      major: faker.person.jobArea(),
      memberTypeId: isRegularMember ? 0 : faker.number.int({ min: 1, max: 2 }),
      university: faker.company.name(),
      universityGrade: faker.number.int({ min: 1, max: 8 }),
      phone: faker.phone.number({
        style: "international",
      }),
    };
  });

  //* current generation
  await client.member.createMany({
    data: seedMembers,
  });

  //* generate current house staff
  await client.memberPosition.createMany({
    data: Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 0,
      term: term,
    })),
  });

  //* generate current house head
  await client.memberPosition.createMany({
    data: Array.from({ length: 4 }, (_, index) => {
      const foundIndex = seedMembers.findIndex(
        (mem) => mem.houseId === index + 1,
      );

      return {
        id: faker.string.uuid(),
        memberId: seedMembers[foundIndex].id,
        positionId: 1,
        term,
      };
    }),
  });
  //* generate current head of media
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 2,
      term,
    },
  });
  //* generate current media staff
  await client.memberPosition.createMany({
    data: Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 3,
      term,
    })),
  });
  //* generate head of human resource
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 4,
      term,
    },
  });
  //* generate hr staff
  await client.memberPosition.createMany({
    data: Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 5,
      term,
    })),
  });
  //*generate head of event
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 6,
      term,
    },
  });
  //* generate event staff
  await client.memberPosition.createMany({
    data: Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 7,
      term,
    })),
  });
  //*generate head of relation
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 8,
      term,
    },
  });
  //* generate relation staff
  await client.memberPosition.createMany({
    data: Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 9,
      term,
    })),
  });
  //*generate vice president
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 10,
      term,
    },
  });
  //*generate president
  await client.memberPosition.create({
    data: {
      id: faker.string.uuid(),
      memberId: seedMembers[faker.number.int({ min: 0, max: 99 })].id,
      positionId: 11,
      term,
    },
  });
}

async function main() {
  const currentYear = new Date().getFullYear();

  await deleteData();
  await seedingGender();
  await seedingHouses();
  await seedingMemberTypes();
  await seedingPosition();
  await seedingGeneration();
  await seedingGeneration(currentYear - 2009);
  await seedingGeneration(currentYear - 2009 - 1);
}

main().then(() => {
  console.log("finished");
});
