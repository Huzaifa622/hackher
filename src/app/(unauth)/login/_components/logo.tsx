"use client"
import Image from "next/image";

export default function Logo(){
    
    return(
        <div>
            <Image src={"/images/logo.png"} alt="logo" width={200} height={100} />
        </div>
    )
}