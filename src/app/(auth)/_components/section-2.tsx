import { BarCharts } from "./chart-ui/bar-chart";
import { RadialChart } from "./chart-ui/radial-chart";

export default function Section2() {
  return (
    <div className="flex gap-2 items-center w-full">
        <div className="w-[70%]">
      <BarCharts />
      </div>
      <div className="w-[30%]">
      <RadialChart />
    </div></div>
  );
}
