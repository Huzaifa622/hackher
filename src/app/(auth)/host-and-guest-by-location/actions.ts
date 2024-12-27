"use client";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export default async function getHostAndGuestByLocation({
  role,
  city,
  state,
  country,
}: {
  role: string;
  city: string;
  state: string;
  country: string;
}) {
  try {
    const res = await api.get(
      `/superadmin/v1/info/filter_by_location/?role=${role}&city=${city}&state=${state}&country=${country}`,
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
