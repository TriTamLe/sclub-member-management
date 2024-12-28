import { LoadingMemberTable } from "@/components/loading";

const Loading = () => {
  return (
    <div className='flex h-full w-full animate-pulse flex-col items-center justify-center gap-10 p-10 lg:p-20'>
      <div className='flex w-full flex-row items-center justify-between gap-5'>
        <div className='flex grow flex-row items-center gap-5'>
          <div className='h-4 max-w-lg rounded bg-gray-200'></div>
          <div className='h-full w-36 rounded bg-gray-200'></div>
        </div>
        <div className='block h-10 w-32 rounded-md bg-gray-200'></div>
      </div>

      <LoadingMemberTable />
    </div>
  );
};

export default Loading;
