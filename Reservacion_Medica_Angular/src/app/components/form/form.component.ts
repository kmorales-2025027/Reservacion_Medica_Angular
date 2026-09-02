import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Reserva, EstadoReserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { EstadoReserva } from '../../models/reserva.model';

/**
 * Validador personalizado para asegurar que la fecha seleccionada no sea anterior al día actual.
 * @param control El control de formulario que contiene la fecha.
 * @returns ValidationErrors si la fecha es pasada, o null si es válida.
 */
export function fechaFuturaValidator(control: AbstractControl): ValidationErrors | null {
  const fechaSeleccionada = new Date(control.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Normalizar hoy a medianoche para comparar solo fechas
  return fechaSeleccionada < hoy ? { fechaPasada: true } : null;
}

/**
 * Validador personalizado para asegurar que la fecha seleccionada no sea anterior al día actual.
 * @param control El control de formulario que contiene la fecha.
 * @returns ValidationErrors si la fecha es pasada, o null si es válida.
 */
export function fechaFuturaValidator(control: AbstractControl): ValidationErrors | null {
  const fechaSeleccionada = new Date(control.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Normalizar hoy a medianoche para comparar solo fechas
  return fechaSeleccionada < hoy ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './form.component.css',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  reservaForm: FormGroup;
  private reservaOriginal: Reserva | null = null;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService
  ) {
    // Inicialización del formulario con validaciones basadas en los requerimientos de la interfaz Reserva
    this.reservaForm = this.fb.group({
      pacienteNombre: ['', [Validators.required, Validators.minLength(5)]], // Obligatorio, min 5 caracteres
      dpi: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]], // Obligatorio, exactamente 13 dígitos
      email: ['', [Validators.email]], // Opcional, pero debe tener formato de email si se llena
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Obligatorio, exactamente 8 dígitos
      especialidad: ['', [Validators.required]], // Obligatorio
      medico: ['', [Validators.required]], // Obligatorio
      fecha: ['', [Validators.required, fechaFuturaValidator]], // Obligatorio y debe ser hoy o futuro
      hora: ['', [Validators.required]], // Obligatorio
      motivo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]], // Obligatorio, entre 10 y 200 caracteres
      primeraConsulta: [false], // Booleano, valor por defecto false
      estadoReserva: [EstadoReserva.PROGRAMADA] // Campo de estado con valor inicial 'PROGRAMADA'
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

  /**
   * Maneja el envío del formulario.
   * Valida la integridad de los datos, verifica disponibilidad y gestiona la persistencia.
   */
  onSubmit(): void {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      console.error("El formulario contiene errores. Por favor, corríjalos antes de enviar.");
      return;
    }
    const formValues = this.reservaForm.value;

    if (this.reservaService.verificarChoqueHorario(formValues.fecha, formValues.hora, this.reservaOriginal)) {
      alert("La fecha y hora seleccionadas ya están reservadas. Por favor, elija otro horario.");
      return;
    }

    if (this.reservaOriginal) {
      const reservaActualizada: Reserva = {
        ...this.reservaOriginal,
        ...formValues
      };
      this.reservaService.actualizarReservaPorObjeto(this.reservaOriginal, reservaActualizada);
      console.log("Reserva actualizada exitosamente:");
      this.reservaService.setReservaEnEdicion(null);
      this.reservaOriginal = null;
    } else {
      const nuevaReserva: Reserva = {
        ...formValues,
        estadoReserva: EstadoReserva.PROGRAMADA
      };
      this.reservaService.agregarReserva(nuevaReserva);
      console.log("Reserva guardada exitosamente:");
    }

    this.reservaForm.reset({
      primeraConsulta: false,
      estadoReserva: EstadoReserva.PROGRAMADA
    });
  }
}

