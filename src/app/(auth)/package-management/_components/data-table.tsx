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
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/superadmin/v1/promotion/create_promotions/", {
        promo_code: promo.trim(),
        days_limit: days,
        discount_percentage: discount,
        no_of_accounts_allowed: accountAllowed
      });
      console.log(res)
      if (res.status == 201) {
        fetchAll();
        console.log(res)
        toast.success(res.data.message);
        setIsDialogOpen(false)
        setPromo("")
        setDays("")
        setDiscount("")
        setAccountAllowed("")
      }else{
        toast.error(res.data.message)
      }
      console.log(res)
      
    } catch (error:any) {
      toast.error(error.response.data.message);
      // console.log(error)
    }
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [promo, setPromo] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [accountAllowed, setAccountAllowed] = useState<string>("");
  return (
    <div className="bg-white p-3 rounded-lg my-8 shadow-xl border">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#262932] text-white px-4 py-2 text-sm rounded-md font-semibold" color="#262932">Add Promo Code</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Promo Code</DialogTitle>
              {/* <DialogDescription>
                Make changes to your snack here. Click save when you&apos;re done.
              </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Promo Code
                </Label>
                <Input
                  id="name"
                  //   defaultValue="Pedro Duarte"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Days Limit
                </Label>
                <Input
                  id="days"
                  //   defaultValue="Pedro Duarte"
                  value={days}
                  type="number"
                  onChange={(e) => setDays(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Discount Percentage
                </Label>
                <Input
                  id="discount"
                  //   defaultValue="Pedro Duarte"
                    type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Accounts Allowed
                </Label>
                <Input
                  id="accountsAllowed"
                    type="number"
                  //   defaultValue="Pedro Duarte"
                  value={accountAllowed}
                  onChange={(e) => setAccountAllowed(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Create Promo Code
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
