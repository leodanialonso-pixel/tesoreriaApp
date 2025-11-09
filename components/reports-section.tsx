"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Download, Eye } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

// Datos de ejemplo
const transacciones = [
  {
    id: 1,
    fecha: new Date(2024, 11, 15),
    concepto: "Donaciones",
    tipo: "ingreso",
    monto: 25000,
    descripcion: "Donación anónima para proyecto comunitario",
  },
  {
    id: 2,
    fecha: new Date(2024, 11, 14),
    concepto: "Nómina",
    tipo: "egreso",
    monto: 18000,
    descripcion: "Pago de nómina quincenal",
  },
  {
    id: 3,
    fecha: new Date(2024, 11, 12),
    concepto: "Cuotas de Socios",
    tipo: "ingreso",
    monto: 15000,
    descripcion: "Cobro de cuotas mensuales",
  },
  {
    id: 4,
    fecha: new Date(2024, 11, 10),
    concepto: "Servicios",
    tipo: "egreso",
    monto: 3500,
    descripcion: "Pago de luz y agua",
  },
  {
    id: 5,
    fecha: new Date(2024, 11, 8),
    concepto: "Materiales",
    tipo: "egreso",
    monto: 8200,
    descripcion: "Compra de material de oficina",
  },
  {
    id: 6,
    fecha: new Date(2024, 11, 5),
    concepto: "Eventos",
    tipo: "ingreso",
    monto: 28000,
    descripcion: "Recaudación evento benéfico",
  },
]

export function ReportsSection() {
  const [vista, setVista] = useState("mensual")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 11, 1),
    to: new Date(2024, 11, 31),
  })

  const totalIngresos = transacciones.filter((t) => t.tipo === "ingreso").reduce((sum, t) => sum + t.monto, 0)

  const totalEgresos = transacciones.filter((t) => t.tipo === "egreso").reduce((sum, t) => sum + t.monto, 0)

  const handleExportCSV = () => {
    // Aquí se implementaría la exportación a CSV
    console.log("Exportando a CSV...")
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reportes Históricos</h1>
        <p className="text-muted-foreground">Consulta y analiza el historial de transacciones</p>
      </div>

      {/* Controles superiores */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Selector de rango de fechas */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Rango de Fechas</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal md:w-[300px]",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                            {format(date.to, "LLL dd, y", { locale: es })}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y", { locale: es })
                        )
                      ) : (
                        <span>Selecciona un rango</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Selector de vista */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Vista</label>
                <Select value={vista} onValueChange={setVista}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quincenal">Quincenal</SelectItem>
                    <SelectItem value="mensual">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botón de exportar */}
            <Button onClick={handleExportCSV} className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Exportar a CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacciones.map((transaccion) => (
                  <TableRow key={transaccion.id}>
                    <TableCell className="font-medium">{format(transaccion.fecha, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{transaccion.concepto}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaccion.tipo === "ingreso" ? "default" : "destructive"}
                        className={
                          transaccion.tipo === "ingreso"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {transaccion.tipo === "ingreso" ? "Ingreso" : "Egreso"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${transaccion.monto.toLocaleString("es-MX")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Totales */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIngresos.toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Egresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalEgresos.toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalIngresos - totalEgresos).toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
