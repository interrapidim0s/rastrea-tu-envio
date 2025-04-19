// src/types/envío.ts
export interface Envio {
  origen?: string;
  destino?: string;
  estado?: string;
  fechaEvento?: string;
  ciudadEvento?: string;
  estadoDetalle?: string;
  fechaEntrega?: string;
  progreso?: number;
}
