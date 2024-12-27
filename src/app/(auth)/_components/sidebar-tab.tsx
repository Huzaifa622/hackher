"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  className?: string;
  href: string;
}
export default function SidebarTab({ title, className, href }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        " relative  p-4 w-full  rounded-lg text-sm hover:bg-[#7366FF33] hover:text-[#7366FF] transition-all ease-linear text-[#FFFFFF]",
        pathname == href && "bg-[#7366FF33] text-[#7366FF]"
      )}
    >
      <h4>{title}</h4>
      <div className="absolute w-[80%] bg-[#FFFFFF1A] h-[1px] -bottom-5 "></div>
    </Link>
  );
}
