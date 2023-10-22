import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarHorariosComponent } from './components/listar-horarios/listar-horarios.component';
import { CrearHorarioComponent } from './components/crear-horario/crear-horario.component';

const routes: Routes = [
  {path: '', component: ListarHorariosComponent },
  {path: 'crear-horario', component: CrearHorarioComponent},
  {path: 'editar-horario/:id', component: CrearHorarioComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
