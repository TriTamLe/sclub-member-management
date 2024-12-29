import { TGender } from "./gender";
import { THouse } from "./houses";
import { TMemberType } from "./member-types";
import { TPositionValue } from "./position";

export type TGetListMemberSearchParams = {
  gender?: TGender;
  house?: THouse;
  memberType?: TMemberType;
  joiningYear?: string;
  name?: string;
  position?: TPositionValue;
  order?: `${"house" | "name" | "createdAt"} ${"asc" | "desc"}`;
  pageIndex?: number;
  pageSize?: number;
};
