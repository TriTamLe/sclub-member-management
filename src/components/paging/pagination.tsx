"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export const SCPagination = (props: {
  pageIndex: number;
  totalPage: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}) => {
  const { pageIndex, totalPage, hasNext = false, hasPrevious = false } = props;
  const pageNumber = pageIndex + 1;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetPaginationState = useCallback(
    (value: number) => {
      if (value === pageIndex) return;
      const params = new URLSearchParams(searchParams.toString());

      params.set("pageIndex", value.toString());
      router.push(`/sclub-member?${params.toString()}`);
    },
    [router, searchParams, pageIndex],
  );

  const handleClickPrevious = () => {
    if (!hasPrevious) return;
    handleSetPaginationState(pageIndex - 1);
  };

  const handleClickNext = () => {
    if (!hasNext) return;
    handleSetPaginationState(pageIndex + 1);
  };

  useEffect(() => {
    if (pageNumber > totalPage) {
      handleSetPaginationState(totalPage - 1);
    }
  }, [pageNumber, totalPage, handleSetPaginationState]);

  return (
    <Pagination className='mx-4 w-fit select-none'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            aria-disabled={!hasPrevious}
            className='hover:bg-[unset] aria-disabled:opacity-30'
            onClick={handleClickPrevious}
          />
        </PaginationItem>
        {pageNumber >= 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNumber - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href='#' onClick={handleClickPrevious}>
              {pageNumber - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href='#' isActive>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
        {pageNumber + 1 <= totalPage && (
          <PaginationItem>
            <PaginationLink href='#' onClick={handleClickNext}>
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {pageNumber <= totalPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href='#'
            aria-disabled={!hasNext}
            className='hover:bg-[unset] aria-disabled:opacity-30'
            onClick={handleClickNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
