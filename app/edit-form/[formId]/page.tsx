"use client";

import FormUI from "@/components/FormUI";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import FormThemeController from "@/components/FormThemeController";

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
  const { toast, showToast, hideToast } = useToast();
  const [showDelete, setShowDelete] = useState(false);

  //theme
  const [theme, setTheme] = useState('light');
  const [gradientBackground, setGradientBackground] = useState('');

  const getFormData = async () => {
    try {
      const { data } = await axios.get(`/api/forms/${formId}`);

      const parsedForm =
        typeof data.form?.jsonform === "string"
          ? JSON.parse(data.form.jsonform)
          : data.form?.jsonform;

      setJsonForm({ ...data?.form, jsonform: parsedForm });
      setTheme(data?.form?.theme);
      setGradientBackground(data?.form?.background);
      
      console.log({ ...data?.form, jsonform: parsedForm })
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch form", error);
    } finally {
      setLoading(false);
    }
  };

  const formFieldUpdate = async (value: {}, i: number) => {

    jsonForm.jsonform.formFields[i].fieldLabel = value.label;
    jsonForm.jsonform.formFields[i].placeholder = value.placeholder;
    try {
      const res = await axios.patch(`/api/forms/${formId}`, {
        action: 'updateField',
        data: jsonForm?.jsonform,
      });
      console.log(res);
      showToast("Form field updated successfully", "success");
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
      showToast("Form field deleted successfully", "success");
      console.log(res)
      setShowDelete(false)
    } catch (error) {
      console.error(error);
      showToast("Error deleting form field", "error");
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
        <FormThemeController setTheme={setTheme} theme={theme} gradientBackground={gradientBackground} setGradientBackground={setGradientBackground} formId={formId} />
      </div>

      <div className="md:col-span-2 p-4 shadow-sm border border-zinc-300 h-full rounded-md" style={{ backgroundImage: gradientBackground }}>
        <FormUI jsonForm={jsonForm?.jsonform} onUpdate={formFieldUpdate} onDelete={formFieldDelete} showDelete={showDelete} setShowDelete={setShowDelete} theme={theme} />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

    </div>
  );
};

export default EditForm;
