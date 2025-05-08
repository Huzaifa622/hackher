"use client"
import { Filter as LFilter } from "lucide-react"
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect } from "react"
export default function Filter(){


    return(
        <div className="bg-[#f1f1fa] rounded-xl p-4">
            <div className="bg-white flex items-center gap-2 mb-4 w-fit p-4 rounded-md border">
            <LFilter fill="#8b83ba" color="#8b83ba"  stroke="#8b83ba"/>
            <h1>Filter</h1>
            </div>
            <Select>
  <SelectTrigger className="w-[90%] mx-auto  bg-white">
    <SelectValue placeholder="Range" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    {[...Array(10)].map((c,idx)=>(

    <SelectItem key={idx} value={String(10*(idx+1))}>{10*(idx+1)}%</SelectItem>
    ))}
  
  </SelectContent>
</Select>

        </div>
    )
}