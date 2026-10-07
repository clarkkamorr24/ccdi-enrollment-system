import Logo from "@/components/logo";
import React from "react";

export default function Page() {
  return (
    <div className="p-4 md:col-span-full md:col-start-2">
      <main className="flex flex-col items-center justify-center mt-20">
        <Logo />
        <p className="mt-5 text-5xl font-semibold text-center text-ccdi-blue">
          Computer Communication Development Institute
        </p>
        <p className="mt-5 font-serif text-3xl italic font-semibold text-center text-ccdi-red">
          Young Man think Big! Aspire, succeed..
        </p>
      </main>
    </div>
  );
}
