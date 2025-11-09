"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const conceptosIngreso = ["Donaciones", "Cuotas de Socios", "Eventos", "Subsidios", "Intereses", "Otros Ingresos"]

const conceptosEgreso = ["Nómina", "Servicios", "Materiales", "Mantenimiento", "Renta", "Impuestos", "Otros Egresos"]

export function TransactionForm() {
  const [tipo, setTipo] = useState<"ingreso" | "egreso">("ingreso")
  const [fecha, setFecha] = useState<Date>()
  const [concepto, setConcepto] = useState("")
  const [monto, setMonto] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const { toast } = useToast()

  const conceptos = tipo === "ingreso" ? conceptosIngreso : conceptosEgreso

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí se guardaría la transacción en la base de datos
    console.log({
      tipo,
      fecha,
      concepto,
      monto: Number.parseFloat(monto),
      descripcion,
    })

    toast({
      title: "Transacción guardada",
      description: `${tipo === "ingreso" ? "Ingreso" : "Egreso"} de $${Number.parseFloat(monto).toLocaleString("es-MX")} registrado correctamente.`,
    })

    // Limpiar formulario
    setFecha(undefined)
    setConcepto("")
    setMonto("")
    setDescripcion("")
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Registro de Transacción</h1>
        <p className="text-muted-foreground">Registra un nuevo ingreso o egreso en la tesorería</p>
      </div>

      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Nueva Transacción</CardTitle>
          <CardDescription>Completa todos los campos para registrar una transacción</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Movimiento */}
            <div className="space-y-2">
              <Label>Tipo de Movimiento</Label>
              <Tabs value={tipo} onValueChange={(v) => setTipo(v as "ingreso" | "egreso")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ingreso">Ingreso</TabsTrigger>
                  <TabsTrigger value="egreso">Egreso</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de Creación *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !fecha && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fecha ? format(fecha, "PPP", { locale: es }) : "Selecciona una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Concepto */}
            <div className="space-y-2">
              <Label htmlFor="concepto">Concepto (Categoría) *</Label>
              <Select value={concepto} onValueChange={setConcepto}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un concepto" />
                </SelectTrigger>
                <SelectContent>
                  {conceptos.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monto */}
            <div className="space-y-2">
              <Label htmlFor="monto">Monto *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="monto"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="pl-7"
                  required
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción/Detalle</Label>
              <Textarea
                id="descripcion"
                placeholder="Notas adicionales sobre esta transacción..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Guardar Transacción
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
