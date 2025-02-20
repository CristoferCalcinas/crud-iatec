"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createEvent } from "@/src/agenda/actions/create-event";

const eventSchema = z
  .object({
    title: z.string().min(1, "El título es requerido"),
    description: z.string().optional(),
    location: z.string().optional(),
    startTime: z.coerce.date({
      required_error: "La fecha de inicio es requerida",
      invalid_type_error: "Fecha de inicio inválida",
    }),
    endTime: z.coerce.date({
      required_error: "La fecha de fin es requerida",
      invalid_type_error: "Fecha de finalización inválida",
    }),
  })
  .refine((data) => data.endTime >= data.startTime, {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["endTime"],
  });

type EventFormInputs = z.infer<typeof eventSchema>;

export function AddEventForm() {
  const form = useForm<EventFormInputs>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const [error, setError] = useState("");

  const addEvent = async ({
    title,
    startTime,
    endTime,
    description = "NO DESCRIPTION",
    location = "NO LOCATION",
  }: {
    title: string;
    startTime: Date;
    endTime: Date;
    description?: string;
    location?: string;
  }) => {
    const newEvent = await createEvent({
      title,
      startTime,
      endTime,
      description,
      location,
    });
    if (!newEvent) {
      setError("Primero tienes que iniciar sesión");
    }
  };

  const onSubmit = (data: EventFormInputs) => {
    addEvent(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="title">Título</Label>
              <FormControl>
                <Input id="title" placeholder="Título del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="description">Descripción</Label>
              <FormControl>
                <Input
                  id="description"
                  placeholder="Descripción del evento"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="location">Ubicación</Label>
              <FormControl>
                <Input
                  id="location"
                  placeholder="Ubicación del evento"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="startTime">Fecha de inicio</Label>
              <FormControl>
                <Input
                  id="startTime"
                  type="datetime-local"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="endTime">Fecha de fin</Label>
              <FormControl>
                <Input
                  id="endTime"
                  type="datetime-local"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormMessage>{error}</FormMessage>}

        <Button type="submit" className="w-full">
          Agregar Evento
        </Button>
      </form>
    </Form>
  );
}
