import Activity from "./ui/activity-card";
import { RecentSales } from "./ui/recent-users";

export default function Section3() {
  return (
    <div className="flex gap-5 py-8">
        <div className="w-1/2">
      <Activity />
      </div>
        <div className="w-1/2">
      <RecentSales />
      </div>
    </div>
  );
}
