import Image from "next/image";
import DashboardCard from "./ui/dashboard-card";

export default function Section1() {
  return (
    <div className=" flex justify-between items-center w-full ">
      <Image src={"/images/bg.png"} alt="bg" width={400} height={500} />
      <div className="w-[80%] flex flex-col gap-3">
        <div className="flex gap-5">
          <DashboardCard />
          <DashboardCard />
        </div>
        <div className="flex gap-5">
          <DashboardCard />
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}
