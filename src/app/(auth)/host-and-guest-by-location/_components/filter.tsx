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
import { useEffect, useState } from "react";
import { api } from "@/lib/axiosInstance";
import Loader from "@/components/ui/loader";

interface Props {
  role: string;
  city: string;
  state: string;
  country: string;
  setRole: React.Dispatch<"host" | "guest">;
  setState: React.Dispatch<string>;
  setCity: React.Dispatch<string>;
  setCountry: React.Dispatch<string>;
}

export default function Filter({
  role,
  city,
  state,
  country,
  setRole,
  setState,
  setCity,
  setCountry,
}: Props) {
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoader(true);
        const res = await api.get("/superadmin/v1/info/user_locations", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = res.data;
        setCities(data.data.cities.filter((city: string) => city)); // Remove empty strings
        setCountries(data.data.countries.filter((country: string) => country));
        setStates(data.data.states.filter((state: string) => state));
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchAll();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="bg-[#f1f1fa] rounded-xl p-4">
      {/* <div className="bg-white flex items-center gap-2 mb-4 w-fit p-4 rounded-md border">
        <LFilter fill="#8b83ba" color="#8b83ba" stroke="#8b83ba" />
        <h1>Filter</h1>
      </div> */}
      <div className="flex items-center gap-4">
        {/* Role Filter */}
        <Select
          defaultValue={role}
          onValueChange={(val: string) => setRole(val as "host" | "guest")}
        >
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {["host", "guest"].map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Filter */}
        <Select
          value={city || ""}
          onValueChange={(val: string) => setCity(val)}
        >
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {cities.map((c, idx) => (
              <SelectItem key={idx} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* State Filter */}
        <Select
          value={state || ""}
          onValueChange={(val: string) => setState(val)}
        >
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {states.map((s, idx) => (
              <SelectItem key={idx} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country Filter */}
        <Select
          value={country || ""}
          onValueChange={(val: string) => setCountry(val)}
        >
          <SelectTrigger className="w-[90%] mx-auto  bg-white">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {countries.map((c, idx) => (
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
