import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { HorarioComponent } from './horario.component';
import { ListarHorariosComponent } from './listar-horarios/listar-horarios.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearHorarioComponent } from './crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './editar-horario/editar-horario.component';


@NgModule({
  declarations: [
    HorarioComponent,
    ListarHorariosComponent,
    CrearHorarioComponent,
    EditarHorarioComponent
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    SharedModule,
    
    
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    HorarioComponent,
    ListarHorariosComponent
  ]
  
})
export class HorarioModule { }
