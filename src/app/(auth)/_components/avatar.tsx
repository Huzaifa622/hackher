
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AvatarName({fname , role}:{fname:string; role:string}){
    return(
        <div className="flex items-center gap-2">
        <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-[#2F2F3B] py-1">
        <h1 className="">{fname}</h1>
        <h4 className="text-xs">{role}</h4>
      </div>
      </div>
    )
}