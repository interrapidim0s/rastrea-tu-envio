import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Package, Truck, Loader2 } from "lucide-react";
import { Envio } from "@/types/envios";
import logo from "../assets/img/interrapidisimo-1.png";

export function TrackingResult() {
  const { guia } = useParams<{ guia: string }>();
  const [envio, setEnvio] = useState<Envio | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnvio() {
      if (!guia) return;
      setLoading(true);
      const ref = doc(db, "envios", guia);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        setError("Envío no encontrado.");
        setLoading(false);
        return;
      }
      setEnvio(snap.data() as Envio);
      setLoading(false);
    }
    fetchEnvio();
  }, [guia]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center bg-gray-100">
        <div>
          <p className="text-xl text-red-500">{error}</p>
          <Link to="/" className="text-[#303030] text-lg mt-4 inline-block">
            <Button className="bg-[#303030] hover:bg-[#232323]">Intentar con otro número de guía</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col bg-gray-100">
        <Loader2 className="animate-spin text-[#303030]" size={40} />
        <p className="text-xl text-[#303030] mt-4">Cargando...</p>
      </div>
    );
  }

  if (!envio) return null;

  const {
    estado = "En Proceso",
    fechaEvento,
    fechaEntrega,
    ciudadEvento = "Bogotá",
    origen = "Medellín",
    destino = "Cali",
    estadoDetalle = "Paquete en camino",
    progreso = 0, // <-- nuevo campo desde la base de datos
  } = envio;

  const fechaEventoDate = new Date(fechaEvento ?? new Date());
  const fechaEntregaEstimada = new Date(fechaEntrega ?? new Date());

  const receivedDate = new Date(fechaEventoDate);
  const processDate = new Date(receivedDate);
  processDate.setDate(processDate.getDate() + 1);

  const deliveryDate = new Date(processDate);
  deliveryDate.setDate(deliveryDate.getDate() + 1);

  const deliveredDate = new Date(fechaEntregaEstimada);

  const timelineSteps = [
    { label: "Recibido", icon: <Package size={20} />, date: receivedDate },
    { label: "En Proceso", icon: <Truck size={20} />, date: processDate },
    { label: "En Entrega", icon: <MapPin size={20} />, date: deliveryDate },
    { label: "Entregado", icon: <Package size={20} />, date: deliveredDate },
  ];

  const currentStepIndex = Math.floor((progreso / 100) * (timelineSteps.length));

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-[#303030] py-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
          <h1 className="text-3xl font-bold text-white">Seguimiento de Guía</h1>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        <Card className="shadow-xl mb-6 bg-white rounded-lg">
          <CardHeader className="border-b-2 border-[#303030]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Guía #{guia}</CardTitle>
                <Badge className="mt-2" variant={estado === "Entregado" ? "default" : "secondary"}>
                  {estado}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-500">Progreso de Entrega</span>
              <Progress value={progreso} className="h-2 mt-2 bg-[#ccc]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Origen</h3>
                <p>{origen}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Destino</h3>
                <p>{destino}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Fecha de Evento</h3>
                <p>{fechaEventoDate.toLocaleDateString("es-CO")}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Ciudad de Evento</h3>
                <p>{ciudadEvento}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Estado Detalle</h3>
                <p>{estadoDetalle}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="mb-1 text-sm font-medium">Fecha Estimada de Entrega</h3>
                <p>{fechaEntregaEstimada.toLocaleDateString("es-CO")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-white rounded-lg mt-8">
          <CardHeader className="border-b-2 border-[#303030]">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Línea de Tiempo del Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative flex items-center justify-between">
              <div className="absolute w-full h-1 bg-gray-300 rounded-full z-0"></div>
              <div className="flex space-x-6 items-center justify-between w-full z-10">
                {timelineSteps.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={index}
                      className={`relative flex flex-col items-center ${
                        isCompleted || isCurrent ? "text-[#303030]" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center ${
                          isCurrent ? "p-1 rounded-full ring-2 ring-[#303030] ring-offset-2 ring-offset-white transition-all duration-300" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${
                            isCompleted || isCurrent ? "border-[#303030]" : "border-gray-300"
                          }`}
                        >
                          {step.icon}
                        </div>
                      </div>
                      <p className="text-xs font-medium mt-2">{step.label}</p>
                      <p className="text-xs text-gray-500">{step.date.toLocaleDateString("es-CO")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/">
            <Button className="bg-[#303030] hover:bg-[#232323]">Volver a Buscar</Button>
          </Link>
        </div>
      </main>

      <footer className="bg-[#202020] text-gray-300 py-6 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 <span className="font-semibold">INTERRAPIDÍSIMO</span>. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
