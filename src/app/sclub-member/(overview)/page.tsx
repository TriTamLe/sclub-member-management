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

import { MemberTypeFilter } from "./components/member-type-filter";
import { PositionFilter } from "./components/position-filter";

export default async function SClubMemberManagement({
  searchParams,
}: Readonly<{
  searchParams: Promise<TGetListMemberSearchParams>;
}>) {
  const query = await searchParams;
  const { name, house, gender, joiningYear, memberType, position, size } =
    query;
  const tableKey = [
    name,
    house,
    gender,
    joiningYear,
    memberType,
    position,
    size,
  ].join("-");

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5 px-20 py-10'>
      <div
        className={
          "flex w-full flex-row flex-wrap-reverse items-center justify-between gap-5 pb-2"
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
          <Button className='bg-shandy text-cod hover:brightness-95'>
            Create new SC-er
          </Button>
        </div>
      </div>

      <Suspense key={tableKey} fallback={<LoadingMemberTable />}>
        <MemberTable query={query} />
      </Suspense>
    </div>
  );
}
