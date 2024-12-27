"use client"
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export default async function getHostAndGuestByAge({
  role,
  age,
  gender,
}: {
  role: string;
  age: string;
  gender: string;
}) {
  try {
    const res = await api.get(
      `/superadmin/v1/info/filter_by_age_group/?role=${role}&age_group=${age}&gender=${gender}`,
      {headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}
    );
    console.log(res.data);
    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err:any) {
 
    toast.error(err.response.data.message);
 
  }
}
