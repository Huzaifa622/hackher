"use client"
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export default async function getPackages() {
  try {
    const res = await api.get(
      `/superadmin/v1/promotion/get_promotions/`,
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
