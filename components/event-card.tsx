import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon } from "lucide-react"

type EventCardProps = {
  event: {
    id: string
    title: string
    startTime: Date
    endTime: Date
    location?: string | null
    categories: { name: string; color?: string | null }[]
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {new Date(event.startTime).toLocaleDateString()} - {new Date(event.endTime).toLocaleDateString()}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center mb-2">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {event.categories.map((category) => (
            <Badge key={category.name} style={{ backgroundColor: category.color || undefined }}>
              {category.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

