"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ConfigSection() {
  const [conceptosIngreso, setConceptosIngreso] = useState([
    "Donaciones",
    "Cuotas de Socios",
    "Eventos",
    "Subsidios",
    "Intereses",
    "Otros Ingresos",
  ])
  const [conceptosEgreso, setConceptosEgreso] = useState([
    "Nómina",
    "Servicios",
    "Materiales",
    "Mantenimiento",
    "Renta",
    "Impuestos",
    "Otros Egresos",
  ])
  const [nuevoConceptoIngreso, setNuevoConceptoIngreso] = useState("")
  const [nuevoConceptoEgreso, setNuevoConceptoEgreso] = useState("")
  const { toast } = useToast()

  const agregarConceptoIngreso = () => {
    if (nuevoConceptoIngreso.trim()) {
      setConceptosIngreso([...conceptosIngreso, nuevoConceptoIngreso.trim()])
      setNuevoConceptoIngreso("")
      toast({
        title: "Concepto agregado",
        description: "El concepto de ingreso se ha agregado correctamente.",
      })
    }
  }

  const agregarConceptoEgreso = () => {
    if (nuevoConceptoEgreso.trim()) {
      setConceptosEgreso([...conceptosEgreso, nuevoConceptoEgreso.trim()])
      setNuevoConceptoEgreso("")
      toast({
        title: "Concepto agregado",
        description: "El concepto de egreso se ha agregado correctamente.",
      })
    }
  }

  const eliminarConceptoIngreso = (concepto: string) => {
    setConceptosIngreso(conceptosIngreso.filter((c) => c !== concepto))
    toast({
      title: "Concepto eliminado",
      description: "El concepto de ingreso se ha eliminado correctamente.",
    })
  }

  const eliminarConceptoEgreso = (concepto: string) => {
    setConceptosEgreso(conceptosEgreso.filter((c) => c !== concepto))
    toast({
      title: "Concepto eliminado",
      description: "El concepto de egreso se ha eliminado correctamente.",
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Gestiona los conceptos predefinidos para las transacciones</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Conceptos de Ingreso */}
        <Card>
          <CardHeader>
            <CardTitle>Conceptos de Ingreso</CardTitle>
            <CardDescription>Categorías disponibles para registrar ingresos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {conceptosIngreso.map((concepto) => (
                <Badge key={concepto} variant="secondary" className="flex items-center gap-1 py-1.5">
                  {concepto}
                  <button onClick={() => eliminarConceptoIngreso(concepto)} className="ml-1 rounded-sm hover:bg-accent">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nuevo-ingreso">Agregar nuevo concepto</Label>
              <div className="flex gap-2">
                <Input
                  id="nuevo-ingreso"
                  value={nuevoConceptoIngreso}
                  onChange={(e) => setNuevoConceptoIngreso(e.target.value)}
                  placeholder="Ej: Patrocinios"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      agregarConceptoIngreso()
                    }
                  }}
                />
                <Button onClick={agregarConceptoIngreso} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conceptos de Egreso */}
        <Card>
          <CardHeader>
            <CardTitle>Conceptos de Egreso</CardTitle>
            <CardDescription>Categorías disponibles para registrar egresos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {conceptosEgreso.map((concepto) => (
                <Badge key={concepto} variant="secondary" className="flex items-center gap-1 py-1.5">
                  {concepto}
                  <button onClick={() => eliminarConceptoEgreso(concepto)} className="ml-1 rounded-sm hover:bg-accent">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nuevo-egreso">Agregar nuevo concepto</Label>
              <div className="flex gap-2">
                <Input
                  id="nuevo-egreso"
                  value={nuevoConceptoEgreso}
                  onChange={(e) => setNuevoConceptoEgreso(e.target.value)}
                  placeholder="Ej: Seguros"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      agregarConceptoEgreso()
                    }
                  }}
                />
                <Button onClick={agregarConceptoEgreso} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Asociación</CardTitle>
          <CardDescription>Configuración general de la organización</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la Asociación</Label>
              <Input id="nombre" defaultValue="Asociación Civil" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rfc">RFC</Label>
              <Input id="rfc" placeholder="XXX000000XXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" type="tel" placeholder="(55) 1234-5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="contacto@asociacion.org" />
            </div>
          </div>
          <Button className="w-full md:w-auto">Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  )
}
