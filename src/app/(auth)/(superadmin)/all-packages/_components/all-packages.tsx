"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

import { Columns, Plan } from "./columns";
import getRelationship from "../actions";
import Loader from "@/components/ui/loader";

export default function AllPackages() {
  const [data, setData] =
    useState<
      Plan[]
    >();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getRelationship();
    setData(res.data);
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
        <DataTable
          columns={Columns(fetchAll)}
          data={data ? data : []}
          fetchAll={fetchAll}
        />
      </div>
    </div>
  );
}
