interface EventListProps {
  events: {
    title: string;
    description: string;
    createdAt: Date;
    location: string;
  }[];
  selectedDate: Date | undefined;
}

export function EventList({ events, selectedDate }: EventListProps) {
  const filteredEvents = events.filter(
    (event) => selectedDate && event.createdAt.toDateString() === selectedDate.toDateString()
  );

  return (
    <ul className="space-y-4">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <li key={index} className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold">{event.title}</h3>
            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            )}
            {event.location && (
              <p className="text-sm text-muted-foreground mt-1">📍 {event.location}</p>
            )}
          </li>
        ))
      ) : (
        <li className="text-muted-foreground">No hay eventos para este día.</li>
      )}
    </ul>
  );
}

