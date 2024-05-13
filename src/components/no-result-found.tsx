import Image from "next/image";
import React from "react";
import noResultFound from "../../public/empty.jpg";

export default function NoResultFound() {
  return (
    <div className="flex justify-center h-[500px] w-full">
      <Image
        alt="no-result-found"
        src={noResultFound}
        width={500}
        height={500}
        className="rounded-md"
      />
    </div>
  );
}
