"use client";

import React, { useState } from "react";
import FieldWrapper from "./FieldWrapper";
import DeleteModal from "./DeleteModal";

type Option = {
    label: string;
    value: string;
};

type FormField = {
    fieldType: string;
    fieldLabel: string;
    placeholder?: string;
    options?: Option[];
};

type JsonForm = {
    formTitle?: string;
    formSubheading?: string;
    formFields?: FormField[];
};

type FormUIProps = {
    jsonForm: JsonForm;
    onUpdate?: (value: { label: string; placeholder?: string }, index: number) => void;
    onDelete?: (index: number) => void;
    showDelete?: boolean;
    setShowDelete?: React.Dispatch<React.SetStateAction<boolean>>;
    theme: string;
    editable?: boolean;
};

const FormUI = ({
    jsonForm,
    onUpdate,
    onDelete,
    showDelete,
    setShowDelete,
    theme = "light",
    editable = true,
}: FormUIProps) => {

    const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);
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
                <div className="mt-4 space-y-4">
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
                            {/* FIELD RENDERING ONLY */}
                            {/* {field.fieldType === "select" && (
                                <>
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <select className="w-full border border-zinc-300 rounded-md py-2">
                                        {field.options?.map((option: Option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )} */}

                            {/* Example for Select */}
                            {getNormalizedType(field.fieldType) === "select" && (
                                <div className="px-2 pb-2 rounded-md border-zinc-400">
                                    <label className="text-sm text-zinc-600 block mb-1">{field.fieldLabel}</label>
                                    <select className="w-full border border-zinc-300 rounded-md py-2">
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
                                                        name={field.fieldLabel} // Using Label as name to group them
                                                        value={option.value}
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
                                                    <input type="checkbox" value={option.value} />
                                                    {option.label}
                                                </label>
                                            ))
                                        ) : (
                                            /* Fallback to a single checkbox if no options array exists */
                                            <label className="flex items-center gap-2 text-sm text-zinc-600">
                                                <input type="checkbox" />
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
                                            placeholder={field.placeholder}
                                            className="border p-1.5 border-zinc-300 w-full rounded-md"
                                        />
                                    </div>
                                )}
                        </FieldWrapper>
                    ))}
                </div>
            </div>

            {/* DELETE CONFIRMATION */}
            {showDelete && (
                <DeleteModal
                    onDelete={() => {
                        onDelete(activeField!.index);
                        setActiveField(null);
                    }}
                    //   onCancel={() => setActiveField(null)}
                    setShowDelete={setShowDelete}
                />
            )}
        </div>
    );
};

export default FormUI;
