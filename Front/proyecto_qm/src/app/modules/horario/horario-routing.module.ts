import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioComponent } from './horario.component';
import { ListarHorariosComponent } from './listar-horarios/listar-horarios.component';
import { CrearHorarioComponent } from './crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './editar-horario/editar-horario.component';
import { ListarDisponiblesComponent } from './listar-disponibles/listar-disponibles.component';

const routes: Routes = [{
  path: '',
  component: ListarHorariosComponent,
},
{
  path: 'listar',
  component:ListarDisponiblesComponent,
},
{
  path: 'crear-horario', 
  component: CrearHorarioComponent
},
{
  path: 'editar-horario/:id',
  component: EditarHorarioComponent
},
{ 
  path: '**', redirectTo: '', pathMatch: 'full' 
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }
