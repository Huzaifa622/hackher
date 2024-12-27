"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  stripe_coupon_id: string;
  no_of_accounts_allowed: string;
  promo_code: string;
  discount_percent: string;
  expiration_date: string;
};

export const columns: ColumnDef<User>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "stripe_coupon_id",
    header: "Stripe Id",
  },
  {
    accessorKey: "no_of_accounts_allowed",
    header: "Account Allowed",
  },
  {
    accessorKey: "promo_code",
    header: "Promo Code",
  },
  {
    accessorKey: "discount_percent",
    header: "Discount Percent",
  },
  {
    accessorKey: "expiration_date",
    header: "Expiration",
  }
];