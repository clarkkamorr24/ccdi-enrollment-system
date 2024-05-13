"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/action";
import { AiOutlineLoading, AiOutlineLogout } from "react-icons/ai";

export default function LogoutBtn() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () =>
        startTransition(async () => {
          await logout();
        })
      }
      className="h-8 bg-ccdi-red/50"
    >
      {isPending ? (
        <>
          {"Logging out "}
          <p className="ml-3 animate-spin">
            <AiOutlineLoading />
          </p>{" "}
        </>
      ) : (
        <>
          {"Log out"}
          <AiOutlineLogout className="ml-2" />
        </>
      )}
    </Button>
  );
}
