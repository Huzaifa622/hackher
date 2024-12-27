import Image from "next/image";

export default function DashboardCard(){
    return(
        <div className="bg-white shadow-lg  rounded-xl flex items-center w-full gap-3 p-5">
            <Image src={"/images/user.png"} alt="usr" width={50} height={200} />
            <div className="">
                <h1 className="text-2xl font-light ">10000</h1>
                <h1>Total Users</h1>
            </div>
        </div>
    )
}