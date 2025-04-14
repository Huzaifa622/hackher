"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loader from "@/components/ui/loader";
import {getPromo } from "../actions";


export default function CouponInfo() {
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


  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const promoRes = await getPromo();
    if (promoRes) {
      const resData = promoRes.data;
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
      <DataTable
      
 
        columns={columns}
        data={data ? data : []}
      
      />
    </div>
  );
}
