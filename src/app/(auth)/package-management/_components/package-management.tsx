
"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Filter from "./filter";
// import getHostAndGuestByAge from "../actions";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";
import getPackages from "../actions";


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

export default function PackageManagement() {
  // const [role, setRole] = useState<"host" | "guest">("host");
  // const [ageGroup, setAgeGroup] = useState<"above 18" | "below 18">("above 18");
  // const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [data, setData] = useState<
    {
      stripe_coupon_id: string;
      no_of_accounts_allowed: string;
      promo_code: string;
      discount_percent: string;
      expiration_date: string;
    }[]
  >();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const res = await getPackages();
    if (res) {
      const resData = res.data;
    
// console.log()
      setData(resData);
    }

    setLoader(false);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-5">
      {/* <Filter
        role={role}
        age={ageGroup}
        gender={gender}
        setRole={setRole}
        setAge={setAgeGroup}
        setGender={setGender}
      /> */}
      <DataTable fetchAll={fetchAll} columns={columns} data={data ? data : []} />
    </div>
  );
}

