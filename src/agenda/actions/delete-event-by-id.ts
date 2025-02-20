"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export const deleteEventById = async (id: string) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    console.error("No se pudo obtener la sesión del usuario.");
    return null;
  }

  try {
    // Primero verificamos que el evento pertenezca al usuario
    const event = await prisma.event.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!event) {
      console.error("Evento no encontrado");
      return null;
    }

    if (event.userId !== session.user.id) {
      console.error("No autorizado para eliminar este evento");
      return null;
    }

    // Si llegamos aquí, el usuario es el propietario y podemos eliminar
    const eventDeleted = await prisma.event.delete({
      where: { id },
    });

    if (!eventDeleted) {
      console.error("Error eliminando evento");
      return null;
    }

    revalidatePath("/");

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error eliminando evento:", error);
    return null;
  }
};
