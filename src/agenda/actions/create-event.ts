"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

interface CreateEventInput {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  categoryIds?: string[];
}

export const createEvent = async (input: CreateEventInput) => {
  const { title, description, location, startTime, endTime, categoryIds } =
    input;

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    console.error("No se pudo obtener la sesión del usuario.");
    return null;
  }

  try {
    return await prisma.event.create({
      data: {
        title,
        description,
        location,
        startTime,
        endTime,
        userId: session.user.id,
        categories:
          categoryIds && categoryIds.length > 0
            ? {
                connect: categoryIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        categories: true,
      },
    });
  } catch (error) {
    console.log("Error creando evento:", error);
    return null;
  }
};
