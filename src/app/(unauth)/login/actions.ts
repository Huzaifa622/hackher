"use server";
import { cookies } from "next/headers";

export default async function AdminLogin(data: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/superadmin/v1/auth/login/`,
      {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data!),
      }
    );

    const response = await res.json();

    if (response.status == true) {
      cookies().set("token", response.token);
      return response;
    }
    if (response.status == false) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
