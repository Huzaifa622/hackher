import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[80%] example">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
