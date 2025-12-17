"use client";

import FormUI from "@/components/FormUI";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

type EditFormProps = {
  params: {
    formId: string;
  };
};

const EditForm = ({ params }: { params: Promise<{ formId: number }> }) => {
  const { user } = useUser();
  const { formId } = use(params);

  const [jsonForm, setJsonForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getFormData = async () => {
    try {
      const { data } = await axios.get(`/api/forms/${formId}`);

      const parsedForm =
        typeof data.form?.jsonform === "string"
          ? JSON.parse(data.form.jsonform)
          : data.form?.jsonform;

      setJsonForm(parsedForm);
      console.log(parsedForm)
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch form", error);
    } finally {
      setLoading(false);
    }
  };

  const formFieldUpdate = async (value: {}, i: number) => {
    jsonForm.formFields[i].fieldLabel = value.label;
    jsonForm.formFields[i].placeholder = value.placeholder;

    try {
      const res = await axios.patch(`/api/forms/${formId}`, jsonForm);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const formFieldDelete = async (index: number) => {
    try {
      // Optimistic UI update
      const updatedFields = jsonForm.formFields.filter(
        (_, i) => i !== index
      );

      const updatedForm = {
        ...jsonForm,
        formFields: updatedFields,
      };

      setJsonForm(updatedForm);

      const res = await axios.delete(`/api/forms/${formId}`, {
        data: { index },
      });
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && formId) {
      getFormData();
    }
  }, [user, formId]);

  if (loading) {
    return <div className="p-4 w-full min-h-screen bg-white flex items-center justify-center"><Loader className="animate-spin" /></div>;
  }

  return (
    <div className="grid grid-cols-3 p-4 gap-5 min-h-screen max-w-7xl mx-auto">
      <div className="md:col-span-1 p-4 shadow-sm border border-zinc-300 h-full rounded-md">
        Controller
      </div>

      <div className="md:col-span-2 p-4 shadow-sm border border-zinc-300 h-full rounded-md">
        <FormUI jsonForm={jsonForm} onUpdate={formFieldUpdate} onDelete={formFieldDelete} />
      </div>
    </div>
  );
};

export default EditForm;
