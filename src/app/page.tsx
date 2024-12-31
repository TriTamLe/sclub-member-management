import Link from "next/link";

export default function Home() {
  return (
    <div className=' grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <Link href={"/sclub-member"} className={"hover:text-primary"}>
        View the list of SClub member
      </Link>
    </div>
  );
}
