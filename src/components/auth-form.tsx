"use client";

import { useFormState } from "react-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { logIn, register } from "@/actions/action";
import AuthFormBtn from "./auth-from-btn";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [registerError, dispatchRegister] = useFormState(register, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  const [isOpen, setIsOpen] = useState(false);

  console.log("type", type);
  return (
    <form
      action={type === "register" ? dispatchRegister : dispatchLogIn}
      className="text-sm"
    >
      {logInError && (
        <p className="text-center font-semibold text-red-500">
          {" "}
          {logInError.message}
        </p>
      )}

      {registerError && (
        <p className="text-center font-semibold text-red-500">
          {" "}
          {registerError.message}
        </p>
      )}
      {type === "register" && (
        <>
          <div className="mt-5 space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              required
              maxLength={50}
            />
          </div>
          <div className="mt-2 space-y-1">
            <Label htmlFor="middleName">Middle Name (optional)</Label>
            <Input id="middleName" type="text" name="middleName" />
          </div>
          <div className="mt-2 space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              required
              maxLength={100}
            />
          </div>
        </>
      )}

      <div className="mt-2 space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required maxLength={100} />
      </div>

      <div className="relative mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={isOpen ? "text" : "password"}
          name="password"
          required
          minLength={5}
          maxLength={100}
        />
        <span onClick={() => setIsOpen(!isOpen)}>
          {isOpen && (
            <EyeOpenIcon className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer" />
          )}
          {!isOpen && (
            <EyeClosedIcon className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer" />
          )}
        </span>
      </div>

      {type === "login" && (
        <Link
          href="/forgot-password"
          className="float-right mt-4 cursor-pointer text-ccdi-blue"
        >
          Forgot your password?
        </Link>
      )}
      <AuthFormBtn type={type} />
    </form>
  );
}
