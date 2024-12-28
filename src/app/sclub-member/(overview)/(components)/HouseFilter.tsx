"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  HOUSE_NAME,
  THouse,
  ZHouse,
} from "@/app/sclub-member/(overview)/(types)";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

export const HouseFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const houseFilter = searchParams.get("house") as THouse | undefined;
  const [open, setOpen] = useState(false);

  const handleFilterByHouse = (value: THouse | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("house", value ?? "");
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='h-full' asChild>
        <div className='flex h-full w-fit min-w-36 cursor-pointer items-center justify-between gap-2 rounded-md  border-[2px] border-solid border-border p-2 text-sm hover:bg-secondary'>
          <div>{!houseFilter ? "Select House" : HOUSE_NAME[houseFilter]}</div>
          {houseFilter && (
            <XCircle
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFilterByHouse(undefined);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-50"}>
        <Command>
          <CommandList>
            {ZHouse.options
              .filter((h) => h !== houseFilter)
              .map((house) => {
                return (
                  <CommandItem
                    key={house}
                    value={house}
                    onSelect={(currentValue) => {
                      handleFilterByHouse(
                        currentValue === houseFilter
                          ? undefined
                          : (currentValue as THouse),
                      );
                      setOpen(false);
                    }}
                  >
                    {HOUSE_NAME[house]}
                  </CommandItem>
                );
              })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
