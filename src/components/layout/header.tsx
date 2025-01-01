"use client";

import React from "react";

import { ThemeToggle } from "../theme";

export const Header = () => {
  return (
    <div className='flex h-[7dvh] min-h-10 w-full flex-row items-center border-b-2 border-solid border-border px-20 shadow-md'>
      <div className='grow'></div>
      <div className=''>
        <ThemeToggle />
      </div>
    </div>
  );
};
