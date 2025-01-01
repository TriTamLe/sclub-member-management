import { AvatarFallback } from "@radix-ui/react-avatar";
import { PenBoxIcon, Trash } from "lucide-react";

import { FIRST_SCLUB_TERM } from "@/app/sclub-member/constants";
import {
  GENDER_NAME,
  HOUSE_NAME,
  MEMBER_TYPE_NAME,
  POSITION_NAME,
  TGender,
  TGetListMemberSearchParams,
  THouse,
  TMemberType,
  TPosition,
  ZMemberType,
} from "@/app/sclub-member/types";
import { convertMemberListQuery } from "@/app/sclub-member/utils";
import { GoToPage, PageSizeOptions, SCPagination } from "@/components/paging";
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
import { SCTooltip } from "@/components/ui/tooltip";
import { PAGE_SIZE_OPTIONS } from "@/constants";
import { getListMember } from "@/lib/data/sclub-member";
import { convertAvatarText } from "@/lib/utils";

export const MemberTable = async ({
  query,
}: {
  query: TGetListMemberSearchParams;
}) => {
  const currentTerm = new Date().getFullYear() - FIRST_SCLUB_TERM + 1;

  const { items, hasNext, hasPrevious, total } = await getListMember(
    convertMemberListQuery(query),
  );

  const pageIndex = !query.pageIndex ? 0 : parseInt(query.pageIndex);
  const pageSize = !query.size ? PAGE_SIZE_OPTIONS[0] : parseInt(query.size);
  const totalPage =
    Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);

  return (
    <>
      <div className='flex w-full flex-row items-center justify-end gap-5'>
        <SCPagination
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          pageIndex={pageIndex}
          totalPage={totalPage}
        />
        <PageSizeOptions />
        <GoToPage currentPageIndex={pageIndex} totalPage={totalPage} />
      </div>
      <div className={"w-full"}>
        <Table parentClassName='h-[65dvh] overflow-y-auto'>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Member</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Joined in</TableHead>
              <TableHead>Member type</TableHead>
              <TableHead>University</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const hasPositionsInCurrentYear = item.positions.some(
                (position) => {
                  return position.term === currentTerm;
                },
              );

              let positions: TPosition[] = [];

              if (
                item.positions.length !== 0 &&
                item.memberType.name === ZMemberType.Enum.regular_member &&
                hasPositionsInCurrentYear
              ) {
                positions = item.positions
                  .filter((p) => p.term === currentTerm)
                  .map(
                    (p) =>
                      ({
                        value: p.name,
                        term: p.term,
                      }) as TPosition,
                  );
              }

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className='flex items-center gap-2 text-silver'>
                      {pageIndex * pageSize + index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={item.avatarUrl} alt='avatar' />
                        <AvatarFallback className='text-sms flex h-full w-full items-center justify-center bg-background invert'>
                          {convertAvatarText(item.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <p className='text-primary'>{item.fullName}</p>
                      {positions
                        ? positions.map((position, index) => (
                            <Badge
                              key={position.value + position.term + index}
                              className='ml-2 bg-heliotrope text-white'
                            >
                              {POSITION_NAME[position.value]}
                            </Badge>
                          ))
                        : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    {GENDER_NAME[item.gender.name as TGender]}
                  </TableCell>
                  <TableCell>{HOUSE_NAME[item.house.name as THouse]}</TableCell>
                  <TableCell>
                    {item.joiningYear + FIRST_SCLUB_TERM - 1}
                  </TableCell>
                  <TableCell>
                    {MEMBER_TYPE_NAME[item.memberType.name as TMemberType]}
                  </TableCell>
                  <TableCell>
                    {item.university ? item.university : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className='mr-4 flex items-center justify-end gap-5'>
                      <SCTooltip title='Edit member'>
                        <PenBoxIcon
                          size={22}
                          className='cursor-pointer hover:text-info'
                        />
                      </SCTooltip>
                      <SCTooltip title='Delete member'>
                        <Trash
                          size={22}
                          className='cursor-pointer hover:text-destructive'
                        />
                      </SCTooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </>
  );
};
