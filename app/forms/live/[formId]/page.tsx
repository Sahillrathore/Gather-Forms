"use client"
import FormUI from '@/components/FormUI';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'

const page = ({ params }: { params: Promise<{ formId: number }> }) => {

    const { user } = useUser();
    const { formId } = use(params);
    const [loading, setLoading] = useState(true);
    const { toast, showToast, hideToast } = useToast();
    const [jsonForm, setJsonForm] = useState<any>(null);

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

    useEffect(() => {
        if (user && formId) {
            getFormData();
        }
    }, [user, formId]);

    if (loading) {
        return <div className="p-4 w-full min-h-screen bg-white flex items-center justify-center"><Loader className="animate-spin" /></div>;
    }

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center' style={{ backgroundImage: gradientBackground }}>
            <div className='w-160 p-4 mx-auto'>

                <FormUI
                    jsonForm={jsonForm?.jsonform}
                    theme={theme}
                    record={jsonForm}
                    editable={false}
                />

            </div>

            <Link href={process.env.NEXT_PUBLIC_SITE || '/'} className=' fixed bottom-5 left-5 flex items-center text-white text-sm bg-gray-800 rounded-full px-1 pr-3 py-1.5 gap-1.5'>
                <div className='p-0.5 px-1 bg-white rounded-full'>
                    <Image src="/logoG.png" width={15} height={15} alt='logo..' className='rounded-full' />
                </div>
                <p className='text-xs'>Created with Gather</p>
                {/* <p>Create you own AI Form</p> */}
            </Link>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </div>
    )
}

export default page