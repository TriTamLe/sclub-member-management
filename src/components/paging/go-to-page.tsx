"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input";

export const GoToPage = (props: {
  currentPageIndex: number;
  totalPage: number;
}) => {
  const { currentPageIndex, totalPage } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleGotoPage = (value: number) => {
    if (value === currentPageIndex) return;
    if (value < 0) return;

    if (value > totalPage - 1) {
      handleGotoPage(totalPage - 1);

      if (inputRef.current) {
        inputRef.current.value = totalPage.toString();
      }

      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageIndex", value.toString());
    router.push(`/sclub-member?${params.toString()}`);
  };

  return (
    <div className='flex items-center gap-4'>
      <p className='text-sm'>Go to page:</p>
      <Input
        ref={inputRef}
        className='max-w-fit'
        placeholder={(currentPageIndex + 1).toString()}
        defaultValue={(currentPageIndex + 1).toString()}
        type='number'
        min={1}
        max={totalPage}
        onBlur={(e) => {
          if (e.target.value) handleGotoPage(parseInt(e.target.value) - 1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            handleGotoPage(parseInt(e.currentTarget.value) - 1);
          }
        }}
      ></Input>
    </div>
  );
};
