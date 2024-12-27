"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import getSnacks from "../actions";
import { Columns } from "./columns";
import Loader from "@/components/ui/loader";


export default function Snacks() {
  const [data, setData] = useState<{ id: string; name: string }[]>();
  const [loader , setLoader] = useState(true)

  const fetchAll = async () => {
    
    const res = await getSnacks();
    setData(res.data);
    setLoader(false)
  };
  useEffect(() => {
    fetchAll();
  }, []);
  if(loader){
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader/>
      </div>
    )
  }
  return (
    <div className="p-5">
      {/* <Filter /> */}
      <div>
        <DataTable columns={Columns(fetchAll)} data={data ? data : []} fetchAll={fetchAll}/>
      </div>
    </div>
  );
}
