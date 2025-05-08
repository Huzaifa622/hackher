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
interface Props {
  role: string;
  gender: string;
  age: string;
  setRole:React.Dispatch<"host"|"guest">;
  setGender:React.Dispatch<"female" |"other">;
  setAge:React.Dispatch<"above 18"|"below 18">;
}
export default function Filter({ role, gender, age , setAge , setGender,setRole }: Props) {
  return (
    <div className="bg-[#f1f1fa] rounded-xl p-4">
      {/* <div className="bg-white flex items-center gap-2 mb-4 w-fit p-4 rounded-md border">
        <LFilter fill="#8b83ba" color="#8b83ba" stroke="#8b83ba" />
        <h1>Filter</h1>
      </div> */}
      <div className="flex items-center gap-4">
        <Select defaultValue={role} onValueChange={(val : string) => setRole(val as "host" | "guest")}>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Host" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {["host", "guest"].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={age} onValueChange={(val:string)=>setAge(val as "above 18" | "below 18")}>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue className="capitalize" placeholder="Above 18" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {["above 18", "below 18"].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={gender} onValueChange={(val:string)=>setGender(val as "female" | "other")}>
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue className="capitalize" placeholder="Male" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {["female", "other"].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
