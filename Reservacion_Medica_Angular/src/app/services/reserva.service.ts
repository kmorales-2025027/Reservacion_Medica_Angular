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
   * Verifica si existe una cita en la misma fecha y hora
   * @param fecha Fecha a verificar
   * @param hora Hora a verificar
   * @returns true si hay un choque, false si está disponible
   */
  verificarChoqueHorario(fecha: string, hora: string, reservaExcluida?: Reserva | null): boolean {
    return this.reservaciones.some(reserva =>
      reserva.fecha === fecha && reserva.hora === hora && reserva !== reservaExcluida
    );
  }

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
