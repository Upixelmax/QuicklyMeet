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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ListarDisponiblesComponent } from './listar-disponibles/listar-disponibles.component';
import { ListarReservadosComponent } from './listar-reservados/listar-reservados.component';


@NgModule({
  declarations: [
    HorarioComponent,
    ListarHorariosComponent,
    CrearHorarioComponent,
    EditarHorarioComponent,
    ListarDisponiblesComponent,
    ListarReservadosComponent
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' }
  ],
  bootstrap: [
    HorarioComponent,
    ListarHorariosComponent
  ]
  
})
export class HorarioModule { }
