import { Injectable } from '@angular/core';
import { Reserva, EstadoReserva } from '../models/reserva.model';

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

  /**
   * Filtra las reservaciones por el nombre del paciente y/o estado
   * @param nombre Nombre o parte del nombre del paciente a buscar
   * @param estado Estado de la reserva para filtrar
   * @returns Arreglo de reservaciones filtradas
   */
  filtrarReservas(nombre: string, estado: EstadoReserva | 'TODOS'): Reserva[] {
    return this.reservaciones.filter(reserva => {
      const coincidenNombre = !nombre || nombre.trim() === '' || 
        reserva.pacienteNombre.toLowerCase().includes(nombre.toLowerCase());
      
      const coincideEstado = !estado || estado === 'TODOS' || 
        reserva.estadoReserva === estado;
        
      return coincidenNombre && coincideEstado;
    });
  }
}



