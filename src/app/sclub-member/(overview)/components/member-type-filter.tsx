"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  MEMBER_TYPE_NAME,
  TMemberType,
  ZMemberType,
} from "@/app/sclub-member/types";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

export const MemberTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberTypeFilter = searchParams.get("memberType") as
    | TMemberType
    | undefined;
  const [open, setOpen] = useState(false);

  const handleFilterByMemberType = (value: TMemberType | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("memberType", value ?? "");
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='h-full' asChild>
        <div
          aria-expanded={open}
          className='flex h-full w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-md border-[2px] border-solid border-border px-2 py-1 text-sm hover:bg-secondary aria-expanded:border-ring'
        >
          <div>
            {!memberTypeFilter ? (
              <p className='italic text-gray-400'>Select member type</p>
            ) : (
              MEMBER_TYPE_NAME[memberTypeFilter]
            )}
          </div>
          {memberTypeFilter && (
            <XCircle
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFilterByMemberType(undefined);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-40"}>
        <Command>
          <CommandList>
            {ZMemberType.options
              .filter((h) => h !== memberTypeFilter)
              .map((memberType) => {
                return (
                  <CommandItem
                    key={memberType}
                    value={memberType}
                    onSelect={(currentValue) => {
                      handleFilterByMemberType(
                        currentValue === memberTypeFilter
                          ? undefined
                          : (currentValue as TMemberType),
                      );
                      setOpen(false);
                    }}
                  >
                    {MEMBER_TYPE_NAME[memberType]}
                  </CommandItem>
                );
              })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
