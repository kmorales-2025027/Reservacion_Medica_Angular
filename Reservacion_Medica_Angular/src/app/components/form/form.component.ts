import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { EstadoReserva } from '../../models/reserva.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], 
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class FormComponent implements OnInit {
  reservaForm: FormGroup;
  private reservaOriginal: Reserva | null = null;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService 
  ) {
    this.reservaForm = this.fb.group({
      pacienteNombre: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      primeraConsulta: [false]
    });
  }

  ngOnInit(): void {
    // Comprobamos si hay una reserva marcada para edición en el servicio
    const reservaParaEditar = this.reservaService.getReservaEnEdicion();
    if (reservaParaEditar) {
      this.reservaOriginal = reservaParaEditar;
      // Cargamos los datos de la reserva en el formulario
      this.reservaForm.patchValue(reservaParaEditar);
      console.log('Formulario cargado en modo edición para:', reservaParaEditar.pacienteNombre);
    }
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const datosFormulario: Reserva = this.reservaForm.value;

      if (this.reservaOriginal) {
        // MODO EDICIÓN: Actualizamos la reserva existente conservando su estado original
        const reservaActualizada: Reserva = {
          ...datosFormulario,
          estadoReserva: this.reservaOriginal.estadoReserva
        };
        
        this.reservaService.actualizarReservaPorObjeto(this.reservaOriginal, reservaActualizada);
        console.log('Reserva actualizada exitosamente');
      } else {
        // MODO CREACIÓN: Creamos una nueva reserva con estado PROGRAMADA
        const nuevaReserva: Reserva = {
          ...datosFormulario,
          estadoReserva: EstadoReserva.PROGRAMADA
        };
        
        this.reservaService.agregarReserva(nuevaReserva);
        console.log('Nueva reserva guardada exitosamente');
      }

      // Limpiamos el estado de edición en el servicio y reiniciamos el formulario
      this.reservaService.setReservaEnEdicion(null);
      this.reservaOriginal = null;
      this.reservaForm.reset({
        primeraConsulta: false
      });
    } else {
      console.error('El formulario contiene errores de validación');
    }
  }
}

