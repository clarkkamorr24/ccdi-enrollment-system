import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

type AuthFormtnProps = {
  type: "login" | "register" | "password";
};

export default function AuthFormBtn({ type }: AuthFormtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-full mt-5 bg-ccdi-blue disabled:bg-ccdi-blue"
    >
      {type === "register" && (pending ? "Signing up..." : "Register")}
      {type === "login" &&
        (pending ? (
          <>
            {"Logging in "}
            <p className="ml-3 animate-spin">
              <AiOutlineLoading />
            </p>{" "}
          </>
        ) : (
          "Login"
        ))}
      {type === "password" && (pending ? <>{"Submitting ..."}</> : "Submit")}
    </Button>
  );
}
