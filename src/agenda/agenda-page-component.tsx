"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "@/components/add-event-form";
import { EventList } from "@/components/event-list";
import { createEvent } from "./actions/create-event";

interface Props {
  agenda: Event[];
}

interface Event {
  title: string;
  description: string;
  createdAt: Date;
  location: string;
}

export const AgendaPageComponent = ({ agenda }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [events, setEvents] = useState<Event[]>(agenda);

  const addEvent = async (data: {
    title: string;
    description?: string;
    location?: string;
    startTime: Date;
    endTime: Date;
  }) => {
    // const newEvent = await createEvent(title);
    console.log("Evento creado:", data.title);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Evento</CardTitle>
          </CardHeader>
          <CardContent>
            <AddEventForm onAddEvent={addEvent} />
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Eventos del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <EventList events={events} selectedDate={selectedDate} />
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
