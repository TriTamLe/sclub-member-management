import { AvatarFallback } from "@radix-ui/react-avatar";

import { FIRST_SCLUB_TERM } from "@/app/sclub-member/(overview)/constants";
import {
  GENDER_NAME,
  HOUSE_NAME,
  MEMBER_TYPE_NAME,
  POSITION_NAME,
  TGender,
  TGetListMemberSearchParams,
  THouse,
  TMemberType,
  TPositionValue,
  ZMemberType,
} from "@/app/sclub-member/(overview)/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getListMember } from "@/lib/data/sclub-member";
import { convertAvatarText } from "@/lib/utils";

export const MemberTable = async ({
  query,
}: {
  query: TGetListMemberSearchParams;
}) => {
  const currentTerm = new Date().getFullYear() - FIRST_SCLUB_TERM;
  const {
    gender,
    memberType,
    name,
    house,
    order,
    pageIndex = 0,
    pageSize = 10,
    joiningYear,
    position,
  } = query;
  const orderOption = order?.split(" ")[0] as "house" | "name" | "createdAt";
  const orderType = order?.split(" ")[1] as "asc" | "desc";

  const { items } = await getListMember({
    filters: {
      gender: !gender ? null : gender,
      house: !house ? null : house,
      memberType: !memberType ? null : memberType,
      joiningYear: !joiningYear ? null : joiningYear,
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
    pageSize,
  });

  return (
    <Table parentClassName='h-[80dvh]'>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>House</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>MemberType</TableHead>
          <TableHead>University</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const findPosition = item.positions.find((position) => {
            return position.term === currentTerm;
          });

          const position =
            item.positions.length === 0
              ? ""
              : item.memberType.name !== ZMemberType.Enum.regular_member
                ? ""
                : !findPosition
                  ? ""
                  : POSITION_NAME[findPosition.name as TPositionValue];

          return (
            <TableRow key={item.id}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={item.avatarUrl} alt='avatar' />
                    <AvatarFallback className='flex h-full w-full items-center justify-center bg-primary text-sm text-white'>
                      {convertAvatarText(item.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{item.fullName}</p>
                  {position && <Badge>{position}</Badge>}
                </div>
              </TableCell>
              <TableCell>{HOUSE_NAME[item.house.name as THouse]}</TableCell>
              <TableCell>{GENDER_NAME[item.gender.name as TGender]}</TableCell>
              <TableCell>
                {MEMBER_TYPE_NAME[item.memberType.name as TMemberType]}
              </TableCell>
              <TableCell>{item.university ? item.university : "N/A"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
