"use server";

import { PrismaClient } from "@prisma/client";

import { TGetOneMemberDTO } from "./dto";

const client = new PrismaClient();

export const getOneMemberById = async (
  id: string,
): Promise<TGetOneMemberDTO | null> => {
  try {
    const response = await client.member.findUnique({
      where: {
        id,
      },
      include: {
        gender: { select: { id: true, value: true } },
        house: { select: { id: true, value: true } },
        memberType: { select: { id: true, value: true } },
        memberPosition: {
          select: {
            position: { select: { id: true, value: true } },
            term: true,
          },
        },
      },
    });

    if (response === null) return null;

    return {
      address: response.address ?? null,
      id: response.id,
      avatarUrl: response.avatarUrl ?? null,
      birthdate: response.birthdate.toISOString(),
      createdAt: response.createdAt.toISOString(),
      email: response.email,
      fullName: response.fullName,
      gender: response.gender.value,
      house: response.house.value,
      joiningYear: response.joiningYear,
      major: response.major ?? null,
      memberType: response.memberType.value,
      phone: response.phone ?? null,
      positions: response.memberPosition.map((pos) => ({
        position: pos.position.value,
        term: pos.term,
      })),
      university: response.university ?? null,
      universityGrade: response.universityGrade ?? null,
      updatedAt: response.updatedAt.toISOString(),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }
};
