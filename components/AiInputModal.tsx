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
    const { user } = useUser();
    const router = useRouter();

    const generateAiForm = async () => {
        if (!userInput.trim()) return console.log('Please provide a valid input');

        if (!user?.id) return console.log('Please login first');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-card text-card-foreground border border-border shadow-2xl rounded-xl w-full max-w-lg relative overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Generate with AI
                    </h2>
                    <button
                        onClick={() => setIsFormOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Prompt
                        </label>
                        <div className="relative">
                            <textarea
                                placeholder="Describe the form you want to create (e.g., 'A registration form for a hackathon with fields for team name, skills, and dietary restrictions')..."
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                autoFocus
                            />

                            <div className="absolute bottom-3 right-3">
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 shadow-sm"
                                    onClick={generateAiForm}
                                    disabled={loading || !userInput.trim()}
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ArrowUp className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <p className="text-[0.8rem] text-muted-foreground">
                            Our AI will generate a complete form structure based on your description.
                        </p>
                    </div>
                </div>
            </div>

            {/* Click outside to close area */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsFormOpen(false)} />
        </div>
    );
};

export default AiInputModal;
