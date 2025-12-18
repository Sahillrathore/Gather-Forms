"use client";

import { useState } from "react";

type ToastType = "success" | "error" | "info";

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "info"
  ) => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  return {
    toast,
    showToast,
    hideToast,
  };
}
