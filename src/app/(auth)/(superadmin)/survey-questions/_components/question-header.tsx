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
export default function QuestionHeader({
  sname,
  id,
  fetch,
}: {
  id: string;
  sname: string;
  fetch: () => Promise<void>;
}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [addQData, setAddQData] = useState<{
    question_type: string;
    question_text: string;
    choice_selection_limit: string;
  }>({
    question_type: "multiple_choice",
    question_text: sname,
    choice_selection_limit: "1",
  });
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
                    value={addQData.question_text}
                    onChange={(e) =>
                      setAddQData((prev) => ({
                        ...prev,
                        question_text: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={async (e: React.SyntheticEvent) => {
                    try {
                      setIsOpenDialog(false);
                      const res = await api.patch(
                        `/superadmin/v1/survey/update_survay_question/?id=${id}`,
                        addQData
                      );
                    
                      fetch();
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
                `/superadmin/v1/survey/delete_survey_question/?id=${id}`
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
