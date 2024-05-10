import Image from "next/image";
import React from "react";

export default function Logo() {
  return <Image alt="logo" src="/logo.svg" width={300} height={80} />;
}
