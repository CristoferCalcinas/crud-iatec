import { notFound } from "next/navigation";
import { EventDetails } from "@/components/event-details";
import { getEventById } from "@/src/agenda/actions/get-event-by-id";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
}
