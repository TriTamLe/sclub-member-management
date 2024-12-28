import {
  HouseFilter,
  MemberTable,
  SearchMemberByName,
} from "@/app/sclub-member/components";
import { Button } from "@/components/ui/button";
import { getListMember } from "@/lib/data/sclub-member";

import { THouse } from "./types";

interface ISClubMemberManagement {
  searchParams: Promise<{
    gender?: number;
    house?: THouse;
    memberType?: number;
    joiningYear?: number;
    name?: string;
    position?: number;
    order?: `${"house" | "name" | "createdAt"} ${"asc" | "desc"}`;
    pageIndex?: number;
    pageSize?: number;
  }>;
}

export default async function SClubMemberManagement({
  searchParams,
}: ISClubMemberManagement) {
  const {
    gender,
    memberType,
    name,
    house,
    order,
    pageIndex = 0,
    pageSize = 10,
    joiningYear,
    position,
  } = await searchParams;
  const orderOption = order?.split(" ")[0] as "house" | "name" | "createdAt";
  const orderType = order?.split(" ")[1] as "asc" | "desc";

  const data = await getListMember({
    filters: {
      gender: !gender ? null : gender,
      house: !house ? null : house,
      memberType: !memberType ? null : memberType,
      joiningYear: !joiningYear ? null : joiningYear,
      name: !name ? null : name,
      position: !position ? null : position,
    },
    order: {
      house:
        orderOption && orderType && orderOption === "house" ? orderType : null,
      name:
        orderOption && orderType && orderOption === "name" ? orderType : null,
      created_at:
        orderOption && orderType && orderOption === "name" ? orderType : "desc",
    },
    pageIndex,
    pageSize,
  });

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-10 p-10 lg:p-20'>
      <div
        className={"flex w-full flex-row items-center justify-between gap-5"}
      >
        <div className='flex grow flex-row items-center gap-5'>
          <SearchMemberByName />
          <HouseFilter />
        </div>
        <Button>Create new SC-er</Button>
      </div>
      <div className={"w-full"}>
        <MemberTable data={data} />
      </div>
    </div>
  );
}
