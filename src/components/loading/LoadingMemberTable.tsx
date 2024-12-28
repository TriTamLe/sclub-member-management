import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const LoadingMemberTable = () => {
  return (
    <Table className='animate-pulse ' parentClassName='h-[80dvh]'>
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
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                  <div className='w-20 rounded bg-gray-200 py-4'></div>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className='w-full rounded bg-gray-200 py-4'></div>
              </TableCell>
              <TableCell>
                {" "}
                <div className='w-full rounded bg-gray-200 py-4'></div>
              </TableCell>
              <TableCell>
                <div className='w-full rounded bg-gray-200 py-4'></div>
              </TableCell>
              <TableCell>
                {" "}
                <div className='w-full rounded bg-gray-200 py-4'></div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
