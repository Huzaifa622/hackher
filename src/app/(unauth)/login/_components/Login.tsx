"use client";
import {
  EnterIcon,
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import AdminLogin from "../actions";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import Logo from "./logo";
import { zodResolver } from "@hookform/resolvers/zod";
// import { AdminLogin } from "../actions";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter correct email" }),
  password: z.string().min(8),
});

type Login = z.infer<typeof LoginSchema>;

export default function Login() {
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });
  const [loader, setLoader] = useState(false); // eslint-disable-line
  const router = useRouter();


  const formSubmit = async (data: Login) =>{
    setLoader(true);
    console.log(data)
    const res = await AdminLogin(data);
      
      if (res.status == true) {
        toast.success(res.message);
        setLoader(false);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("role", res.data.role);
        router.push("/hosts-guests-by-age");
      }
  
      if (res.status == false) {
        setLoader(false);
        toast.error(res.message);
      }
  }
  // const handleLogin = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   const validation = LoginSchema.safeParse(data);
  //   if (validation.success === false) {
  //     return setError(validation?.error?.format());
  //   }
  //   setError({});
  //   setLoader(true);

  //   const res = await AdminLogin(data);
  //   console.log(res);
  //   if (res.status == true) {
  //     toast.success(res.message);
  //     setLoader(false);
  //     localStorage.setItem("token", res.token);
  //     localStorage.setItem("user", JSON.stringify(res.data));
  //     localStorage.setItem("role", res.data.role);
  //     router.push("/hosts-guests-by-age");
  //   }

  //   if (res.status == false) {
  //     setLoader(false);
  //     toast.error(res.message);
  //   }
  // };
  if (loader) {
    return (
      <div className="flex justify-center w-screen h-screen items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-[90%] md:w-[30%] ">
      <div className="flex justify-center items-center py-12">
        <Logo />
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className=" rounded-sm p-4 py-12 shadow-lg bg-white ">
        <h1 className="text-2xl text-center text-[#262932] font-bold">
          Welcome{" "}
        </h1>

        <div className="mb-4 ">
          <label className="text-sm">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Email.."
              {...register("email")}
              className="w-full text-sm p-2 pl-8 rounded-md border outline-none"
            />
            <EnvelopeClosedIcon className="absolute top-[30%] left-2" />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm">Password</label>
          <div className="relative">
            <div
              onClick={() => setVisible(!visible)}
              className="absolute right-2 top-[25%]"
            >
              {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </div>
            <input
              type={visible ? "text" : "password"}
              {...register("password")}
              placeholder="Password.."
              className="w-full p-2 text-sm rounded-md border outline-none"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="text-center w-full cursor-pointer py-1 flex bg-[#262932] rounded-sm justify-center"
        >
          <div className=" flex justify-center items-center gap-2 text-sm rounded-sm p-1 text-white">
            Sign In <EnterIcon />
          </div>
        </button>
      </form>
    </div>
  );
}
