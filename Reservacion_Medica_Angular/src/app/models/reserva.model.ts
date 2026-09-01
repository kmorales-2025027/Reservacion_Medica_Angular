export enum EstadoReserva {
  PROGRAMADA = 'PROGRAMADA',
  ATENDIDA = 'ATENDIDA',
  CANCELADA = 'CANCELADA'
}
 
export interface Reserva {
  pacienteNombre: string;
  dpi: string;
  email: string;
  telefono: string;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  motivo: string;
  primeraConsulta?: boolean;
  estadoReserva: EstadoReserva;
}
 