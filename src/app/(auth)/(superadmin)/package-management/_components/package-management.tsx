"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Filter from "./filter";
// import getHostAndGuestByAge from "../actions";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";
import { getInfluencers, getPackages, getPromo } from "../actions";

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
      influencer_name: string;
      influencer_contact: string;
      packages: string;
      no_of_accounts_allowed: string;
      promo_code: string;
      discount_percent: string;
      expiration_date: string;
    }[]
  >();
  const [packages, setPackages] = useState<
    {
      id: string;
      name: string;
    }[]
  >();
  const [influencers, setInfluencers] = useState<
    {
      id: string;
      fname: string;
      lname: string;
    }[]
  >();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const promoRes = await getPromo();
    if (promoRes) {
      const resData = promoRes.data;
      setData(resData);
    }
    const pRes = await getPackages();
    if (pRes) {
      const resData = pRes.data;

      // console.log()
      setPackages(resData);
    }
    const iRes = await getInfluencers();
    if (iRes) {
      const resData = iRes.data;

      setInfluencers(resData);
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
      <DataTable
        influencers={influencers!}
        fetchAll={fetchAll}
        columns={columns}
        data={data ? data : []}
        packages={packages!}
      />
    </div>
  );
}
