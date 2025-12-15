"use client";

import { ArrowUp, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type ChildProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AiInputModal = ({ setIsFormOpen }: ChildProps) => {
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user  } = useUser();
    const router = useRouter();

    const generateAiForm = async () => {
        if (!userInput.trim()) return console.log('Please provide a valid input');

        if(!user?.id) return console.log('Please login first');
        setLoading(true);

        try {
            const { data } = await axios.post("/api/forms", {
                input: userInput,
            });

            if (data?.id) {
                router.push(`/edit-form/${data.id}`);
            }
        } catch (error) {
            console.error("AI form generation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full bg-black/30 flex justify-center items-center absolute top-0">
            <div className="bg-white rounded-lg p-4 min-w-xl border relative border-zinc-400 shadow-sm">
                <div className="flex justify-between">
                    <h2 className="text-lg text-zinc-700 font-semibold mb-4">
                        Type your input to generate the form with AI
                    </h2>
                    <X
                        className="cursor-pointer"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                    />
                </div>

                <div className="relative">
                    <textarea
                        placeholder="Create a job application form"
                        className="text-sm h-32 min-h-20 w-full p-2 outline-blue-600/40 text-zinc-600 rounded-md border border-zinc-500"
                        onChange={(e) => setUserInput(e.target.value)}
                    />

                    <button
                        className="absolute bottom-3 right-2 p-2 bg-zinc-800 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={generateAiForm}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <ArrowUp />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiInputModal;
