"use client";

import { AgendaPageComponent } from "../agenda/agenda-page-component";

export default function AgendaPage() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Agenda</h1>

      <AgendaPageComponent />
    </section>
  );
}
