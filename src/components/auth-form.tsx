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
        <Label htmlFor="username">Username:</Label>
        <Input id="username" name="username" />
      </div>

      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" />
      </div>

      {type === "register" && (
        <div className="space-y-1 mt-2">
          <Label htmlFor="c_password">Confirm Password:</Label>
          <Input id="c_password" name="c_password" />
        </div>
      )}

      <Button className="w-full mt-5">
        {type === "register" ? "Register" : "Login"}
      </Button>
    </form>
  );
}
