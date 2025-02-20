"use server";

import { auth } from "@/auth";

import { prisma } from "@/prisma";

export const getEventByUser = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    console.error("No se pudo obtener la sesión del usuario.");
    return null;
  }

  const userId = session.user.id;

  try {
    return await prisma.event.findMany({
      where: { userId },
      select: {
        title: true,
        description: true,
        createdAt: true,
        location: true,
        participants: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error cargando la agenda:", error);
    return [];
  }
};
