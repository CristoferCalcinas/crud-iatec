import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddEventForm } from "@/components/add-event-form";

export const AgendaPageComponent = () => {
  return (
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
  );
};
