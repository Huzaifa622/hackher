"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Filter from "./filter";
import {getSurveyQuestion , getQCat} from "../actions";
import Loader from "@/components/ui/loader";
import calculateAge from "@/lib/age-calculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuestionHeader from "./question-header";
import OptionTab from "./question-option-tab";

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

export interface ICat  {
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
  const [allCat , setAllCat] = useState<ICat[]>([])
const [ cat, setCat] = useState("bfcb16f3-7532-4079-bcc6-a5ef8fd461cc")
  const [data, setData] = useState<
    Question[]
  >();
  const [loader, setLoader] = useState(true);
  const fetchAll = async () => {
    const cRes  = await getQCat();
    if(cRes){
     setAllCat(cRes.data)
    }
    const sRes = await getSurveyQuestion({cat });
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
      <Filter
      allCat={allCat}
      cat={cat}
        setCat={setCat}
      />
           {data &&
        data.map((d, idx) => (
          <Accordion key={d.id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 text-xl font-medium">
                <QuestionHeader sname={d.question_text} id={d.id} fetch={fetchAll}/>
              </AccordionTrigger>
              <AccordionContent className="px-4 ">
                {/* <h1 className="text-base mb-2">Options</h1> */}
                {/* {d.question_choices.map((s, idx) => (
                  <OptionTab s={s} idx={idx} key={s.id} fetch={fetchAll} />
                ))} */}
                {/* <AddOptionBtn id={d.id} fetch={fetchAll} /> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}
