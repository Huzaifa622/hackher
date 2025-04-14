"use client";
import { Pencil, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";
export default function OptionTab({
  s,
  idx,
  fetch,
}: {
  s: { id: string; name: string; symtom: string };
  idx: number;
  fetch: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(s.name);

  return (
    <div
      key={s.id}
      className="ml-4 border mb-2 flex justify-between items-center hover:bg-gray-200 w-[400px] p-2 rounded-md transition-all ease-linear cursor-pointer"
    >
      <p>
        {idx + 1}
        {"."} {s.name}
      </p>
      <div className="flex items-center gap-1">
        <div className="hover:bg-gray-300 p-2 rounded-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div>
                <Pencil size={15} className="" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit option</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={async (e: React.SyntheticEvent) => {
                    try {
                      const res = await api.put(
                        "/superadmin/v1/info/update_symptom_option/",
                        {
                          id: s.id,
                          name: name,
                        }
                      );
                      console.log(res);
                      fetch();
                      setOpen(false);
                    } catch (error: any) {
                      // console.log(error)
                      toast.error(error.response.data.error);
                    }
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div
          className="hover:bg-gray-300 p-2 rounded-full"
          onClick={async (e: React.SyntheticEvent) => {
            try {
              const res = await api.delete(
                `/superadmin/v1/info/delete_symptom_option/?id=${s.id}`
              );
              fetch();
              toast.success("Option Delete Successfully");
            } catch (error:any) {
              toast.error(error.response.data.error);
            }
          }}
        >
          <Trash2 size={15} className=" " />
        </div>
      </div>
    </div>
  );
}
{
  /*   */
}
