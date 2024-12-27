
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AvatarName({fname}:{fname:string}){
    return(
        <div className="flex items-center gap-2">
        <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-[#2F2F3B]">
        <h1 className="mb-2">{fname}</h1>
        <h4 className="text-xs">Admin</h4>
      </div>
      </div>
    )
}