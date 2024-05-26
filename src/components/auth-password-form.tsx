"use client";

import { useFormState } from "react-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { forgotPassword, resetPassword } from "@/actions/action";
import AuthFormBtn from "./auth-from-btn";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthPasswordFormProps = {
  type: "forgot" | "reset";
  id?: string;
};

export default function AuthPasswordForm({ type, id }: AuthPasswordFormProps) {
  const router = useRouter();
  const [forgotPasswordMessage, dispatchForgotPassword] = useFormState(
    forgotPassword,
    undefined
  );
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  return (
    <form
      className="text-sm"
      action={
        type === "reset"
          ? async (formData: FormData) => {
              const result = await resetPassword(formData, id!);
              setResetPasswordError(result?.message ?? null);

              if (result.success) {
                toast.success("Password reset successful.");
                router.push("/login");
              }
            }
          : dispatchForgotPassword
      }
    >
      {forgotPasswordMessage?.message && (
        <p className="text-red-500 font-semibold text-center text-xs">
          {forgotPasswordMessage.message}
        </p>
      )}

      {forgotPasswordMessage?.success && (
        <p className="text-green-500 font-semibold text-center text-xs">
          {forgotPasswordMessage.success}
        </p>
      )}

      {resetPasswordError && (
        <p className="text-red-500 font-semibold text-center text-xs">
          {resetPasswordError}
        </p>
      )}

      {type === "forgot" && (
        <div className="space-y-1 mt-5">
          <Label htmlFor="email">Please enter your email</Label>
          <Input id="email" type="email" name="email" required maxLength={50} />
        </div>
      )}

      {type === "reset" && (
        <>
          <div className="space-y-1 mt-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type={isPasswordOpen ? "text" : "password"}
              name="password"
              required
              maxLength={50}
            />
            <span onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
              {isPasswordOpen && (
                <EyeOpenIcon className="absolute right-3 bottom-2 h-5 w-5 cursor-pointer" />
              )}
              {!isPasswordOpen && (
                <EyeClosedIcon className="absolute right-3 bottom-2 h-5 w-5 cursor-pointer" />
              )}
            </span>
          </div>
          <div className="space-y-1 mt-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={isPasswordOpen ? "text" : "password"}
              name="confirmPassword"
              required
              maxLength={50}
            />
          </div>
        </>
      )}
      {type === "reset" && (
        <div className="flex justify-items-center items-center gap-x-2 mt-2">
          <p>Show password</p>
          <Checkbox
            checked={isPasswordOpen}
            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
            className="bg-ccdi-blue/80 hover:bg-ccdi-blue/90"
          />
        </div>
      )}

      <AuthFormBtn type="password" />
    </form>
  );
}
