"use client"
import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers:{
  //   "Authorization": `Bearer ${localStorage.getItem("token")}`
  // } // Replace with your API URL

});

api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle errors in the request setup
    return Promise.reject(error);
  }
);
