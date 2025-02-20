interface EventListProps {
  events: { date: Date; title: string }[]
  selectedDate: Date | undefined
}

export function EventList({ events, selectedDate }: EventListProps) {
  const filteredEvents = events.filter(
    (event) => selectedDate && event.date.toDateString() === selectedDate.toDateString(),
  )

  return (
    <ul className="space-y-2">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <li key={index} className="bg-secondary p-2 rounded">
            {event.title}
          </li>
        ))
      ) : (
        <li className="text-muted-foreground">No hay eventos para este día.</li>
      )}
    </ul>
  )
}

