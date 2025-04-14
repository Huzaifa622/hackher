"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import getSpecificSymptoms from "../actions";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import OptionTab from "./options-symptom-tab";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/axiosInstance";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import AddOptionBtn from "./add-option-btn";
import SymptomHeader from "./symptom-header";

interface ISoptions {
  id: string;
  name: string;
  symtom: string;
}
interface IData {
  id: string;
  name: string;
  symtom_options: ISoptions[];
}
export default function SpecificSymptoms() {
  const [data, setData] = useState<IData[]>();
  const [name, setName] = useState<string>("");
  const [options, setOptions] = useState<{ name: string }[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const fetchAll = async () => {
    const res = await getSpecificSymptoms();
    setData(res.data);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, { name: newOption.trim() }]);
      setNewOption("");
      setIsAdding(false);
    }
  };

  const handleAddSymptom = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (name == "" || options.length == 0) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await api.post("/superadmin/v1/info/add_symptom/", {
        name: name,
        symptom_options: options,
      });
      fetchAll();
      setName("");
      setOptions([]);
      toast.success("Symptom Add Successfully");
      setIsOpenDialog(false);
      console.log(res.data);
    } catch (error: any) {
      // console.log(error)
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <div className="bg-white h-screen border rounded-md">
      <div className="p-6 flex justify-end">
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild>
            <button className="bg-[#262932] text-white px-4 py-2 text-sm rounded-md font-semibold">Add Symptom</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Symptom</DialogTitle>
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
                  className="col-span-4"
                />
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 items-center gap-4 mb-4">
                  <Label  className=" ">
                    Options:
                  </Label>
                  <div className="col-span-4">
                    {options.map((option, index) => (
                      <Card
                        key={index}
                        className="flex items-center justify-between p-2 mb-2 border rounded shadow-sm"
                      >
                        <span>{option.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                        >
                          ✖
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="Enter option"
                      className="flex-1"
                    />
                    <Button onClick={handleAddOption}>OK</Button>
                    <Button
                      onClick={() => setIsAdding(false)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsAdding(true)}>Add Option</Button>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddSymptom}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {data?.length == undefined && (
        <>
          <Loader />
        </>
      )}
      {data &&
        data.map((d, idx) => (
          <Accordion key={d.id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 text-xl font-medium">
                <SymptomHeader sname={d.name} id={d.id} fetch={fetchAll}/>
              </AccordionTrigger>
              <AccordionContent className="px-4 ">
                {/* <h1 className="text-base mb-2">Options</h1> */}
                {d.symtom_options.map((s, idx) => (
                  <OptionTab s={s} idx={idx} key={s.id} fetch={fetchAll} />
                ))}
                <AddOptionBtn id={d.id} fetch={fetchAll} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}
