"use client";

import { TResetPasswordValues } from "@/lib/validation";
import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type TAuthContext = {
  handleResetPassword: (data: TResetPasswordValues) => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  //states

  const handleResetPassword = async (data: TResetPasswordValues) => {
    console.log("data", data);
  };

  return (
    <AuthContext.Provider
      value={{
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
