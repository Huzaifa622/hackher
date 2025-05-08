"use client";
import { api } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export async function addSurveyQuestion({
  data,
}: {
  data: {
    survey: string;
    question_type: string;
    question_text: string;
    choice_selection_limit: string;
  };
}) {
  try {
    const res = await api.post(`/superadmin/v1/survey/survay_question/`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export async function getSurveyQuestion({ cat }: { cat: string }) {
  try {
    const res = await api.get(
      `/superadmin/v1/survey/get_all_question_choice?id=${cat}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export async function getQCat() {
  try {
    const res = await api.get(`/superadmin/v1/survey/get_survay`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export async function getSurveyType(cat:string) {
  try {
    const res = await api.get(
      `/superadmin/v1/survey/get_survey_type?id=${cat}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    if (res.data.status == true) {
      return res.data;
    }
    if (res.data.status == false) {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}
