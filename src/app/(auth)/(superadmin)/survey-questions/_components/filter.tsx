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
import { ICat } from "./survey-questions";
interface Props {
  cat: string;
  allCat: ICat[];
  setCat: React.Dispatch<React.SetStateAction<string>>;
}
export default function Filter({ cat, setCat , allCat }: Props) {
  return (
    <div className="bg-[#f1f1fa] rounded-xl p-4">
  
      <div className="flex items-center gap-4">
        <Select
          defaultValue={cat}
          onValueChange={(val: string) => setCat(val)}
        >
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Host" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {allCat.map((c, idx) => (
              <SelectItem key={idx} value={c.id} className="capitalize">
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
