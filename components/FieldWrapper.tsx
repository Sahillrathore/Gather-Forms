"use client";

import EditFormFields from "./EditFormFields";

type FieldWrapperProps = {
  index: number;
  field: any;
  children: React.ReactNode;

  // edit state
  editValues: any;
  setEditValues: any;
  activeField: any;
  setActiveField: any;

  onUpdate: Function;
  onDelete: Function;
  setEditingFieldIndex: Function;
  editingFieldIndex: Function;
  setShowDelete: Function;
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
        editingFieldIndex={editingFieldIndex}
        setShowDelete={setShowDelete}
      />
    </div>
  );
}
