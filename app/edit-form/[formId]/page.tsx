"use client"
import FormUI from '@/components/FormUI'
import { db } from '@/configs/db'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'

const EditForm = ({ params }: { params: Promise<{ formId: number }> }) => {

  const { user } = useUser();
  const { formId } = use(params);
  const [jsonForm, setJsonForm] = useState();

  const getFormData = async () => {
    const data = await db.select().from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formId), // Use the unwrapped formId
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
      )
    setJsonForm(JSON.parse(data[0]?.jsonform));
  }

  useEffect(() => {
    if (user) {
      getFormData();
    }
  }, [user, formId])

  return (
    <div className='grid grid-cols-3 p-4 gap-3 min-h-screen'>
      <div className='md:col-span- p-4 shadow-sm border border-zinc-400/80 h-full rounded-md'>
        Controller
      </div>

      <div className='md:col-span-2 p-4 shadow-sm border border-zinc-400/80 h-full rounded-md'>
        <FormUI jsonForm={jsonForm} />
      </div>
    </div>
  )
}

export default EditForm
