"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddEventFormProps {
  onAddEvent: (title: string) => void
}

export function AddEventForm({ onAddEvent }: AddEventFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddEvent(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input type="text" placeholder="Título del evento" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit">Agregar Evento</Button>
    </form>
  )
}

