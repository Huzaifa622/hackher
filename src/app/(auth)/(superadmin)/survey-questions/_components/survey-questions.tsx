"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Filter from "./filter";
import { getSurveyQuestion, getQCat, addSurveyQuestion, getSurveyType } from "../actions";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuestionHeader from "./question-header";
import OptionTab from "./question-option-tab";
import AddOptionBtn from "./add-option-btn";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

// const date = new Date();
// const data = [
//   {
//     fname: "john",
//     lname: "john",
//     email: "active",
//     contact: "active",
//     dob: date.toDateString(),
//     gender: date.toDateString(),
//   },
//   // ...
// ];
export interface ISurveyType{
id:string;
name:string;
survey:string
}
export interface ICat {
  id: string;
  title: string;
  description: string;
}
export interface IQuestionChoice {
  id: string;
  choice_text: string;
  choice_type: string; // Can be changed to enum or more specific type if needed
}

export interface Question {
  id: string;
  question_type: "multiple_choice" | "single_choice" | string;
  question_text: string;
  choice_selection_limit: number;
  question_choices: IQuestionChoice[];
}
export default function SurveyQuestions() {
  const [open, setOpen] = useState(false);
  const [allCat, setAllCat] = useState<ICat[]>([]);
  const [cat, setCat] = useState("bfcb16f3-7532-4079-bcc6-a5ef8fd461cc");
  const [surveyType , setSurveyType] = useState<ISurveyType[]>([])
  const [data, setData] = useState<Question[]>();
  const [addQData, setAddQData] = useState<{
    question_type: string;
    question_text: string;
    choice_selection_limit: string;
  }>({
    question_type: "multiple_choice",
    question_text: "",
    choice_selection_limit: "1",
  });
console.log(surveyType)
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
const ssRes = await getSurveyType(cat)
if(ssRes){
  setSurveyType(ssRes.data)
}


    const cRes = await getQCat();
    if (cRes) {
      setAllCat(cRes.data);
    }
    const sRes = await getSurveyQuestion({ cat });
    if (sRes) {
      setData(sRes.data);
    }
    setLoader(false);
  };
  useEffect(() => {
    fetchAll();
  }, [cat]);

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-5">
      <Filter allCat={allCat} cat={cat} setCat={setCat} />
      <div className="flex justify-end my-2">
        {" "}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle size={15} className="" /> Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit option</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="">
                  Question Text
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
                    setOpen(false);
                    const res = await addSurveyQuestion({
                      data: {
                        survey: cat,
                        ...addQData,
                      },
                    });
                    setAddQData(prev=>({...prev , question_text:""}))
                    console.log(res);
                    fetchAll();
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
      </div>
      {data &&
        data.map((d) => (
          <Accordion key={d.id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 text-xl font-medium">
                <QuestionHeader
                  sname={d.question_text}
                  id={d.id}
                  fetch={fetchAll}
                />
              </AccordionTrigger>
              <AccordionContent className="px-4 ">
                {/* <h1 className="text-base mb-2">Options</h1> */}
                {d.question_choices.map((s, idx) => (
                  <OptionTab s={s} idx={idx} key={s.id} fetch={fetchAll} />
                ))}
                <AddOptionBtn id={d.id} cat={cat} fetch={fetchAll} survey={surveyType} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}
