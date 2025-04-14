import { columns } from "../../_components/data-table/columns";
import { DataTable } from "../../_components/data-table/data-table";
import Filter from "./_components/filter";
const date = new Date();
const data =  [
    {
      name: "john",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "doe",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "shakeeb",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "john",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "doe",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "shakeeb",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "john",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "doe",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "shakeeb",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "john",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "doe",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    {
      name: "shakeeb",
      status: "active",
      dateStart: date.toDateString(),
      dateEnd: date.toDateString(),
    },
    // ...
  ]

export default function page() {
  return (
    <div className="p-5">
 <Filter/>
 <DataTable columns={columns} data={data}  />
    </div>
  );
}
