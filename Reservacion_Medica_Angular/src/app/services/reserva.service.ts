import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // Arreglo en memoria para almacenar las reservaciones
  private reservaciones: Reserva[] = [];

  constructor() {}

  /**
   * Agrega una nueva reservación al arreglo en memoria
   * @param reserva Objeto de tipo Reserva con los datos del formulario
   */
  agregarReserva(reserva: Reserva): void {
    this.reservaciones.push(reserva);
    console.log('Registros actuales en memoria:', this.reservaciones);
  }

  /**
   * Retorna la lista completa de reservaciones
   * @returns Arreglo de reservaciones
   */
  obtenerReservaciones(): Reserva[] {
    return this.reservaciones;
  }
}
