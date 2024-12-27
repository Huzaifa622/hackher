"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import getHostWeekSummary from "../actions";
import { Columns } from "./columns";
import Loader from "@/components/ui/loader";

export default function HostWeekSummary() {
  const [data, setData] = useState<
    {
      host_name: string;
      state: string;
      city: string;
      country: string;
      current_week:string;
    }[]
  >();
  const [totalUsers, setTotalUser] = useState();
  const [weekSummary, setWeekSummary] = useState<{
    bleed_week: string;
    nurture_week: string;
  }>();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getHostWeekSummary();
    setData(res.details);
    setTotalUser(res.total_users);
    setWeekSummary(res.week_summary);
    setLoader(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-5">
      {/* <Filter /> */}
      <div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-base font-bold">Host Week Summary:</h1>
            <div className="flex flex-col text-sm items-start capitalize">
              <h5> nurture week: {weekSummary?.nurture_week}</h5>
              <h5>bleed week: {weekSummary?.bleed_week}</h5>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-sm font-bold"> Total User</h1> : {totalUsers}
          </div>
        </div>
        <DataTable
          columns={Columns(fetchAll)}
          data={data ? data : []}
          fetchAll={fetchAll}
        />
      </div>
    </div>
  );
}
