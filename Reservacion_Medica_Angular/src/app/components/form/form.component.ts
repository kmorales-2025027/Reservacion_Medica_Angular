import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Necesario para que Angular reconozca [formGroup] y formControlName en el HTML
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class FormComponent implements OnInit {
  // FormGroup es el contenedor principal que agrupa todos los controles del formulario
  reservaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // FormBuilder es un servicio que simplifica la creación de grupos de controles
    this.reservaForm = this.fb.group({
      // Cada campo es un FormControl: [valorInicial, [validadores]]
      pacienteNombre: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      primeraConsulta: [false] // Checkbox: valor booleano inicial
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reservaForm.valid) {
      // Extraemos los valores del formulario y los asignamos a nuestra interfaz Reserva
      const nuevaReserva: Reserva = this.reservaForm.value;
      console.log('Nueva Reserva:', nuevaReserva);

      // Para hacer esto funcional, aquí llamaríamos a un servicio que guarde en el arreglo
    }
  }
}
