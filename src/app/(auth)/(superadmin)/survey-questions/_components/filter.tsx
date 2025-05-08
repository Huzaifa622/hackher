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
  cat: string;

  setCat: React.Dispatch<React.SetStateAction<string>>;
}
export default function Filter({ cat, setCat }: Props) {
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
            {["host", "guest"].map((c, idx) => (
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
