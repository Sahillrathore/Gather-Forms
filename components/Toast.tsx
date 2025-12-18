"use client";

import { useToast } from "@/hooks/useToast";
import { Check, Cross, CrossIcon, LucideCross, X } from "lucide-react";
import { useEffect } from "react";

type ToastType = "success" | "error" | "info";

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
};

const styles = {
  success: "bg-green-50 border-green-500 text-green-700",
  error: "bg-red-50 border-red-500 text-red-700",
  info: "bg-blue-50 border-blue-500 text-blue-700",
};

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

    const { toast, showToast, } = useToast();
  
  return (

    <div className={`flex flex-col justify-center ${toast ? 'w-0' : 'w-72' } overflow-hidden transition-transform gap-2 text-[10px] sm:text-xs fixed right-6 bottom-6 z-50`}>
      <div
        className={`succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg border-b-2 ${type === 'success' ? 'border-b-green-200' : 'border-b-red-200'} border border-zinc-100 shadow-sm bg-[#fafaff] px-[10px]`}
      >
        <div className="flex items-center gap-4">
          <div className={` ${type === 'success' ? 'text-[#2b9875] bg-green-50 border border-green-200' : 'text-red-500 bg-red-50 border border-red-200'}] backdrop-blur-xl p-1 rounded-lg`}>
            {
              type === 'success' ? <Check /> : <X size={24} />
            }
          </div>
          <div>
            <p className="text-black font-normal text-sm">{message}</p>
            {/* <p className="text-gray-500">This is the description section</p> */}
          </div>
        </div>
        <button onClick={onClose} className="mt-0.5 text-zinc-600">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
