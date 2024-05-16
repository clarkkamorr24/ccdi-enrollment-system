"use client";
import { useState } from "react";
import Modal from "./modal";
import { Classification } from "@/lib/types";

type IconWithModalProps = {
  modalType: Classification;
};

export default function IconWithModal({ modalType }: IconWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      modalType={modalType}
      action="add"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
