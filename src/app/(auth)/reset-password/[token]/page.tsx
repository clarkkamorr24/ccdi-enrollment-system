import AuthPasswordForm from "@/components/auth-password-form";
import H1 from "@/components/h1";
import { verifyToken } from "@/lib/server-utils";
import React from "react";

export default async function Page({ params }: { params: { token: string } }) {
  const user = await verifyToken(params.token);

  return (
    <main className="w-full max-w-sm mx-auto mt-5 px-2">
      <H1 className="uppercase text-center font-semibold text-2xl">
        Reset Password
      </H1>
      <AuthPasswordForm type="reset" id={user[0].id} />
    </main>
  );
}
