import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

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
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class FormComponent implements OnInit {
  // Grupo de controles que representa el formulario de reservación
  reservaForm: FormGroup;

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
      primeraConsulta: [false] // Booleano, valor por defecto false
    });
  }

  ngOnInit(): void {}

  /**
   * Maneja el envío del formulario. 
   * Valida la integridad de los datos, añade el estado inicial y gestiona la persistencia.
   */
  onSubmit(): void {
    if (this.reservaForm.valid) {
      // Extracción de los valores actuales del formulario
      const formValues = this.reservaForm.value;

      // Creación de un nuevo objeto que combina los datos del formulario con el estado inicial 'Programada'
      const reservaConEstado = {
        ...formValues,
        estado: 'Programada'
      };

      // Verificación de choques de horario antes de guardar la reserva
      if (this.reservaService.verificarChoqueHorario(reservaConEstado.fecha, reservaConEstado.hora)) {
        alert('La fecha y hora seleccionadas ya están reservadas. Por favor, elija otro horario.');
        return; // Detiene la ejecución para evitar que se guarde la reserva
      }

      // Persistencia de la reserva en el servicio
      this.reservaService.agregarReserva(reservaConEstado as any);
      console.log('Reserva guardada exitosamente con estado Programada');
      
      // Limpieza del formulario devolviéndolo a su estado original
      this.reservaForm.reset({
        primeraConsulta: false
      });
    } else {
      console.error('El formulario contiene errores de validación');
    }
  }
}
