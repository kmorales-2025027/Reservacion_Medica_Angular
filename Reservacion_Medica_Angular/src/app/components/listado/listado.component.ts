import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva, EstadoReserva } from '../../models/reserva.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './listado.css',
  templateUrl: './listado.html',
})
export class Listado implements OnInit {
  reservas: Reserva[] = [];
  filtroNombre: string = '';
  filtroEstado: EstadoReserva | 'TODOS' = 'TODOS';

  // Definimos los estados disponibles basándonos en el Enum para usarlos en el HTML
  estadosDisponibles = Object.values(EstadoReserva);

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservas = this.reservaService.obtenerReservaciones();
  }

  onFilterChange(): void {
    this.reservas = this.reservaService.filtrarReservas(this.filtroNombre, this.filtroEstado);
  }
}




