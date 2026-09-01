import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Reserva, EstadoReserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './form.component.css',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  reservaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService
  ) {
    this.reservaForm = this.fb.group({
      pacienteNombre: ['', [Validators.required]],

      // DPI guatemalteco: 13 dígitos
      dpi: ['', [
        Validators.required,
        Validators.pattern(/^\d{13}$/)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      // Teléfono: 8 dígitos
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],

      especialidad: ['', [Validators.required]],

      medico: ['', [Validators.required]],

      // No permite seleccionar una fecha anterior a hoy
      fecha: ['', [
        Validators.required,
        this.fechaNoAnteriorValidator
      ]],

      hora: ['', [Validators.required]],

      motivo: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]],

      primeraConsulta: [false]
    });
  }

  ngOnInit(): void {}

  /**
   * Valida que la fecha seleccionada no sea anterior a la fecha actual.
   */
  fechaNoAnteriorValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const fechaSeleccionada = new Date(control.value + 'T00:00:00');
    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada < hoy
      ? { fechaAnterior: true }
      : null;
  }

  /**
   * Registra una nueva reserva.
   */
  onSubmit(): void {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const nuevaReserva: Reserva = {
      ...this.reservaForm.value,
      estadoReserva: EstadoReserva.PROGRAMADA
    };

    this.reservaService.agregarReserva(nuevaReserva);

    console.log('Reserva guardada exitosamente');

    this.reservaForm.reset({
      primeraConsulta: false
    });
  }
}