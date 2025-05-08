import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Delete, Edit, MoreHorizontal } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { api } from "@/lib/axiosInstance";
// import toast from "react-hot-toast";

export interface UserFeedback {
  id: string;
  user_email: string;
  connection_response: 'yes' | 'no' | string;
  understanding_response: 'yes' | 'no' | string;
  prediction_accuracy: 'yes' | 'no' | string;
  hormones_affect: 'yes' | 'no' | string;
  recommendation_likelihood: 'yes' | 'no' | string;
  ease_of_use: 'yes' | 'no' | string;
  additional_feedback: string;
  created_at: string; // ISO 8601 date string
}


// const SnackActions: React.FC<{ row: any; fetchAll: () => Promise<void> }> = ({
//   row,
//   fetchAll,
// }) => {
//   const [name, setName] = useState<string>(row.original.name);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleSubmit = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     const res = await api.put("/superadmin/v1/info/update_snack/", {
//       id: row.original.id,
//       name: name,
//     });
//     if (res.status === 200) {
//       toast.success(res.data.message);
//       fetchAll();
//       setIsDialogOpen(false);
//     }
//   };

//   const handleDel = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     const res = await api.delete("/superadmin/v1/info/delete_snack/", {
//       data: {
//         id: row.original.id,
//       },
//     });
//     if (res.status === 200) {
//       toast.success(res.data.message);
//       fetchAll();
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="text-sm">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>

//         <div onClick={(e) => e.stopPropagation()} className="w-full">
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline" className="text-center w-full">
//                 <div className="flex items-center gap-2">
//                   <Edit size={15} />
//                   Edit
//                 </div>
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Edit Snack</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your snack here. Click save when you&apos;re
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="button" onClick={handleSubmit}>
//                   Save changes
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <DropdownMenuSeparator />
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="outline" className="text-center w-full">
//               <div className="flex items-center gap-2">
//                 <Delete size={15} />
//                 Delete
//               </div>
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={handleDel}>
//                 Continue
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

export const Columns = (): ColumnDef<UserFeedback>[] => [
  {
    accessorKey: "user_email",
    header: "User Email",
  },
  {
    accessorKey: "connection_response",
    header: "Felt a Connection?",
  },
  {
    accessorKey: "understanding_response",
    header: "Understood You?",
  },
  {
    accessorKey: "prediction_accuracy",
    header: "Accurate Predictions?",
  },
  {
    accessorKey: "hormones_affect",
    header: "Understood Hormonal Effects?",
  },
  {
    accessorKey: "recommendation_likelihood",
    header: "Would Recommend?",
  },
  {
    accessorKey: "ease_of_use",
    header: "Easy to Use?",
  },
  {
    accessorKey: "additional_feedback",
    header: "Additional Feedback",
  },
  {
    accessorKey: "created_at",
    header: "Submitted At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toISOString().split("T")[0]; 
    },
  },
];
