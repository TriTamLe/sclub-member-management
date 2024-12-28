import { Prisma, PrismaClient } from "@prisma/client";

import { TGetListMemberDTO, TGetListMemberItemDTO } from "./dto";

const client = new PrismaClient();

export type TGetListMemberArgs = {
  order: {
    name: "asc" | "desc" | null;
    house: "asc" | "desc" | null;
    created_at: "asc" | "desc";
  };
  filters: {
    gender: number | null;
    house: "ants_house" | "smile_house" | "storm_house" | "shark_house" | null;
    memberType: number | null;
    position: number | null;
    joiningYear: number | null;
    name: string | null;
  };
  pageIndex: number;
  pageSize: number;
};

export async function getListMember(
  args: TGetListMemberArgs,
): Promise<TGetListMemberDTO> {
  const { filters, order, pageIndex, pageSize } = args;
  const skip = pageIndex * pageSize;
  const take = pageSize;
  const query: Prisma.MemberFindManyArgs = {
    skip,
    take,
    include: {
      gender: {
        select: {
          id: true,
          value: true,
        },
      },
      house: {
        select: {
          id: true,
          value: true,
        },
      },
      memberType: {
        select: {
          id: true,
          value: true,
        },
      },
      memberPosition: {
        select: {
          position: {
            select: {
              id: true,
              value: true,
            },
          },
          term: true,
        },
      },
    },
    orderBy: {
      fullName: order.name ?? undefined,
      house: order.house
        ? {
            id: order.house,
          }
        : undefined,
      createdAt: order.created_at,
    },
    where: {
      AND: [
        {
          gender: filters.gender
            ? { id: { equals: filters.gender } }
            : undefined,
        },
        {
          house: filters.house
            ? { value: { equals: filters.house } }
            : undefined,
        },
        {
          memberType: filters.memberType
            ? { id: { equals: filters.memberType } }
            : undefined,
        },
        {
          joiningYear: filters.joiningYear
            ? { equals: filters.joiningYear }
            : undefined,
        },
        {
          fullName: filters.name ? { contains: filters.name } : undefined,
        },
      ],
    },
  };

  type TQueryMemberList = Prisma.MemberGetPayload<{
    include: {
      gender: {
        select: {
          id: true;
          value: true;
        };
      };
      house: {
        select: {
          id: true;
          value: true;
        };
      };
      memberType: {
        select: {
          id: true;
          value: true;
        };
      };
      memberPosition: {
        select: {
          position: {
            select: {
              id: true;
              value: true;
            };
          };
          term: true;
        };
      };
    };
  }>;

  try {
    const [data, count] = await client.$transaction([
      client.member.findMany(query),
      client.member.count({
        where: query.where,
      }),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      total: count,
      hasMore: skip + take < count,
      items: (data as TQueryMemberList[]).map(
        (item) =>
          ({
            id: item.id,
            fullName: item.fullName,
            avatarUrl: item.avatarUrl,
            gender: {
              value: item.genderId,
              name: item.gender.value,
            },
            house: {
              value: item.houseId,
              name: item.house.value,
            },
            memberType: {
              value: item.memberTypeId,
              name: item.memberType.value,
            },
            university: item.university,
            joiningYear: item.joiningYear,
            positions: item.memberPosition.map((relation) => ({
              value: relation.position.id,
              name: relation.position.value,
              term: relation.term,
            })),
          }) as TGetListMemberItemDTO,
      ),
    };
  } catch (error) {
    throw error;
  }
}
