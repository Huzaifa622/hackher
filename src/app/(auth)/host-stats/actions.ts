"use client";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export default async function getHostStats({
  city,
  state,
  country,
}: {
  city: string;
  state: string;
  country: string;
}) {
  try {
    const res = await api.get(
      `/superadmin/v1/info/get_host_cycle_stats/?city=${city}&state=${state}&country=${country}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}
