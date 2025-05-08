import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axiosInstance";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddOptionBtn({
  id,
  fetch,
  cat
}: {
  id: string;
  cat:string;
  fetch: () => Promise<void>;
}) {
    const [name , setName] = useState<string>("")
    const [open , setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center gap-2 text-white mt-4 w-full bg-black py-4 rounded-md">
          <CirclePlus size={20} className="text-white " /> Add New Option
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Option</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              try {
                const res = await api.post(
                  "/superadmin/v1/survey/survey_choices/",
                  {
                    question: id,
                    name: name,
                    choice_type:cat
                  }
                );
                toast.success("Option Added Successfully");

                fetch();
                setName("")
                setOpen(false)
              } catch (error: any) {
                toast.error(error.response.data.error);
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
