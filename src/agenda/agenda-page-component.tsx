"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "@/components/add-event-form";
import { EventList } from "@/components/event-list";

export const AgendaPageComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [events, setEvents] = useState<{ date: Date; title: string }[]>([]);

  const addEvent = (title: string) => {
    if (selectedDate) {
      setEvents([...events, { date: selectedDate, title }]);
    }
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
        <Card>
          <CardHeader>
            <CardTitle>Eventos del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <EventList events={events} selectedDate={selectedDate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
