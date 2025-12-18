"use client"

import { Edit, Trash } from 'lucide-react';
import React from 'react'

const EditFormFields = ({ setEditValues, editValues, editingFieldIndex, setEditingFieldIndex, field, jsonForm, i, onUpdate, onDelete }) => {

    return (
        < div className="relative" >
            <div className='flex gap-1 items-end'>
                <Edit
                    className="cursor-pointer text-zinc-600 hover:text-zinc-700 transition-colors"
                    size={20}
                    onClick={() => {
                        setEditingFieldIndex(i);
                        setEditValues({
                            label: field.fieldLabel,
                            placeholder: field.placeholder || '',
                        });
                    }}
                />

                <Trash
                    className="cursor-pointer text-red-400 hover:text-red-500 transition-colors"
                    size={20}
                    onClick={() => onDelete(i)}
                />
            </div>

            {/* EDIT POPOVER */}
            {
                editingFieldIndex === i && (
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
                                    onClick={() => setEditingFieldIndex(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="text-xs px-2 py-1 bg-black text-white rounded"
                                    onClick={() => {
                                        // jsonForm.formFields[i].fieldLabel = editValues?.label;
                                        // jsonForm.formFields[i].placeholder = editValues?.placeholder;
                                        onUpdate({ label: editValues?.label, placeholder: editValues?.placeholder }, i)
                                        setEditingFieldIndex(null);
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default EditFormFields