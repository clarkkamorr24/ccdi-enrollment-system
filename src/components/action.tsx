import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import ConfirmationModal from "./confirmation-modal";
import { useState } from "react";
import { Classification } from "@/lib/types";
import Modal from "./modal";
import { useStudentContext } from "@/hooks/useStudent";
import { useSubjectContext } from "@/hooks/useSubject";

type ActionProps = {
  id: string;
  type: Classification;
};

export default function Action({ id, type }: ActionProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleChangeSelectStudentId } = useStudentContext();
  const { handleChangeSelectSubjectId } = useSubjectContext();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                {
                  type === "student" && handleChangeSelectStudentId(id);
                }
                {
                  type === "subject" && handleChangeSelectSubjectId(id);
                }
                setIsModalOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                {
                  type === "student" && handleChangeSelectStudentId(id);
                }
                {
                  type === "subject" && handleChangeSelectSubjectId(id);
                }
                setIsConfirmationModalOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        type={type}
      />
      <Modal
        modalType={type}
        action="edit"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
