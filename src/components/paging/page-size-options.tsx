"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useRouter, useSearchParams } from "next/navigation";

import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { PAGE_SIZE_OPTIONS } from "@/constants";

export const PageSizeOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size");
  const [open, setOpen] = useState(false);

  const handleFilterBySize = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("size", !value ? "" : value.toString());
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <div className='flex items-center gap-4'>
      <p className='text-sm'>Page size:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className='h-full' asChild>
          <div
            aria-expanded={open}
            className='flex h-full w-fit min-w-12 cursor-pointer items-center justify-between gap-2 rounded-md border-[2px]  border-solid border-border px-2 py-1 text-sm hover:bg-secondary aria-expanded:border-ring'
          >
            <div>{!pageSize ? <p>{PAGE_SIZE_OPTIONS[0]}</p> : pageSize}</div>
          </div>
        </PopoverTrigger>
        <PopoverContent className={"w-24"}>
          <Command>
            <CommandList>
              {PAGE_SIZE_OPTIONS.filter(
                (h) => h !== parseInt(pageSize as string),
              ).map((size) => {
                return (
                  <CommandItem
                    key={size}
                    value={size.toString()}
                    onSelect={(currentValue) => {
                      handleFilterBySize(
                        currentValue === pageSize
                          ? PAGE_SIZE_OPTIONS[0]
                          : parseInt(currentValue),
                      );
                      setOpen(false);
                    }}
                  >
                    {size}
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
