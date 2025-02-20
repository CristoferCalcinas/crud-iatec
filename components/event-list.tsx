import { EventActionsButtons } from "./event-actions-buttons";

interface EventListProps {
  events: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    location: string;
  }[];
}

export function EventList({ events }: EventListProps) {
  return (
    <ul className="space-y-6">
      {events.length > 0 ? (
        events.map(
          ({ id, title, description, location, createdAt, updatedAt }) => (
            <li
              key={id}
              className="bg-secondary p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Nombre del evento:
                    <strong className="font-bold px-5">{title}</strong>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Descripción del evento:
                    <strong className="font-bold px-5">{description}</strong>
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    📍 Lugar del evento;
                    <span className="font-bold px-5">{location}</span>
                  </div>
                </div>

                <div className="space-y-2 md:text-right">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Creado:</span>
                    <time className="ml-2 font-medium">
                      {new Date(createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Actualizado:</span>
                    <time className="ml-2 font-medium">
                      {new Date(updatedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <EventActionsButtons id={id} />
                </div>
              </div>
            </li>
          )
        )
      ) : (
        <li className="text-center text-muted-foreground py-8">
          No hay eventos para mostrar.
        </li>
      )}
    </ul>
  );
}
