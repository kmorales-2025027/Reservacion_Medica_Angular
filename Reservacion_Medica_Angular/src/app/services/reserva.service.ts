import { Injectable } from '@angular/core';
import { Reserva, EstadoReserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaciones: Reserva[] = [];
  private reservaEnEdicion: Reserva | null = null;

  constructor() {}

  agregarReserva(reserva: Reserva): void {
    this.reservaciones.push(reserva);
  }

  obtenerReservaciones(): Reserva[] {
    return this.reservaciones;
  }

  filtrarReservas(nombre: string, estado: EstadoReserva | 'TODOS'): Reserva[] {
    return this.reservaciones.filter(reserva => {
      const coincidenNombre = !nombre || nombre.trim() === '' || 
        reserva.pacienteNombre.toLowerCase().includes(nombre.toLowerCase());
      const coincideEstado = !estado || estado === 'TODOS' || 
        reserva.estadoReserva === estado;
      return coincidenNombre && coincideEstado;
    });
  }

  eliminarReservaPorObjeto(reserva: Reserva): void {
    this.reservaciones = this.reservaciones.filter(r => r !== reserva);
  }

  actualizarReservaPorObjeto(reservaOriginal: Reserva, reservaActualizada: Reserva): void {
    const index = this.reservaciones.indexOf(reservaOriginal);
    if (index !== -1) {
      this.reservaciones[index] = reservaActualizada;
    }
  }

  /**
   * Actualiza únicamente el estado de una reserva
   */
  actualizarEstadoReserva(reserva: Reserva, nuevoEstado: EstadoReserva): void {
    reserva.estadoReserva = nuevoEstado;
  }

  setReservaEnEdicion(reserva: Reserva | null): void {
    this.reservaEnEdicion = reserva;
  }

  getReservaEnEdicion(): Reserva | null {
    return this.reservaEnEdicion;
  }
}






