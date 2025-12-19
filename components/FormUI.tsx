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
    onUpdate: (value: { label: string; placeholder?: string }, index: number) => void;
    onDelete: (index: number) => void;
    showDelete: boolean;
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
    theme: string;
};

const FormUI = ({
    jsonForm,
    onUpdate,
    onDelete,
    showDelete,
    setShowDelete,
    theme,
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

    return (
        <div className="w-full flex justify-center rounded-lg" data-theme={theme}>
            <div className="w-full shadow-md p-4 border border-zinc-200 rounded-lg">
                {/* Form Header */}
                <h2 className="text-xl text-zinc-700 font-semibold">
                    {jsonForm?.formTitle}
                </h2>
                <p className="text-zinc-600">
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
                        >
                            {/* FIELD RENDERING ONLY */}
                            {field.fieldType === "select" && (
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
                            )}

                            {field.fieldType === "radio" && (
                                <>
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <div className="flex gap-4 flex-wrap">
                                        {field.options?.map((option: Option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-sm text-zinc-600"
                                            >
                                                <input
                                                    type="radio"
                                                    name={field.fieldLabel}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}

                            {field.fieldType === "checkbox" && (
                                <>
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <div className="flex gap-4 flex-wrap">
                                        {field.options?.length
                                            ? field.options.map((option: Option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-zinc-600"
                                                >
                                                    <input type="checkbox" />
                                                    {option.label}
                                                </label>
                                            ))
                                            : (
                                                <label className="flex items-center gap-2 text-sm text-zinc-600">
                                                    <input type="checkbox" />
                                                    {field.fieldLabel}
                                                </label>
                                            )}
                                    </div>
                                </>
                            )}

                            {field.fieldType === "textarea" && (
                                <>
                                    <label className="text-sm text-zinc-600 block mb-1">
                                        {field.fieldLabel}
                                    </label>
                                    <textarea
                                        placeholder={field.placeholder}
                                        className="w-full border border-zinc-300 rounded-md min-h-20 p-2 text-sm"
                                    />
                                </>
                            )}

                            {!["select", "radio", "checkbox", "textarea"].includes(
                                field.fieldType
                            ) && (
                                    <>
                                        <label className="text-sm text-zinc-600 block mb-1">
                                            {field.fieldLabel}
                                        </label>
                                        <input
                                            type={field.fieldType}
                                            placeholder={field.placeholder}
                                            className="border p-1.5 border-zinc-300 w-full rounded-md"
                                        />
                                    </>
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
