import React from 'react'

type Option = {
    label: string;
    value: string;
}

const FormUI = ({ jsonForm }) => {

    console.log(jsonForm)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full shadow-md p-3 border border-zinc-200 rounded-lg'>
                <h2 className='text-xl text-zinc-700 font-semibold'>{jsonForm?.formTitle}</h2>
                <h2 className='font-lg text-zinc-600'>{jsonForm?.formSubheading}</h2>

                <div>
                    {
                        jsonForm?.formFields?.map((field, i) => (
                            <div key={i} className='mt-4'>
                                {
                                    field.fieldType === 'select' ?
                                        <div>
                                            <label className='text-sm text-zinc-600 block mb-1'>{field.fieldLabel}</label>
                                            <select className='w-full border border-zinc-300 rounded-md py-2'>
                                                {
                                                    field?.options?.map((option: Option) => (
                                                        <option key={option.label} value={option.value} className='capitalize'>{option.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        : field.fieldType === 'radio' ?

                                            <div>
                                                <label className='text-sm text-zinc-600 block mb-1'>{field.fieldLabel}</label>
                                                <div className='flex gap-4 flex-wrap'>
                                                    {
                                                        field?.options?.map((option: Option) => (
                                                            <div className='flex items-center gap-2'>
                                                                <input type={field.fieldType} name={field.fieldLabel} />
                                                                <label className='text-sm text-zinc-600 block mb-1'>{option?.label}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>


                                            : field.fieldType === 'checkbox' ?

                                                <div>
                                                    <label className='text-sm text-zinc-600 block mb-1'>{field.fieldLabel}</label>
                                                    <div className='flex gap-4 flex-wrap'>
                                                        {
                                                            field.options ? field?.options?.map((option: Option) => (
                                                                <div className='flex items-center gap-2'>
                                                                    <input type={field.fieldType} name={field.fieldLabel} />
                                                                    <label className='text-sm text-zinc-600 block mb-1'>{option?.label}</label>
                                                                </div>
                                                            ))
                                                                :
                                                                <div className='flex items-center gap-2'>
                                                                    <input type={field.fieldType} name={field.fieldLabel} />
                                                                    <label className='text-sm text-zinc-600 block mb-1'>{field?.fieldLabel}</label>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>

                                                : field.fieldType === 'textarea' ?

                                                    <div>
                                                        <label className='text-sm text-zinc-600 block mb-1'>{field.fieldLabel}</label>
                                                        <div className='flex gap-4 flex-wrap'>
                                                            {
                                                                <div className='flex items-center gap-2 w-full'>
                                                                    <textarea name={field.fieldLabel} className='w-full border border-zinc-300 rounded-md min-h-20 text-sm p-1' />
                                                                    {/* <label className='text-sm text-zinc-600 block mb-1'>{field?.fieldLabel}</label> */}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    :

                                                    <div>
                                                        <label className='text-sm text-zinc-600 block mb-1'>{field.fieldLabel}</label>
                                                        <input type={field?.fieldType} placeholder={field?.placeholder} className='border p-1.5 border-zinc-300 w-full rounded-md' />
                                                    </div>

                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FormUI