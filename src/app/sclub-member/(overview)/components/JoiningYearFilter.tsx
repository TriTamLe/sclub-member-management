"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FIRST_SCLUB_TERM } from "@/app/sclub-member/constants";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

export const JoiningYearFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const joiningYearFilter = searchParams.get("joiningYear");
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleFilterByJoiningYear = (value: number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("joiningYear", !value ? "" : value.toString());
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='h-full' asChild>
        <div
          aria-expanded={open}
          className='flex h-full w-fit min-w-36 cursor-pointer items-center justify-between gap-2 rounded-md border-[2px]  border-solid border-border px-2 py-1 text-sm hover:bg-secondary aria-expanded:border-ring'
        >
          <div>
            {!joiningYearFilter ? (
              <p className='italic text-gray-400'>Select joining year</p>
            ) : (
              FIRST_SCLUB_TERM + parseInt(joiningYearFilter) - 1
            )}
          </div>
          {joiningYearFilter && (
            <XCircle
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFilterByJoiningYear(undefined);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-40"}>
        <Command>
          <CommandList>
            {Array.from(
              { length: currentYear - FIRST_SCLUB_TERM + 1 },
              (_, i) => FIRST_SCLUB_TERM + i,
            ).map((year) => {
              return (
                <CommandItem
                  key={year}
                  value={(year - FIRST_SCLUB_TERM + 1).toString()}
                  onSelect={(currentValue) => {
                    handleFilterByJoiningYear(parseInt(currentValue));
                    setOpen(false);
                  }}
                >
                  {year}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
