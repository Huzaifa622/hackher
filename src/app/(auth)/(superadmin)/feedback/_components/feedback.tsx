"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import getFeedback from "../actions";
import { Columns, UserFeedback } from "./columns";
import Loader from "@/components/ui/loader";

export default function Feedback() {
  const [data, setData] = useState<
   UserFeedback[]
  >();
 
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getFeedback();
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
          columns={Columns()}
          data={data ? data : []}
          fetchAll={fetchAll}
        />
      </div>
    </div>
  );
}
