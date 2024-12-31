import {
  AlertDialog as AlertDialogUi,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

interface AlertDialogProps {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onAction: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertDialog = ({
  title,
  description,
  cancelText,
  actionText,
  onAction,
  isOpen,
  setIsOpen,
}: AlertDialogProps) => {
  return (
    <AlertDialogUi open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUi>
  );
};

export default AlertDialog;
