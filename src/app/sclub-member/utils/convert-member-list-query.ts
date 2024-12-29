import { TGetListMemberSearchParams } from "@/app/sclub-member/types";
import { TGetListMemberArgs } from "@/lib/data/sclub-member";

import { PAGE_SIZE_OPTIONS } from "../constants";

export const convertMemberListQuery = (
  query: TGetListMemberSearchParams,
): TGetListMemberArgs => {
  const {
    gender,
    memberType,
    name,
    house,
    order,
    pageIndex = 0,
    size,
    joiningYear,
    position,
  } = query;

  const orderOption = order?.split(" ")[0] as "house" | "name" | "createdAt";
  const orderType = order?.split(" ")[1] as "asc" | "desc";

  return {
    filters: {
      gender: !gender ? null : gender,
      house: !house ? null : house,
      memberType: !memberType ? null : memberType,
      joiningYear: !joiningYear ? null : parseInt(joiningYear),
      name: !name ? null : name,
      position: !position ? null : position,
    },
    order: {
      house:
        orderOption && orderType && orderOption === "house" ? orderType : null,
      name:
        orderOption && orderType && orderOption === "name" ? orderType : null,
      created_at:
        orderOption && orderType && orderOption === "name" ? orderType : "desc",
    },
    pageIndex,
    pageSize: !size ? PAGE_SIZE_OPTIONS[0] : parseInt(size),
  };
};
