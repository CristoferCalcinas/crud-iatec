"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "@/components/add-event-form";

export const AgendaPageComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mt-5">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Evento</CardTitle>
          </CardHeader>
          <CardContent>
            <AddEventForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
