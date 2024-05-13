"use client";

import { useFormState } from "react-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { logIn, register } from "@/actions/action";
import AuthFormBtn from "./auth-from-btn";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [registerError, dispatchRegister] = useFormState(register, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

  return (
    <form action={type === "register" ? dispatchRegister : dispatchLogIn}>
      {logInError && (
        <p className="text-sm text-red-500 font-semibold text-center">
          {" "}
          {logInError.message}
        </p>
      )}

      {registerError && (
        <p className="text-sm text-red-500 font-semibold text-center">
          {" "}
          {registerError.message}
        </p>
      )}

      <div className="space-y-1 mt-5">
        <Label htmlFor="username">Username:</Label>
        <Input
          id="username"
          type="text"
          name="username"
          required
          maxLength={100}
        />
      </div>

      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          name="password"
          required
          maxLength={100}
        />
      </div>

      <AuthFormBtn type={type} />
    </form>
  );
}
