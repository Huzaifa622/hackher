"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import getHostAndGuestByLocation from "../actions";
import Filter from "./filter";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";


export default function HostAndGuestByLocation(){
    const [role, setRole] = useState<"host" | "guest">("host");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [loader , setLoader] = useState(true);
    const [data, setData] =
      useState<
        {
          fname: string;
          lname: string;
          contact: string;
          email: string;
          dob: string;
          gender: string;
        }[]
      >();
    const fetchAll = async () => {
      const res = await getHostAndGuestByLocation({ role, city, state , country });
      if(res){
        const resData = res.data;
        const withAgeData = resData.map(
          (d: {
            fname: string;
            lname: string;
            contact: string;
            email: string;
            dob: string;
            gender: string;
          }) => ({ ...d, age: calculateAge(String(d.dob)) })
        );
          setData(withAgeData);
      }
      setLoader(false)
    };
    useEffect(() => {
      fetchAll();
    }, [role, city, state , country]);
    if(loader){
      return (
        <div className="flex justify-center h-screen items-center">
          <Loader/>
        </div>
      )
    }
    return(
        <div className="p-5">
        <Filter
          role={role}
          state={state}
          city={city}
          country={country}
          setRole={setRole}
          setState={setState}
          setCity={setCity}
          setCountry={setCountry}
        />
        <DataTable columns={columns} data={data? data:[]} />
      </div>
    )
}