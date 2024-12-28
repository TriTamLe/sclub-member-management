import { AvatarFallback } from "@radix-ui/react-avatar";

import { FIRST_SCLUB_TERM } from "@/app/sclub-member/constants";
import {
  GENDER_NAME,
  HOUSE_NAME,
  MEMBER_TYPE_NAME,
  POSITION_NAME,
  TGender,
  THouse,
  TMemberType,
  TPositionValue,
  ZMemberType,
} from "@/app/sclub-member/types";
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
import { TGetListMemberDTO } from "@/lib/data/sclub-member";
import { convertAvatarText } from "@/lib/utils";

interface IMemberTable {
  data: TGetListMemberDTO;
}

export const MemberTable = ({ data }: IMemberTable) => {
  const { items } = data;
  const currentTerm = new Date().getFullYear() - FIRST_SCLUB_TERM;

  return (
    <Table>
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
