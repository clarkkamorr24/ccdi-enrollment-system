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
    undefined,
  );
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null,
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
        <p className="text-center text-xs font-semibold text-red-500">
          {forgotPasswordMessage.message}
        </p>
      )}

      {forgotPasswordMessage?.success && (
        <p className="text-center text-xs font-semibold text-green-500">
          {forgotPasswordMessage.success}
        </p>
      )}

      {resetPasswordError && (
        <p className="text-center text-xs font-semibold text-red-500">
          {resetPasswordError}
        </p>
      )}

      {type === "forgot" && (
        <div className="mt-5 space-y-1">
          <Label htmlFor="email">Please enter your email</Label>
          <Input id="email" type="email" name="email" required maxLength={50} />
        </div>
      )}

      {type === "reset" && (
        <>
          <div className="mt-2 space-y-1">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type={isPasswordOpen ? "text" : "password"}
              name="password"
              required
              min={5}
              maxLength={50}
            />
            <span onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
              {isPasswordOpen && (
                <EyeOpenIcon className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer" />
              )}
              {!isPasswordOpen && (
                <EyeClosedIcon className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer" />
              )}
            </span>
          </div>
          <div className="mt-2 space-y-1">
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
        <div className="mt-2 flex items-center justify-items-center gap-x-2">
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
