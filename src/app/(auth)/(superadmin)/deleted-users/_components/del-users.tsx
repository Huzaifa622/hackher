"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import getHostWeekSummary from "../actions";
import { Columns } from "./columns";
import Loader from "@/components/ui/loader";

export default function DelUsers() {
  const [data, setData] = useState<
    {
      requested_date: string;
      user_email: string;
      days_since_request: number;
    }[]
  >();
 
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getHostWeekSummary();
    setData(res.data);
setLoader(false)
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

        <DataTable
          columns={Columns(fetchAll)}
          data={data ? data : []}
          fetchAll={fetchAll}
        />
      </div>
    </div>
  );
}
