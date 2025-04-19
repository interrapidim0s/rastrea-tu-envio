import { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Admin() {
  const [formData, setFormData] = useState({
    guia: "",
    estado: "Recibido",
    fechaEvento: "",
    fechaEntrega: "",
    ciudadEvento: "",
    origen: "",
    destino: "",
    estadoDetalle: "",
    progreso: 0,
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "progreso" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const envioRef = doc(db, "envios", formData.guia);
      await setDoc(envioRef, formData);
      setMensaje("¡Envío creado exitosamente!");
      setFormData({
        guia: "",
        estado: "Recibido",
        fechaEvento: "",
        fechaEntrega: "",
        ciudadEvento: "",
        origen: "",
        destino: "",
        estadoDetalle: "",
        progreso: 0,
      });
    } catch (error){
      console.error("Error al crear el envío:", error);
      setMensaje("Ocurrió un error al crear el envío.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Panel de Administración - Crear Envío</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="guia">Número de Guía</Label>
              <Input required type="text" id="guia" name="guia" value={formData.guia} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="estado">Estado</Label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="Recibido">Recibido</option>
                <option value="En Proceso">En Proceso</option>
                <option value="En Entrega">En Entrega</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="fechaEvento">Fecha Evento</Label>
              <Input required type="date" id="fechaEvento" name="fechaEvento" value={formData.fechaEvento} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="fechaEntrega">Fecha Entrega</Label>
              <Input required type="date" id="fechaEntrega" name="fechaEntrega" value={formData.fechaEntrega} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="ciudadEvento">Ciudad Evento</Label>
              <Input required type="text" id="ciudadEvento" name="ciudadEvento" value={formData.ciudadEvento} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="origen">Origen</Label>
              <Input required type="text" id="origen" name="origen" value={formData.origen} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="destino">Destino</Label>
              <Input required type="text" id="destino" name="destino" value={formData.destino} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="estadoDetalle">Estado Detalle</Label>
              <Input required type="text" id="estadoDetalle" name="estadoDetalle" value={formData.estadoDetalle} onChange={handleChange} />
            </div>

            <div className="flex flex-col md:col-span-2">
              <Label htmlFor="progreso">Progreso: {formData.progreso}%</Label>
              <input
                type="range"
                id="progreso"
                name="progreso"
                value={formData.progreso}
                min={0}
                max={100}
                step={5}
                onChange={handleChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#303030]"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <Button type="submit" className="w-full bg-[#303030]" disabled={loading}>
                {loading ? "Guardando..." : "Crear Envío"}
              </Button>
            </div>
          </form>

          {mensaje && (
            <p className="mt-4 text-center text-sm font-medium text-green-600">{mensaje}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
