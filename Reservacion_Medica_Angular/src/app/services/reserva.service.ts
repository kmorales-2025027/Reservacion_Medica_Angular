import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Reserva, EstadoReserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaciones: Reserva[] = [];
  private storageKey = 'reservaciones_medicas';
  private reservaEnEdicion: Reserva | null = null;
  private esNavegador: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.esNavegador = isPlatformBrowser(this.platformId);
    this.cargarDesdeStorage();
  }

  private cargarDesdeStorage(): void {
    if (!this.esNavegador) return; // Si estamos en el servidor, no hacemos nada

    const datos = localStorage.getItem(this.storageKey);
    if (datos) {
      try {
        this.reservaciones = JSON.parse(datos);
      } catch (e) {
        console.error('Error al parsear las reservas del localStorage', e);
        this.reservaciones = [];
      }
    }
  }

  private guardarEnStorage(): void {
    if (!this.esNavegador) return; // Si estamos en el servidor, no guardamos

    localStorage.setItem(this.storageKey, JSON.stringify(this.reservaciones));
  }

  verificarChoqueHorario(fecha: string, hora: string, reservaExcluida?: Reserva | null): boolean {
    return this.reservaciones.some(reserva =>
      reserva.fecha === fecha && reserva.hora === hora && reserva !== reservaExcluida
    );
  }

  /**
   * Agrega una nueva reservación al arreglo en localStorage
   * @param reserva Objeto de tipo Reserva con los datos del formulario
   */
  agregarReserva(reserva: Reserva): void {
    this.reservaciones.push(reserva);
    this.guardarEnStorage();
  }

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

  eliminarReservaPorObjeto(reserva: Reserva): void {
    this.reservaciones = this.reservaciones.filter(r => r !== reserva);
    this.guardarEnStorage();
  }

  actualizarReservaPorObjeto(reservaOriginal: Reserva, reservaActualizada: Reserva): void {
    const index = this.reservaciones.indexOf(reservaOriginal);
    if (index !== -1) {
      this.reservaciones[index] = reservaActualizada;
      this.guardarEnStorage();
    }
  }

  /**
   * Actualiza únicamente el estado de una reserva
   */
  actualizarEstadoReserva(reserva: Reserva, nuevoEstado: EstadoReserva): void {
    reserva.estadoReserva = nuevoEstado;
    this.guardarEnStorage();
  }

  setReservaEnEdicion(reserva: Reserva | null): void {
    this.reservaEnEdicion = reserva;
  }

  getReservaEnEdicion(): Reserva | null {
    return this.reservaEnEdicion;
  }
}