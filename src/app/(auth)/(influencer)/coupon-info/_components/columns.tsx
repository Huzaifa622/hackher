"use client";
import jsPDF from "jspdf";
import {} from "jspdf-autotable";
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/axiosInstance";
// import jsPDF from "jspdf";


  const SnackActions: React.FC<{ row: any;  }> = ({
    row,
   
  }) => {
 const [data , setData] = useState<{total_charged_amount:string; total_influencer_commission:string;

  data: {
      id: string;
      subscribed_at: string;
      package_name: string;
      package_price: string;
      coupon_code: string;
      discount_percentage: string;
      amount: string;
      user_name: string;
      user_email: string;
      commission_percent: string;
      commission_amount: string;
  }[],
 }>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(()=>{
      const fetchAll = async () =>{
        const res =await api.get(`/superadmin/v1/promotion/get_inflencer_users/?promo_id=${row.original.id}`)
        setData(res.data)
        console.log(res.data)
      }
      console.log(data)
      fetchAll()
    },[])
    const generatePDF = () => {
      const doc = new jsPDF();
    
      // Add Title
      doc.setFontSize(16);
      doc.text("Data Report", 14, 20);
    
      // Add total information
      const totalInfo = [
        ["Total Charged Amount", data?.total_charged_amount],
        ["Total Influencer Commission", data?.total_influencer_commission],
      ];
    
      let yOffset = 30;
      totalInfo.forEach(([label, value]) => {
        doc.setFontSize(12);
        doc.text(`${label}: ${value}`, 14, yOffset);
        yOffset += 10;
      });
    
      // Define table headers and rows
      const headers = [
        "Subscribed At",
        "Package Name",
        "Package Price",
        "Coupon Code",
        "Discount Percentage",
        "Amount",
        "User Name",
        "User Email",
        "Commission Percent",
        "Commission Amount",
      ];
      const rows = data?.data.map((entry) => [
        entry.subscribed_at,
        entry.package_name,
        entry.package_price,
        entry.coupon_code,
        `${entry.discount_percentage}%`,
        entry.amount,
        entry.user_name,
        entry.user_email,
        `${entry.commission_percent}%`,
        entry.commission_amount,
      ]);
    
      // Add table to PDF
      doc.autoTable({
        startY: yOffset + 10,
        head: [headers],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133] }, // Custom header color
        styles: { fontSize: 10, cellPadding: 2 },
      });
    
      // Save the PDF
      doc.save("data-report.pdf");
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-sm">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
  
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-center w-full">
                  <div className="flex items-center gap-2">
                    <Eye size={15} />
                    View
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="overflow-x-auto min-w-[1200px]">
                <DialogHeader>
                  <DialogTitle>Details</DialogTitle>
                </DialogHeader>
               <div>
               <Table className="overflow-hidden" >
  {/* Table Header */}
  <TableHeader>
    <TableRow>
      {/* <TableHead className="w-[150px]">ID</TableHead> */}
      <TableHead>User Name</TableHead>
      <TableHead>User Email</TableHead>
      <TableHead>Subscribed At</TableHead>
      <TableHead>Package Name</TableHead>
      <TableHead>Package Price</TableHead>
      <TableHead>Coupon Code</TableHead>
      <TableHead>Discount Percentage</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Commission Percent</TableHead>
      <TableHead className="text-right">Commission Amount</TableHead>
    </TableRow>
  </TableHeader>

  {/* Table Body */}
  <TableBody>
    {data?.data.map((entry) => (
      <TableRow key={entry.id}>
        {/* <TableCell className="font-medium">{entry.id}</TableCell> */}
        <TableCell>{entry.user_name}</TableCell>
        <TableCell>{entry.user_email}</TableCell>
        <TableCell>{entry.subscribed_at}</TableCell>
        <TableCell>{entry.package_name}</TableCell>
        <TableCell>{entry.package_price}</TableCell>
        <TableCell>{entry.coupon_code}</TableCell>
        <TableCell>{entry.discount_percentage}%</TableCell>
        <TableCell>{entry.amount}</TableCell>
        <TableCell>{entry.commission_percent}%</TableCell>
        <TableCell className="text-right">{entry.commission_amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>

  {/* Table Footer */}
  <TableFooter>
    <TableRow>
      <TableCell colSpan={10} className="font-bold">
        Total Charged Amount
      </TableCell>
      <TableCell className="text-right">{data?.total_charged_amount}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={10} className="font-bold">
        Total Influencer Commission
      </TableCell>
      <TableCell className="text-right">{data?.total_influencer_commission}</TableCell>
    </TableRow>
  </TableFooter>
</Table>

               </div>
                <DialogFooter>
                  <Button type="button" onClick={()=>generatePDF()}>
                    Download PDF
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
  
         
         
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "influencer_name",
    header: "Influencer Name",
  },
  {
    accessorKey: "promo_code",
    header: "Promo Code",
  },
  {
    accessorKey: "packages",
    header: "Packages",
  },
  {
    accessorKey: "stripe_coupon_id",
    header: "Stripe Id",
  },
  {
    accessorKey: "no_of_accounts_allowed",
    header: "Account Allowed",
  },
  {
    accessorKey: "discount_percent",
    header: "Discount Percent",
  },
  {
    accessorKey: "expiration_date",
    header: "Expiration",
  },
  {
    accessorKey: "influencer_contact",
    header: "Influencer Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <SnackActions row={row} />
  },
];