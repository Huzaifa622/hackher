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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  packages: { id: string; name: string }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchAll,
  packages,
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
  const [promo, setPromo] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [accountAllowed, setAccountAllowed] = useState<string>("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [influencer, setInfluencer] = useState<{name:string; commision:string; contact:string}>({name:"", commision:"", contact:""});

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (Number(discount) < 1 || Number(discount) > 99) {
      console.log(discount);
      return toast.error("Discount Percentage Should be between 1 to 99");
    }
    if (Number(influencer.commision) < 1 || Number(influencer.commision) > 99) {
      return toast.error("Influencer Commission Percentage Should be between 1 to 99");
    }
    if (selectedPackages.length == 0) {
      return toast.error("Please Select Package");
    }
    
    try {
      const res = await api.post(
        "/superadmin/v1/promotion/create_promotions/",
        {
          promo_code: promo.trim(),
          days_limit: days,
          discount_percentage: discount,
          no_of_accounts_allowed: accountAllowed,
          packages:selectedPackages,
          influencer_name:influencer.name,
          influencer_commission:influencer.commision,
          influencer_contact:influencer.contact
        }
      );
      console.log(res);
      if (res.status == 201) {
        fetchAll();
        console.log(res);
        toast.success(res.data.message);
        setIsDialogOpen(false);
        setPromo("");
        setDays("");
        setDiscount("");
        setAccountAllowed("");
      } else {
        toast.error(res.data.message);
      }
      console.log(res);
    } catch (error: any) {
      toast.error(error.response.data.message);
      // console.log(error)
    }
  };
 
  const toggleSelection = (id: string) => {
    console.log("asdasdasd")
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((pkg) => pkg !== id) : [...prev, id]
    );
  };
  console.log(selectedPackages)
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
            <button
              className="bg-[#262932] text-white px-4 py-2 text-sm rounded-md font-semibold"
              color="#262932"
            >
              Add Promo Code
            </button>
          </DialogTrigger>
          <DialogContent className="">
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
                  placeholder="AAAAAAA"
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
                  placeholder="12"
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
                  placeholder="1-99"
                  max={99}
                  min={1}
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(String(e.target.value))}
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
                  placeholder="100"
                  //   defaultValue="Pedro Duarte"
                  value={accountAllowed}
                  onChange={(e) => setAccountAllowed(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="packages" className="text-right">
                  Package
                </Label>
                <Select>
                  <SelectTrigger className="w-full col-span-3 h-10">
                    <SelectValue placeholder={selectedPackages.length > 0
                        ? selectedPackages.map((id) =>
                                packages.find((pkg) => pkg.id === id)?.name).join(", ") :"Select Package" } />
                 
              
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Packages</SelectLabel>
                      {packages.map((pkg) => (
                            <div
                key={pkg.id}
                className={`px-2 py-1 cursor-pointer ${
                  selectedPackages.includes(pkg.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  toggleSelection(pkg.id);
                }}
              >
                {pkg.name}
              </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Influencer Name
                </Label>
                <Input
                  id="influencer.name"
                  //   defaultValue="Pedro Duarte"
                  placeholder="Johny "
                  type="text"
                  value={influencer.name}
                  onChange={(e) => setInfluencer(prev=>({...prev , name:e.target.value}))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Influencer Commision %
                </Label>
                <Input
                  id="discount"
                  //   defaultValue="Pedro Duarte"
                  placeholder="1-99"
                  max={99}
                  min={1}
                  type="number"
                  value={influencer.commision}
                  onChange={(e) => setInfluencer(prev=>({...prev , commision:e.target.value}))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Influencer Contact
                </Label>
                <Input
                  id="discount"
                  //   defaultValue="Pedro Duarte"
                  placeholder="Johny@email.com"
                  type="email"
                  value={influencer.contact}
                  onChange={(e) => setInfluencer(prev=>({...prev , contact:e.target.value}))}
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
