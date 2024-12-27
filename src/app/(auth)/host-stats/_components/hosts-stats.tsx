"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";


import Filter from "./filter";
import getHostStats from "../actions";


export default function HostStats(){
 
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [data, setData] =
      useState<
      {
        average_bleed_days: string;
        average_cycle_length: string;
        average_ovulation_day: string;
      
      }[]
      >();
    const fetchAll = async () => {
      const res = await getHostStats({ city, state , country });
      if(res){
          setData(Array(res));
          console.log(res)
      }
    };
    useEffect(() => {
      fetchAll();
    }, [ city, state , country]);
    return(
        <div className="p-5">
        <Filter
      
          state={state}
          city={city}
          country={country}
   
          setState={setState}
          setCity={setCity}
          setCountry={setCountry}
        />
        <DataTable columns={columns} data={data? data:[]} />
      </div>
    )
}