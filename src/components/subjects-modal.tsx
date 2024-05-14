import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubjectsForm from "./subjects-form";
import { AiOutlineUserAdd } from "react-icons/ai";

export function SubjectsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute right-0 h bg-ccdi-blue/80 hover:bg-ccdi-blue"
          size="sm"
          variant="destructive"
        >
          <AiOutlineUserAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-ccdi-blue">Add a Subject</DialogTitle>
        </DialogHeader>
        <SubjectsForm />
        {/* here */}
      </DialogContent>
    </Dialog>
  );
}
