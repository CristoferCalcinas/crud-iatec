import { auth } from "@/auth";
import { AgendaPageComponent } from "../agenda/agenda-page-component";
import { Header } from "@/components/header";
import { prisma } from "@/prisma";

// Función de ayuda para cargar los eventos del usuario.
async function loadUserAgenda(userId: string) {
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
}

interface Agenda {
  title: string;
  description: string;
  createdAt: Date;
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

  console.log({ title, agenda });

  return (
    <>
      <Header />
      <section className="container mx-auto p-4">
        <h1 className="text-xl font-semibold py-7 text-center">{title}</h1>
        <AgendaPageComponent agenda={agenda} />
      </section>
    </>
  );
}
