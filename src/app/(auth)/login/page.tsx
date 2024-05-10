import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Logo from "@/components/logo";
import React from "react";

export default function Page() {
  return (
    <main className="w-full max-w-sm mx-auto mt-5 px-2">
      <H1 className="uppercase text-center font-semibold text-2xl">
        Login form
      </H1>
      <AuthForm type="login" />
    </main>
  );
}
