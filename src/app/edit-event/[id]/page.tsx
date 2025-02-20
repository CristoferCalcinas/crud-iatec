import { notFound } from "next/navigation";
import { EventDetails } from "@/components/event-details";
import { getEventById } from "@/src/agenda/actions/get-event-by-id";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
}
