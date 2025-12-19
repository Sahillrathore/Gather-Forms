"use client";

import React from "react";
import EditFormFields from "./EditFormFields";

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

type ActiveField = {
  index: number;
  action: "edit" | "delete";
} | null;

type EditValues = {
  label: string;
  placeholder: string;
};

type FieldWrapperProps = {
  index: number;
  field: FormField;
  children: React.ReactNode;

  editValues: EditValues;
  setEditValues: React.Dispatch<React.SetStateAction<EditValues>>;

  activeField: ActiveField;
  setActiveField: React.Dispatch<React.SetStateAction<ActiveField>>;

  onUpdate: (value: { label: string; placeholder?: string }, index: number) => void;
  onDelete: (index: number) => void;

  setEditingFieldIndex: React.Dispatch<React.SetStateAction<number | null>>;
  editingFieldIndex: number | null;

  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FieldWrapper({
  index,
  field,
  children,
  editValues,
  setEditValues,
  activeField,
  setActiveField,
  onUpdate,
  onDelete,
  setEditingFieldIndex,
  editingFieldIndex,
  setShowDelete,
}: FieldWrapperProps) {
  return (
    <div className="flex gap-3 items-start relative">
      <div className="w-full">{children}</div>

      <EditFormFields
        i={index}
        field={field}
        editValues={editValues}
        setEditValues={setEditValues}
        activeField={activeField}
        setActiveField={setActiveField}
        onUpdate={onUpdate}
        onDelete={onDelete}
        setEditingFieldIndex={setEditingFieldIndex}
        // editingFieldIndex={editingFieldIndex}
        setShowDelete={setShowDelete}
      />
    </div>
  );
}
