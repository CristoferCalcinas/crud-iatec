import { auth } from "@/auth";
import { AgendaPageComponent } from "../agenda/agenda-page-component";
import { Header } from "@/components/header";

export default async function AgendaPage() {
  const session = await auth();

  const title = session?.user?.name
    ? `Hola, ${session.user.name}, que evento deseas crear?`
    : "Crear evento";

  return (
    <>
      <Header />
      <section className="container mx-auto p-4">
        <h1 className="text-xl font-semibold py-7 text-center">{title}</h1>

        <AgendaPageComponent />
      </section>
    </>
  );
}
