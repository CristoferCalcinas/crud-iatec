import { prisma } from "@/prisma";

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      categories: true,
      participants: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });
}
