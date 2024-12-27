"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarName from "./avatar";
import { Bell, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import Logout from "@/lib/auth";

export default function Navbar() {
  const [user , setUser] = useState<{full_name:string;}>()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")!)
    setUser(user) 
  },[])
  return (
    <div>
      <div className="bg-white shadow-xl drop-shadow-xl">
        <div className="flex items-center gap-4 justify-end py-2 px-5 ">
          {/* <Bell color="gray" /> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none" >
              {/* <Button variant="outline">Open</Button> */}
              <AvatarName fname={user?.full_name || ""} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <span>Info</span>
              </DropdownMenuItem> */}
              <DropdownMenuItem
             
              >
                <span    onClick={async (e: React.SyntheticEvent) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                   Logout();
                }} className="flex items-center gap-2">
                  <LogOut size={15} /> Log Out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
