import { api } from "@/lib/axiosInstance";

export default async function getSymptomPercentage() {
    try {
      const res = await api.get("/superadmin/v1/info/symptoms_percentage/",
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