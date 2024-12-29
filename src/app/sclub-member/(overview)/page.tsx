import { Suspense } from "react";

import {
  GenderFilter,
  HouseFilter,
  JoiningYearFilter,
  MemberTable,
  SearchMemberByName,
} from "@/app/sclub-member/(overview)/components";
import { TGetListMemberSearchParams } from "@/app/sclub-member/types";
import { LoadingMemberTable } from "@/components/loading";
import { Button } from "@/components/ui/button";

import { MemberTypeFilter } from "./components/MemberTypeFilter";
import { PositionFilter } from "./components/PositionFilter";

export default async function SClubMemberManagement({
  searchParams,
}: {
  searchParams: Promise<TGetListMemberSearchParams>;
}) {
  const query = await searchParams;
  const { name, house, gender, joiningYear, memberType, position } = query;
  const tableKey = [
    name,
    house,
    gender,
    joiningYear,
    memberType,
    position,
  ].join("-");

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-10 px-20 py-10'>
      <div
        className={
          "flex w-full flex-row flex-wrap-reverse items-center justify-between gap-5"
        }
      >
        <div className='flex  flex-row items-center gap-2'>
          <GenderFilter />
          <HouseFilter />
          <JoiningYearFilter />
          <MemberTypeFilter />
          <PositionFilter />
        </div>
        <div className='flex grow items-center justify-end gap-2'>
          <SearchMemberByName />
          <Button>Create new SC-er</Button>
        </div>
      </div>
      <div className={"h-[550px] w-full"}>
        <Suspense key={tableKey} fallback={<LoadingMemberTable />}>
          <MemberTable query={query} />
        </Suspense>
      </div>
    </div>
  );
}
