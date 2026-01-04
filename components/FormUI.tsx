"use client";

import React, { useEffect, useState } from "react";
import FieldWrapper from "./FieldWrapper";
import DeleteModal from "./DeleteModal";
import { db } from "@/configs/db";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";
import { LoaderCircle } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type FormField = {
    fieldType: string;
    fieldLabel: string;
    fieldName: string
    placeholder?: string;
    options?: Option[];
    required: boolean
};

type JsonForm = {
    formTitle?: string;
    formSubheading?: string;
    formFields?: FormField[];
};

type record = {
    id: string;
    jsonform: JsonForm;
    theme?: string;
    style?: string;
    background: string
    createdBy?: string;
    createdAt?: string;
};

type FormUIProps = {
    jsonForm: JsonForm;
    record: record;
    onUpdate?: (value: { label: string; placeholder?: string }, index: number) => void;
    onDelete?: (index: number) => void;
    showDelete?: boolean;
    setShowDelete?: React.Dispatch<React.SetStateAction<boolean>>;
    theme: string;
    editable?: boolean;
};

const FormUI = ({
    jsonForm,
    record,
    onUpdate,
    onDelete,
    showDelete,
    setShowDelete,
    theme = "light",
    editable = true,
}: FormUIProps) => {

    const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({});
    const { toast, showToast, hideToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [editValues, setEditValues] = useState({
        label: "",
        placeholder: "",
    });

    const [activeField, setActiveField] = useState<{
        index: number;
        action: "edit" | "delete";
    } | null>(null);

    const getNormalizedType = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes("select")) return "select";
        if (t.includes("radio")) return "radio";
        if (t.includes("checkbox")) return "checkbox";
        return t;
    };

    useEffect(() => {
        if (!jsonForm?.formFields) return;

        const initialState = jsonForm.formFields.reduce((acc, field) => {
            acc[field.fieldName] = ""; // default empty value
            return acc;
        }, {} as Record<string, any>);

        setFormData(initialState);
    }, [jsonForm]);


    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSelectChange = (e, name) => {
        const { value, checked, type } = e.target;

        setFormData(prev => {
            if (type === "checkbox") {
                const prevArr = Array.isArray(prev[name]) ? prev[name] : [];
                return {
                    ...prev,
                    [name]: checked
                        ? [...prevArr, value]
                        : prevArr.filter(v => v !== value),
                };
            }

            return { ...prev, [name]: value };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formId = record.id;
        if(!formId) return;
        try {
            setLoading(true);
            const res = await axios.post(`/api/form-response`, { formId, formResponse: JSON.stringify(formData), createdBy: record?.createdBy });
            console.log(res)
            if (res?.status === 200) {
                showToast("Form submitted successfully", "success");
                e.target.reset();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="w-full flex justify-center rounded-lg" data-theme={theme}>
            <div className="w-full shadow-md p-4 border border-zinc-200 rounded-lg">
                {/* Form Header */}
                <h2 className="text-2xl text-zinc-700 font-semibold mb-2">
                    {jsonForm?.formTitle}
                </h2>
                <p className="text-lg text-zinc-600 mb-8 border-b border-zinc-300 pb-2">
                    {jsonForm?.formSubheading}
                </p>

                {/* Fields */}
                <form className="mt-4 space-y-4" onSubmit={handleFormSubmit}>
                    {jsonForm?.formFields?.map((field, i) => (
                        <FieldWrapper
                            key={`${field.fieldType}-${i}`}
                            index={i}
                            field={field}
                            editValues={editValues}
                            setEditValues={setEditValues}
                            activeField={activeField}
                            setActiveField={setActiveField}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            setEditingFieldIndex={setEditingFieldIndex}
                            editingFieldIndex={editingFieldIndex}
                            setShowDelete={setShowDelete}
                            editable={editable}
                        >

                            {/*  for Select */}
                            {getNormalizedType(field.fieldType) === "select" && (
                                <div className="px-2 pb-2 rounded-md border-zinc-400">
                                    <label className="text-sm text-zinc-600 block mb-1">{field.fieldLabel}</label>
                                    <select className="w-full border border-zinc-300 rounded-md py-2" required={field?.required} onChange={(e) => handleSelectChange(e, field.fieldName)}>
                                        {/* Fallback to empty array and provide a default option */}
                                        {(field.options || []).length > 0 ? (
                                            field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))
                                        ) : (
                                            <option value="">No options generated</option>
                                        )}
                                    </select>
                                </div>
                            )}

                            {/* RADIO FIELD */}
                            {getNormalizedType(field.fieldType) === "radio" && (
                                <div className="px-2 pb-2 rounded-md border-zinc-400">
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <div className="flex gap-4 flex-wrap">
                                        {field.options && field.options.length > 0 ? (
                                            field.options.map((option: Option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-zinc-600"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={field.fieldName} // Using Label as name to group them
                                                        value={option.value}
                                                        required={field?.required}
                                                        onChange={(e) => handleSelectChange(e, field.fieldName)}
                                                    />
                                                    {option.label}
                                                </label>
                                            ))
                                        ) : (
                                            <span className="text-xs text-amber-600 italic">No options provided by AI</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CHECKBOX FIELD */}
                            {getNormalizedType(field.fieldType) === "checkbox" && (
                                <div className="px-2 pb-2 rounded-md border-zinc-400">
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <div className="flex gap-4 flex-wrap">
                                        {field.options && field.options.length > 0 ? (
                                            field.options.map((option: Option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-zinc-600"
                                                >
                                                    <input type="checkbox" value={option.value} onChange={(e) => handleSelectChange(e, field?.fieldName)} />
                                                    {option.label}
                                                </label>
                                            ))
                                        ) : (
                                            /* Fallback to a single checkbox if no options array exists */
                                            <label className="flex items-center gap-2 text-sm text-zinc-600">
                                                <input type="checkbox" onChange={(e) => handleSelectChange(e, field?.fieldName)} />
                                                {field.fieldLabel} (Check to confirm)
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            {field.fieldType === "textarea" && (
                                <div className="px-2 pb-2 rounded-md border-zinc-400">
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <textarea
                                        placeholder={field.placeholder}
                                        className="w-full border border-zinc-300 rounded-md min-h-20 p-2 text-sm"
                                        name={field?.fieldName}
                                        required={field?.required}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            )}

                            {!["select", "radio", "checkbox", "textarea"].includes(
                                field.fieldType
                            ) && (
                                    <div className="px-2 pb-2 rounded-md border-zinc-400">
                                        <label className="text-sm text-zinc-600 block mb-1">
                                            {field.fieldLabel}
                                        </label>
                                        <input
                                            type={field.fieldType}
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder={field.placeholder}
                                            name={field.fieldName}
                                            required={field?.required}
                                            className="border p-1.5 border-zinc-300 w-full rounded-md"
                                        />
                                    </div>
                                )}
                        </FieldWrapper>
                    ))}

                    { !editable && <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Submit'}
                    </button>}
                </form>
            </div>

            {/* DELETE CONFIRMATION */}
            {showDelete && (
                <DeleteModal
                    title="Delete Form Field?"
                    description={`Are you sure you want to permanently delete the field ${jsonForm?.formFields[activeField.index]?.fieldLabel} ?`}
                    onDelete={onDelete}
                    activeFieldIndex={activeField!.index}
                    //   onCancel={() => setActiveField(null)}
                    setShowDelete={setShowDelete}
                />
            )}

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

export default FormUI;
