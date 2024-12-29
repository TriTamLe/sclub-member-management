"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  POSITION_NAME,
  TPositionValue,
  ZPositionValue,
} from "@/app/sclub-member/types";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

export const PositionFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const positionFilter = searchParams.get("position") as
    | TPositionValue
    | undefined;
  const [open, setOpen] = useState(false);

  const handleFilterByPosition = (value: TPositionValue | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("position", value ?? "");
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
            {!positionFilter ? (
              <p className='italic text-gray-400'>Select position</p>
            ) : (
              POSITION_NAME[positionFilter]
            )}
          </div>
          {positionFilter && (
            <XCircle
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFilterByPosition(undefined);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-56"}>
        <Command>
          <CommandList>
            {ZPositionValue.options
              .filter((h) => h !== positionFilter)
              .map((position) => {
                return (
                  <CommandItem
                    key={position}
                    value={position}
                    onSelect={(currentValue) => {
                      handleFilterByPosition(
                        currentValue === positionFilter
                          ? undefined
                          : (currentValue as TPositionValue),
                      );
                      setOpen(false);
                    }}
                  >
                    {POSITION_NAME[position]}
                  </CommandItem>
                );
              })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
