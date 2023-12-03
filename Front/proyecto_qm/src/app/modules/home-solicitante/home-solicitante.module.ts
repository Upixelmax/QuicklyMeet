import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

import { FullCalendarModule } from '@fullcalendar/angular';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,///THIS

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class HomeSolicitanteModule { }
