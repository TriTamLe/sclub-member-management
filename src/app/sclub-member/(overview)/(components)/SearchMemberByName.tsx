"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

import { Input } from "@/components/ui/input";

export const SearchMemberByName = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nameFilter = searchParams.get("name") as string;

  const handleSearchByName = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("name", value);
    router.push(`/sclub-member?${params.toString()}`);
  };
  const debouncedHandleSearchByName = useDebounceCallback(
    handleSearchByName,
    200,
  );

  return (
    <Input
      defaultValue={nameFilter}
      onChange={(e) => {
        debouncedHandleSearchByName(e.target.value);
      }}
      placeholder={"Search member by their name..."}
      className='max-w-lg'
    />
  );
};
