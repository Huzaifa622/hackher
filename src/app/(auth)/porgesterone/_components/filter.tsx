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
      <div className="bg-white flex items-center gap-2 mb-4 w-fit p-4 rounded-md border">
        <LFilter fill="#8b83ba" color="#8b83ba" stroke="#8b83ba" />
        <h1>Filter</h1>
      </div>
      <div className="flex flex-col gap-5 ">
      <Select >
          <SelectTrigger className="w-full mx-auto  bg-white">
            <SelectValue placeholder="progesterone" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              "progesterone",
              "testosterone",
              "crash",
              "bleed weeks during any week",
             
         
            ].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="United States" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              "United States",
              "United Kingdom",
              "United Arab Emirates",
              "Uruguay",
         
            ].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
       
        <Select>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="New York City, New York" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              "New York City, New York",
              "Los Angeles, California",
              "Chicago, Illinois",
              "Houston, Texas",
              
            ].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="California" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[
              "California",
              "Texas",
              "Florida",
              "Colorado",
              
            ].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    
       
      </div>
      </div>
    </div>
  );
}
