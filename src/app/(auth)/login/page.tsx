import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="w-full max-w-sm mx-auto mt-5 px-2">
      <H1 className="uppercase text-center font-semibold text-xl">
        Login form
      </H1>
      <AuthForm type="login" />
      <p className="mt-4 text-center text-sm">
        No account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-ccdi-blue underline"
        >
          Register
        </Link>
      </p>
    </main>
  );
}
