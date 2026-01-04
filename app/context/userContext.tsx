// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name: string | null;
  email: string;
  plan: "free" | "monthly" | "annual" | "lifetime";
  planActivatedAt: string | null;
};

type UserContextType = {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    const res = await fetch("/api/user/me");
    if (res.ok) {
      setUser(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
};
