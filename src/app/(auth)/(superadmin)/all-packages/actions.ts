import { api } from "@/lib/axiosInstance";

export default async function getAllPackages() {
    try {
      const res = await api.get("/superadmin/v1/info/get_packages/",
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