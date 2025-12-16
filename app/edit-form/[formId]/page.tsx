"use client";

import FormUI from "@/components/FormUI";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";

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

  const getFormData = async () => {
    try {
      const { data } = await axios.get(`/api/forms/${formId}`);

      const parsedForm =
        typeof data.form?.jsonform === "string"
          ? JSON.parse(data.form.jsonform)
          : data.form?.jsonform;

      setJsonForm(parsedForm);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch form", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && formId) {
      getFormData();
    }
  }, [user, formId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 p-4 gap-5 min-h-screen max-w-7xl mx-auto">
      <div className="md:col-span-1 p-4 shadow-sm border border-zinc-300 h-full rounded-md">
        Controller
      </div>

      <div className="md:col-span-2 p-4 shadow-sm border border-zinc-300 h-full rounded-md">
        <FormUI jsonForm={jsonForm} />
      </div>
    </div>
  );
};

export default EditForm;
