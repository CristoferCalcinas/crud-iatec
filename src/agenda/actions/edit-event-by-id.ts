"use server";

import { prisma } from "@/prisma";

export const editEventById = async (id: string) => {
  try {
    return await prisma.event.update({
      where: { id },
      data: {
        title: "Nuevo título",
        description: "Nueva descripción",
        location: "Nueva ubicación",
      },
    });
  } catch (error) {
    console.error("Error editando evento:", error);
    return null;
  }
};
