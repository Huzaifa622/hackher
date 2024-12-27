"use client";
import { api } from "@/lib/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
export default function SymptomHeader({
  sname,
  id,
  fetch,
}: {
  id: string;
  sname: string;
  fetch: () => Promise<void>;
}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [name, setName] = useState<string>(sname);
  return (
    <div className="flex items-center gap-5">
      {" "}
      {sname}
      <div className="flex items-center gap-1">
        <div className="hover:bg-gray-300 p-2 rounded-full">
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
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
                  <Label htmlFor="name" className="text-center">
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
                        "/superadmin/v1/info/update_symptom/",
                        {
                          id: id,
                          name: name,
                        }
                      );
                      console.log(res);
                      fetch();
                      setIsOpenDialog(false);
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
                `/superadmin/v1/info/purge_symptom/?id=${id}`
              );
              fetch();
              toast.success("Option Delete Successfully");
            } catch (error: any) {
              toast.error(error.response.data.error);
            }
          }}
        >
          <Trash2 size={15} className=" " />
        </div>
      </div>
      <div></div>{" "}
    </div>
  );
}
