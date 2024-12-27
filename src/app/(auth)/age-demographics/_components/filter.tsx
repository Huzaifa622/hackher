import { Filter as LFilter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalenderPicker from "@/components/ui/calender-picker";
export default function Filter() {
  return (
    <div className="bg-[#f1f1fa] rounded-xl p-4">
      {/* <div className="bg-white flex items-center gap-2 mb-4 w-fit p-4 rounded-md border">
        <LFilter fill="#8b83ba" color="#8b83ba" stroke="#8b83ba" />
        <h1>Filter</h1>
      </div> */}
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="18 and over" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              "18 and over",
              " 17 and under",
              "Male/Guest 18 and over",
              "Male/Guest 17 and under",
            ].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <CalenderPicker placeholder="Start Date"/>
      <CalenderPicker placeholder="End Date"/>
       
      </div>
    </div>
  );
}
