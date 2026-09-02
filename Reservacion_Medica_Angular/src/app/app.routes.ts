import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { Listado } from './components/listado/listado.component';

export const routes: Routes = [
  {
    path: 'formulario',
    component: FormComponent
  },
  {
    path: 'listado',
    component: Listado
  },
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  }
];
