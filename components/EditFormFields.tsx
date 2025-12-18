"use client";

import { Edit, Trash } from "lucide-react";

const EditFormFields = ({
  setEditValues,
  editValues,
  activeField,
  setActiveField,
  field,
  i,
  onUpdate,
  onDelete,
  setShowDelete,
  setEditingFieldIndex,
}) => {
  const isEditing =
    activeField?.index === i && activeField.action === "edit";

  return (
    <div className="relative">
      <div className="flex gap-1 items-end">
        <Edit
          size={20}
          className="cursor-pointer text-zinc-600 hover:text-zinc-700"
          onClick={() => {
            setActiveField({ index: i, action: "edit" });
            setEditValues({
              label: field.fieldLabel,
              placeholder: field.placeholder || "",
            });
          }}
        />

        <Trash
          size={20}
          className="cursor-pointer text-red-400 hover:text-red-500"
          onClick={() => {
            setActiveField({ index: i, action: "delete" });
            setEditingFieldIndex(i)
            setShowDelete(true); // or open delete confirmation
          }}
        />
      </div>

      {/* EDIT POPOVER */}
      {isEditing && (
        <div className="absolute right-0 top-8 w-64 bg-white border rounded-md shadow-lg p-3 z-20">
          <div className="space-y-2">
            <div>
              <label className="text-xs text-zinc-500">Label</label>
              <input
                className="w-full border rounded p-1 text-sm"
                value={editValues.label}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500">Placeholder</label>
              <input
                className="w-full border rounded p-1 text-sm"
                value={editValues.placeholder}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    placeholder: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                className="text-xs px-2 py-1 border rounded"
                onClick={() => setActiveField(null)}
              >
                Cancel
              </button>
              <button
                className="text-xs px-2 py-1 bg-black text-white rounded"
                onClick={() => {
                  onUpdate(
                    {
                      label: editValues.label,
                      placeholder: editValues.placeholder,
                    },
                    i
                  );
                  setActiveField(null);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFormFields;
