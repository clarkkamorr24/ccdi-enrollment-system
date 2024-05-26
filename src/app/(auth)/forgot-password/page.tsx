import AuthPasswordForm from "@/components/auth-password-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="w-full max-w-sm mx-auto mt-5 px-2">
      <H1 className="uppercase text-center font-semibold text-2xl">
        Forget Password
      </H1>
      <AuthPasswordForm type="forgot" />
      <p className="mt-4 text-center text-sm">
        Back to{" "}
        <Link href="/login" className="font-semibold text-ccdi-blue underline">
          Login
        </Link>
      </p>
    </main>
  );
}
