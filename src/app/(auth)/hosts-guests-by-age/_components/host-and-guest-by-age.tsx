"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Filter from "./filter";
import getHostAndGuestByAge from "../actions";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";

// const date = new Date();
// const data = [
//   {
//     fname: "john",
//     lname: "john",
//     email: "active",
//     contact: "active",
//     dob: date.toDateString(),
//     gender: date.toDateString(),
//   },
//   // ...
// ];

export default function HostAndGuestByAge() {
  const [role, setRole] = useState<"host" | "guest">("host");
  const [ageGroup, setAgeGroup] = useState<"above 18" | "below 18">("above 18");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [data, setData] = useState<
    {
      fname: string;
      lname: string;
      contact: string;
      email: string;
      dob: string;
      age: string;
      gender: string;
    }[]
  >();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getHostAndGuestByAge({ role, age: ageGroup, gender });
    if (res) {
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
// console.log()
      setData(withAgeData);
    }

    setLoader(false);
  };
  useEffect(() => {
    fetchAll();
  }, [role, ageGroup, gender]);

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-5">
      <Filter
        role={role}
        age={ageGroup}
        gender={gender}
        setRole={setRole}
        setAge={setAgeGroup}
        setGender={setGender}
      />
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
}
