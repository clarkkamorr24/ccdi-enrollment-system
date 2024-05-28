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

  return (
    <form
      action={type === "register" ? dispatchRegister : dispatchLogIn}
      className="text-sm"
    >
      {logInError && (
        <p className="text-red-500 font-semibold text-center">
          {" "}
          {logInError.message}
        </p>
      )}

      {registerError && (
        <p className="text-red-500 font-semibold text-center">
          {" "}
          {registerError.message}
        </p>
      )}
      {type === "register" && (
        <>
          <div className="space-y-1 mt-5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              required
              maxLength={50}
            />
          </div>
          <div className="space-y-1 mt-2">
            <Label htmlFor="middleName">Middle Name (optional)</Label>
            <Input id="middleName" type="text" name="middleName" />
          </div>
          <div className="space-y-1 mt-2">
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

      <div className="space-y-1 mt-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required maxLength={100} />
      </div>

      <div className="space-y-1 mt-2 relative">
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
            <EyeOpenIcon className="absolute right-3 bottom-2 h-5 w-5 cursor-pointer" />
          )}
          {!isOpen && (
            <EyeClosedIcon className="absolute right-3 bottom-2 h-5 w-5 cursor-pointer" />
          )}
        </span>
      </div>

      {type === "login" && (
        <Link
          href="/forgot-password"
          className="float-right mt-4 text-ccdi-blue cursor-pointer"
        >
          Forgot your password?
        </Link>
      )}
      <AuthFormBtn type={type} />
    </form>
  );
}
