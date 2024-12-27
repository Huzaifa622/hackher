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
import Logo from "./logo";
import AdminLogin from "../actions";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
// import { AdminLogin } from "../actions";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter correct email" }),
  password: z.string().min(8),
});

type Login = z.infer<typeof LoginSchema>;

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Login>({ email: "", password: "" });
  const [error, setError] = useState<any>({});
  const [loader , setLoader] =useState(false) // eslint-disable-line
  const router = useRouter();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse(data);
    if (validation.success === false) {
      return setError(validation?.error?.format());
    }
    setError({});
    setLoader(true)

    const res = await AdminLogin(data);
    console.log(res)
    if (res.status == true) {
      console.log(res);
      toast.success(res.message);
      setLoader(false)
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/hosts-guests-by-age");
    }

    if (res.status == false) {
      setLoader(false)
      toast.error(res.message);
    }
  };
  if(loader){
    return (
      <div className="flex justify-center w-screen h-screen items-center">
        <Loader/>
      </div>
    )
  }
  return (
    <div className="w-[90%] md:w-[30%] ">
      <div className="flex justify-center items-center py-12">
        <Logo />
      </div>
      <div className=" rounded-sm p-4 py-12 shadow-lg bg-white ">
        <h1 className="text-2xl text-center text-[#262932] font-bold">
          Welcome{" "}
        </h1>

        <div className="mb-4 ">
          <label className="text-sm">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Email.."
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full text-sm p-2 pl-8 rounded-md border outline-none"
            />
            <EnvelopeClosedIcon className="absolute top-[30%] left-2" />
          </div>
          {error.email && (
            <span className="text-red-500 text-xs">
              {error.email._errors[0]}
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
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Password.."
              className="w-full p-2 text-sm rounded-md border outline-none"
            />
          </div>
          {error.password && (
            <span className="text-red-500 text-xs">
              {error.password._errors[0]}
            </span>
          )}
        </div>
        <div
          onClick={handleLogin}
          className="text-center cursor-pointer py-1 flex bg-[#262932] rounded-sm justify-center"
        >
          <button className=" flex justify-center items-center gap-2 text-sm rounded-sm p-1 text-white">
            Sign In <EnterIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
