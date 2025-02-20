"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { getEventByUser } from "@/src/agenda/actions/get-event-by-user";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const fetchedEvents = await getEventByUser();
      setAllEvents(fetchedEvents || []);
      setFilteredEvents(fetchedEvents || []);
    } catch (error) {
      console.error("Error cargando eventos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

      const filtered = allEvents.filter((event) => {
        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        return (
          (eventStart >= startOfDay && eventStart <= endOfDay) ||
          (eventEnd >= startOfDay && eventEnd <= endOfDay) ||
          (eventStart <= startOfDay && eventEnd >= endOfDay)
        );
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [selectedDate, allEvents]);

  const clearFilter = () => {
    setSelectedDate(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtrar por fecha</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                initialFocus
              />
              {selectedDate && (
                <Button
                  onClick={clearFilter}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <XIcon className="w-4 h-4 mr-2" />
                  Limpiar filtro
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6">
            Eventos {selectedDate && `del ${selectedDate.toLocaleDateString()}`}
          </h1>
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Link href={`/edit-event/${event.id}`} key={event.id}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          ) : (
            <p>No se encontraron eventos{selectedDate && " para esta fecha"}</p>
          )}
        </div>
      </div>
    </div>
  );
}
