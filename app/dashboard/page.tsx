"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { Plus } from "lucide-react";
import AiInputModal from "@/components/AiInputModal";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CardsShimmer from "@/components/CardsShimmer";
import Image from "next/image";

type Form = {
  id: string;
  jsonForm: Record<string, unknown>;
};

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleOpenform = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserForms = async () => {
      if (!isLoaded || !user?.id) return;

      try {
        setLoading(true);
        const { data } = await axios.get("/api/forms");
        setForms(data?.forms ?? []);
      } catch (error) {
        console.error("Forms fetching error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserForms();
  }, [isLoaded, user]);

  return (
    <DashboardLayout>
      <div className="w-full p-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-zinc-800 font-semibold text-2xl">My Forms</h1>

          <button
            className="flex gap-1 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
            onClick={handleOpenform}
          >
            <Plus />
            Create New
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
            {[0, 1, 2, 3].map((item) => (
              <CardsShimmer key={item} />
            ))}
          </div>
        )}

        {/* FORMS GRID */}
        {!loading && forms.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 w-full">
            {forms.map((form) => {
              const jsonForm = form.jsonForm as {
                formTitle?: string;
                formSubheading?: string;
              };

              return (
                <div
                  key={form.id}
                  className="p-4 rounded-lg border border-zinc-200 min-h-36 cursor-pointer hover:-translate-y-1 transition-transform duration-500"
                  onClick={() => router.push(`/edit-form/${form.id}`)}
                >
                  <h2 className="font-semibold text-lg text-zinc-700">
                    {jsonForm.formTitle ?? "Untitled Form"}
                  </h2>

                  <h3 className="font-normal text-base text-zinc-600 leading-[1.1] mt-1.5">
                    {jsonForm.formSubheading?.slice(0, 100) ?? ""}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && forms.length === 0 && (
          <div className="w-full flex justify-center mt-32 items-center flex-col">
            <Image
              src="/magician.png"
              alt="No forms"
              width={400}
              height={200}
            />
            <p className="text-zinc-600 text-sm mt-3">
              Looks like you haven't created any forms yet
            </p>
            <button
              className="px-6 py-1.5 border border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 transition-colors hover:text-white mt-4"
              onClick={() => setIsFormOpen(true)}
            >
              Create Now
            </button>
          </div>
        )}
      </div>

      {isFormOpen && <AiInputModal setIsFormOpen={setIsFormOpen} />}
    </DashboardLayout>
  );
};

export default Dashboard;
