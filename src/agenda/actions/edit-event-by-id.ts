"use server";

import { prisma } from "@/prisma";

interface UpdateEventData {
  title: string;
  description?: string;
  location?: string;
}

export const editEventById = async (id: string, data: UpdateEventData) => {
  try {
    return await prisma.event.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error editando evento:", error);
    return null;
  }
};
