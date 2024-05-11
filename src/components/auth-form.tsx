import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action="/dashboard">
      <div className="space-y-1 mt-5">
        <Label htmlFor="email">Username:</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password:</Label>
        <Input type="email" id="email" name="email" />
      </div>

      {type === "register" && (
        <div className="space-y-1 mt-2">
          <Label htmlFor="password">Confirm Password:</Label>
          <Input type="email" id="email" name="email" />
        </div>
      )}

      <Button className="w-full mt-5">
        {type === "register" ? "Register" : "Login"}
      </Button>
    </form>
  );
}
