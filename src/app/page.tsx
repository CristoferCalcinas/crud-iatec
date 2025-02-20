import { auth } from "@/auth";
import { AgendaPageComponent } from "../agenda/agenda-page-component";
import { prisma } from "@/prisma";
import { EventList } from "@/components/event-list";
import Link from "next/link";

// Función de ayuda para cargar los eventos del usuario.
async function loadUserAgenda(userId: string) {
  try {
    return await prisma.event.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
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
}

interface Agenda {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
}

export default async function AgendaPage() {
  const session = await auth();

  let title = "Crear evento";
  let agenda: Agenda[] = [];

  if (session && session.user && session.user.id) {
    title = `Hola, ${session.user.name}, ¿qué evento deseas crear?`;
    agenda = (await loadUserAgenda(session.user.id)).map((e) => ({
      ...e,
      description: e.description ?? "",
      location: e.location ?? "",
    }));
  }

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold py-7 text-center">{title}</h1>
        <Link
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="/edit-event"
        >
          Ver todos los eventos y filtrarlos
        </Link>
      </div>
      <AgendaPageComponent />

      <h2 className="text-xl font-semibold py-7 text-center">Eventos</h2>
      <EventList events={agenda} />
    </section>
  );
}
