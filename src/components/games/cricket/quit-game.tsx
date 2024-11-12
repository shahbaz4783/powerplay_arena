import { Button } from "@/src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { X } from "lucide-react";
import Link from "next/link";

export function QuitGame() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="self-start mb-4">
          <X className="mr-2 h-4 w-4" /> Quit Game
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current game progress will be lost, and you will be considered
            as having lost the game. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center justify-between">
          <AlertDialogCancel className="">Cancel</AlertDialogCancel>
          <Link href={"/miniapp"}>
            <AlertDialogAction>Quit Game</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
