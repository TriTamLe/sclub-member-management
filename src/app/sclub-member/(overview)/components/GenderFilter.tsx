"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  GENDER_NAME,
  TGender,
  ZGender,
} from "@/app/sclub-member/(overview)/types";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

export const GenderFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genderFilter = searchParams.get("gender") as TGender | undefined;
  const [open, setOpen] = useState(false);

  const handleFilterByGender = (value: TGender | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("gender", value ?? "");
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='h-full' asChild>
        <div
          aria-expanded={open}
          className='flex h-full w-fit min-w-32 cursor-pointer items-center justify-between gap-2 rounded-md border-[2px] border-solid border-border px-2 py-1 text-sm hover:bg-secondary aria-expanded:border-ring'
        >
          <div>
            {!genderFilter ? (
              <p className='italic text-gray-400'>Select gender</p>
            ) : (
              GENDER_NAME[genderFilter]
            )}
          </div>
          {genderFilter && (
            <XCircle
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFilterByGender(undefined);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-32"}>
        <Command>
          <CommandList>
            {ZGender.options
              .filter((h) => h !== genderFilter)
              .map((gender) => {
                return (
                  <CommandItem
                    key={gender}
                    value={gender}
                    onSelect={(currentValue) => {
                      handleFilterByGender(
                        currentValue === genderFilter
                          ? undefined
                          : (currentValue as TGender),
                      );
                      setOpen(false);
                    }}
                  >
                    {GENDER_NAME[gender]}
                  </CommandItem>
                );
              })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
