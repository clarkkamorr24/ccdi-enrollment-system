import Logo from "@/components/logo";
import React from "react";

export default function Page() {
  return (
    <div className=" col-span-full col-start-2 p-4">
      <main className="flex flex-col justify-center items-center mt-20">
        <Logo />
        <p className="mt-5 font-semibold text-5xl text-center text-ccdi-blue">
          Computer Communication Development Institute
        </p>
        <p className="mt-5 font-semibold text-3xl text-center text-ccdi-red italic font-serif">
          Young Man think Big! Aspire, succeed..
        </p>
      </main>
    </div>
  );
}
