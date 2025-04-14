"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchAll: () => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchAll,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      // sorting,
      columnFilters,
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fdata, setFData] = useState<{
    fname: string;
    lname: string;
    email: string;
    password: string;
  }>({fname:"" , lname:"" , email:"" , password:""});
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await api.post("/superadmin/v1/influencer/create_influencer/", fdata);
    console.log(res);
    if (res.status == 201) {
      fetchAll();
      toast.success(res.data.message);
      setIsDialogOpen(false);
      setFData({fname:"" , lname:"" , email:"" , password:""})
    }
  };
  return (
    <div className="bg-white p-3 rounded-lg my-8 shadow-xl border">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search..."
          value={(table.getColumn("fname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fname")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="bg-[#262932] text-white px-4 py-2 text-sm rounded-md font-semibold"
              color="#262932"
            >
              Add Influencer
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Influencer</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  First Name
                </Label>
                <Input
                  id="fname"
                  //   defaultValue="Pedro Duarte"
                  value={fdata.fname}
                  onChange={(e) => setFData(prev=>({...prev , fname:e.target.value}))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lname"
                  //   defaultValue="Pedro Duarte"
                  value={fdata.lname}
                  onChange={(e) => setFData(prev=>({...prev , lname:e.target.value}))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  //   defaultValue="Pedro Duarte"
                  value={fdata.email}
                  onChange={(e) => setFData(prev=>({...prev , email:e.target.value}))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  //   defaultValue="Pedro Duarte"
                  value={fdata.password}
                  onChange={(e) => setFData(prev=>({...prev , password:e.target.value}))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Add Influencer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md ">
        <Table>
          <TableHeader className="bg-gray-100 uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
