import { useToast } from '@/hooks/useToast';
import axios from 'axios';
import { ArrowDown, ArrowDownZa, Ban, ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Toast from './Toast';

const FormThemeController = ({ theme, setTheme, setGradientBackground, gradientBackground, formId }) => {

    const themeOptions = [
        // { name: 'default' },
        { name: 'light' },
        { name: 'dark' },
        { name: 'cupcake' },
        { name: 'valentine' },
        { name: 'forest' },
        { name: 'aqua' },
        { name: 'nord' },
        { name: 'lemonade' },
        { name: 'caramellatte' },
        { name: 'abyss' },
    ]

    const gradientBackgrounds = [
        {
            name: "None",
            gradient: "linear-gradient(to right, #fff, #fff)",
            icon: <Ban color='#777' />
        },
        {
            name: "Sunrise",
            gradient: "linear-gradient(to right, #ff9933, #66b3ff)",
        },
        {
            name: "Sunset",
            gradient: "linear-gradient(to right, #ff5e3a, #f0ca4c)",
        },
        {
            name: "Ocean Blue",
            gradient: "linear-gradient(to right, #2193b0, #6dd5ed)",
        },
        {
            name: "Purple Dream",
            gradient: "linear-gradient(to right, #cc2b5e, #753a88)",
        },
        {
            name: "Mint Breeze",
            gradient: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        {
            name: "Peach Love",
            gradient: "linear-gradient(to right, #ed4264, #ffedbc)",
        },
        {
            name: "Night Sky",
            gradient: "linear-gradient(to right, #141e30, #243b55)",
        },
        {
            name: "Firewatch",
            gradient: "linear-gradient(to right, #cb2d3e, #ef473a)",
        },
        {
            name: "Aqua Marine",
            gradient: "linear-gradient(to right, #1a2980, #26d0ce)",
        },
        {
            name: "Soft Lavender",
            gradient: "linear-gradient(to right, #c471f5, #fa71cd)",
        },
        {
            name: "Forest Walk",
            gradient: "linear-gradient(to right, #134e5e, #71b280)",
        },
        {
            name: "Steel Gray",
            gradient: "linear-gradient(to right, #232526, #414345)",
        },
        {
            name: "Candy Pop",
            gradient: "linear-gradient(to right, #f953c6, #b91d73)",
        },
        {
            name: "Skyline",
            gradient: "linear-gradient(to right, #1488cc, #2b32b2)",
        },
        {
            name: "Warm Sand",
            gradient: "linear-gradient(to right, #c79081, #dfa579)",
        },
    ];

    const [showMore, setShowmore] = useState(9);
    const { toast, showToast, hideToast } = useToast();

    const formThemeAndBgUpdate = async (value: string, action: string) => {

        try {
            const res = await axios.patch(`/api/forms/${formId}`, {
                action: action,
                data: value,
            });
            console.log(res);
            showToast("Form theme updated successfully", "success");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { console.log(gradientBackground) }, [gradientBackground])

    return (
        <div className='w-full '>
            <div >
                <label htmlFor="theme">Select Theme</label>
                <select name="theme" id="theme"
                    className='block border text-sm font-semibold text-zinc-700 px-2 border-zinc-300 w-full rounded-md py-2 mt-2'
                    onChange={(e) => {
                        formThemeAndBgUpdate(e.target.value, 'updateTheme')
                        setTheme(e.target.value)
                    }}
                >
                    {
                        themeOptions?.map((theme, i) => (
                            <option
                                className='px-2 py-1.5 text-sm font-semibold' key={i} value={theme?.name}
                            >{theme?.name}</option>
                        ))
                    }
                </select>
            </div>

            {/* gradient bg */}
            <div className='mt-4'>
                <h2>Backgrounds</h2>
                <div className='p-2 grid grid-cols-3 justify-between gap-2'>
                    {
                        gradientBackgrounds?.slice(0, showMore).map((bg) => (
                            <div key={bg.name} className='w-full h-14 border flex items-center justify-center border-zinc-400 cursor-pointer rounded-lg hover:border hover:border-zinc-900 duration-500 transition-colors'
                                style={{ background: bg.gradient }}
                                onClick={() => {
                                    setGradientBackground(bg.gradient)
                                    formThemeAndBgUpdate(bg.gradient, 'updateBackground')
                                }}
                            >
                                {bg.icon && bg.icon}
                            </div>
                        ))
                    }
                </div>
                <p
                    className='text-sm pr-2 text-zinc-500 flex items-center gap-0 font-medium cursor-pointer mx-auto hover:text-zinc-700 transition-colors w-fit'
                    onClick={() => setShowmore(showMore == 9 ? gradientBackground.length : 9)}
                >{showMore == 9 ? <>Show more <ChevronDown size={18} /></> : <>Show less <ChevronUp size={18} /></>}</p>
            </div>

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

export default FormThemeController