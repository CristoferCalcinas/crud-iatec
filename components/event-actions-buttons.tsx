"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteEventById } from "@/src/agenda/actions/delete-event-by-id";

interface Props {
  id: string;
}

export const EventActionsButtons = ({ id }: Props) => {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/edit-event/${id}`);
  };

  return (
    <div className="text-lg w-full flex justify-end space-x-4">
      <Button variant={"default"} onClick={handleEdit}>
        Editar
      </Button>
      <DeleteDialogButton id={id} />
    </div>
  );
};

function DeleteDialogButton({ id }: Props) {
  const handleDelete = async () => {
    const dropEvent = await deleteEventById(id);
    if (dropEvent) {
      console.log("Evento eliminado", id);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este evento?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
