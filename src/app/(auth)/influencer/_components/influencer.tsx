"use client";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

import Loader from "@/components/ui/loader";
import getInfluencers from "../actions";
import { columns } from "./columns";



export default function Influncer() {
  const [data, setData] = useState<{ id: string; fname: string; lname:string; email:string }[]>();
  const [loader , setLoader] = useState(true)

  const fetchAll = async () => {
    
    const res = await getInfluencers();
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
        <DataTable columns={columns} data={data ? data : []} fetchAll={fetchAll}/>
      </div>
    </div>
  );
}
