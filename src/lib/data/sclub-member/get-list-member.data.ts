"use server";
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
    gender: "male" | "female" | "other" | null;
    house: "ants_house" | "smile_house" | "storm_house" | "shark_house" | null;
    memberType: "regular_member" | "former_member" | "elder" | null;
    position:
      | "house_staff"
      | "house_head"
      | "head_of_media"
      | "media_staff"
      | "head_of_human_resources"
      | "human_resources_staff"
      | "head_of_event"
      | "event_staff"
      | "head_of_relations"
      | "relations_staff"
      | "vice_president"
      | "president"
      | null;
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
            ? { value: { equals: filters.gender } }
            : undefined,
        },
        {
          house: filters.house
            ? { value: { equals: filters.house } }
            : undefined,
        },
        {
          memberType: filters.memberType
            ? { value: { equals: filters.memberType } }
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
        {
          memberPosition: filters.position
            ? {
                some: {
                  position: {
                    value: { equals: filters.position },
                  },
                },
              }
            : undefined,
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

    return {
      total: count,
      hasNext: skip + take < count,
      hasPrevious: skip > 0,
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
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
}
