"use client";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import SidebarTab from "./sidebar-tab";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role , setRole] = useState<string>("")
  useEffect(()=>{
    const role = localStorage.getItem("role");
  setRole(role!)

},[])

console.log(role)
  return (
    <div className="bg-[#262932] overflow-y-auto h-full">
      <div className="w-[20%] fixed bg-[#262932] h-full overflow-y-auto px-2 example">
        <div className="flex justify-center items-center py-4 mb-8">
          <Logo />
        </div>
        <div className="w-full flex flex-col gap-8 capitalize pb-12">
          {/* <SidebarTab title="Dashbaord" href="/" /> */}
          {/* <SidebarTab title="Hosts & Guests by cycle" href="/hosts-guests-by-cycle" /> */}

          {role &&role == "superadmin" && (
            <>
              <SidebarTab
                title="Hosts & Guests by age"
                href="/hosts-guests-by-age"
              />

              {/* <SidebarTab title="Age demographic" href="/age-demographics" /> */}
              {/* <SidebarTab title="Likes" href="/likes" /> */}
              <SidebarTab title=" snack lists" href="/snacks" />
              <SidebarTab
                title=" specific symptoms"
                href="/specific-symptoms"
              />
              <SidebarTab title="host stats" href="/host-stats" />
              <SidebarTab title="relationship" href="/relationship" />
              <SidebarTab
                title=" hosts & guests by location"
                href="/host-and-guest-by-location"
              />
              {/* <SidebarTab title="Trends" href="/trends" /> */}
              {/* <SidebarTab title=" progesterone" href="/porgesterone" /> */}
              <SidebarTab
                title=" Host week summary"
                href="/host-week-summary"
              />
              <SidebarTab
                title=" Symptoms Percentage of Hosts"
                href="/symptom-percentage-all-hosts"
              />
              <SidebarTab
                title="Package Management"
                href="/package-management"
              />
                <SidebarTab
                title="Influencer"
                href="/influencer"
              />
                 <SidebarTab
                title="User's Account Deletion"
                href="/deleted-users"
              />
                   <SidebarTab
                title="Personally Identifiable Information"
                href="/pii"
              />
                   <SidebarTab
                title="Feedback"
                href="/feedback"
              />
                   <SidebarTab
                title="Mercury Records"
                href="/mercury-records"
              />
                     <SidebarTab
                title="Survey Questions"
                href="/survey-questions"
              />
            </>
          )}
           {role &&role == "influencer" && (
            <>
              <SidebarTab
                title="Coupon Information"
                href="/coupon-info"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
