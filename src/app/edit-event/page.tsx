import { Suspense } from "react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { getEventByUser } from "@/src/agenda/actions/get-event-by-user";

export default async function EventsPage() {
  const events = await getEventByUser();

  if (!events) {
    return <p>No se encontraron eventos</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Eventos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<p>Cargando eventos...</p>}>
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
