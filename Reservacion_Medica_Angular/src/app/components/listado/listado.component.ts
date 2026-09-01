import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { Reserva, EstadoReserva } from '../../models/reserva.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './listado.component.css',
  templateUrl: './listado.component.html',
})
export class Listado implements OnInit {
  reservas: Reserva[] = [];
  filtroNombre: string = '';
  filtroEstado: EstadoReserva | 'TODOS' = 'TODOS';

  estadosDisponibles = Object.values(EstadoReserva);

  constructor(private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservas = this.reservaService.obtenerReservaciones();
  }

  onFilterChange(): void {
    this.reservas = this.reservaService.filtrarReservas(this.filtroNombre, this.filtroEstado);
  }

  eliminarReserva(reserva: Reserva): void {
    if (confirm('¿Está seguro de que desea eliminar esta reserva?')) {
      this.reservaService.eliminarReservaPorObjeto(reserva);
      this.onFilterChange();
    }
  }

  editarReserva(reserva: Reserva): void {
    this.reservaService.setReservaEnEdicion(reserva);
    this.router.navigate(['/formulario']);
  }

  cambiarEstado(reserva: Reserva, nuevoEstado: string): void {
    this.reservaService.actualizarEstadoReserva(reserva, nuevoEstado as EstadoReserva);
    this.onFilterChange();
  }

  cancelarReserva(reserva: Reserva): void {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
      this.reservaService.actualizarEstadoReserva(reserva, EstadoReserva.CANCELADA);
      this.onFilterChange();
    }
  }
}






