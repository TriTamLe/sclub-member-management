import { Suspense } from "react";

import {
  HouseFilter,
  MemberTable,
  SearchMemberByName,
} from "@/app/sclub-member/(overview)/components";
import { LoadingMemberTable } from "@/components/loading";
import { Button } from "@/components/ui/button";

import { TGetListMemberSearchParams } from "./types";

export default async function SClubMemberManagement({
  searchParams,
}: {
  searchParams: Promise<TGetListMemberSearchParams>;
}) {
  const query = await searchParams;
  const { name, house } = query;

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-10 px-20 py-10'>
      <div
        className={"flex w-full flex-row items-center justify-between gap-5"}
      >
        <div className='flex grow flex-row items-center gap-5'>
          <SearchMemberByName />
          <HouseFilter />
        </div>
        <Button>Create new SC-er</Button>
      </div>
      <div className={"h-[550px] w-full"}>
        <Suspense
          key={name ?? "" + house ?? ""}
          fallback={<LoadingMemberTable />}
        >
          <MemberTable query={query} />
        </Suspense>
      </div>
    </div>
  );
}
