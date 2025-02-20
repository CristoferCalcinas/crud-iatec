"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editEventById } from "@/src/agenda/actions/edit-event-by-id";
import { CalendarIcon, MapPinIcon, UsersIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";

type EventDetailsProps = {
  event: {
    id: string;
    title: string;
    description?: string | null;
    startTime: Date;
    endTime: Date;
    location?: string | null;
    categories: { name: string; color?: string | null }[];
    participants: { user: { name?: string | null; email: string } }[];
    user: { name?: string | null; email: string };
  };
};

export function EventDetails({ event }: EventDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description || "",
    location: event.location || ""
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      title: event.title,
      description: event.description || "",
      location: event.location || ""
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const updated = await editEventById(event.id, formData);
    if (updated) {
      setIsEditing(false);
      // Opcionalmente recargar la página o actualizar el estado
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {isEditing ? (
        <>
          <Input
            className="text-3xl font-bold mb-4"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>
              {new Date(event.startTime).toLocaleString()} -{" "}
              {new Date(event.endTime).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.categories.map((category) => (
              <Badge
                key={category.name}
                style={{ backgroundColor: category.color || undefined }}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <Textarea
            className="mb-6"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>
              {new Date(event.startTime).toLocaleString()} -{" "}
              {new Date(event.endTime).toLocaleString()}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center mb-4">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.categories.map((category) => (
              <Badge
                key={category.name}
                style={{ backgroundColor: category.color || undefined }}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          {event.description && <p className="mb-6">{event.description}</p>}
        </>
      )}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Organizador</h2>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarFallback>
              {event.user.name?.[0] || event.user.email[0]}
            </AvatarFallback>
          </Avatar>
          <span>{event.user.name || event.user.email}</span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Participantes ({event.participants.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {event.participants.map((participant) => (
            <Avatar
              key={participant.user.email}
              title={participant.user.name || participant.user.email}
            >
              <AvatarFallback>
                {participant.user.name?.[0] || participant.user.email[0]}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {isEditing ? (
          <>
            <Button onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <XIcon className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit}>
              <PencilIcon className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button>
              <UsersIcon className="w-4 h-4 mr-2" />
              Unirse al evento
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
