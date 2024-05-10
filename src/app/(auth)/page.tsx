import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p className="text-ccd-blue text-4xl mt-10 text-center">
        Welcome{" "}
        <span className="text-ccdi-red font-semibold">{`CCDIAN's`}</span>
      </p>
      <div className="flex w-full justify-between mt-10 gap-x-10 px-5">
        <Link href="/register" className="w-full">
          <Button className="w-full">Create Account</Button>
        </Link>
        <Link href="/login" className="w-full">
          <Button className="w-full">Sign In</Button>
        </Link>
      </div>
    </>
  );
}
