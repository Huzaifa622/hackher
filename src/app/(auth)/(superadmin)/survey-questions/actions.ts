"use client"
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export  async function getSurveyQuestion({
 cat
}: {
 cat:string
}) {
  try {
    const res = await api.get(
      `/superadmin/v1/survey/get_all_question_choice?id=${cat}`,
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

export  async function getQCat() {
   try {
     const res = await api.get(
       `/superadmin/v1/survey/get_survay`,
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
 