"use client"
import { api } from "@/lib/axiosInstance";

export default async function getDeletedUsers() {
    try {
      const res = await api.get("superadmin/v1/info/get_user_deleted_requests/?is_deleted=False",
        {headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }});
      console.log(res.data); 
      return res.data;       
    } catch (err) {
      console.error(err);   
      throw err;             
    }
  }