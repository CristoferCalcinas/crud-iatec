"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getEventByUser = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  try {
    return await prisma.event.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        categories: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return null;
  }
};
