import { THouse } from "./houses";

export type TGetListMemberSearchParams = {
  gender?: number;
  house?: THouse;
  memberType?: number;
  joiningYear?: number;
  name?: string;
  position?: number;
  order?: `${"house" | "name" | "createdAt"} ${"asc" | "desc"}`;
  pageIndex?: number;
  pageSize?: number;
};
