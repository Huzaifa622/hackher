"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import getMercuryRecords from "../actions";
import { Columns, IMercuryRecords } from "./columns";
import Loader from "@/components/ui/loader";

export default function MercuryRecords() {
  const [data, setData] = useState<
  IMercuryRecords[]
  >();
 
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getMercuryRecords();
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
