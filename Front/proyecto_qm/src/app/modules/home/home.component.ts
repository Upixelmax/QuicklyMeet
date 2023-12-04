import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HorarioService } from '../horario/service/horario.service';
import * as moment from 'moment';  
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  modalRef?: BsModalRef;
  title: any;
  presentDays: number = 0;
  absentDays: number = 0;
  user:any;
  
  events: any = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.handleDateClick.bind(this),
  };

  config = {
    animated: true
  };
  
  @ViewChild('template') template!: string;
  start: any;

  constructor(
    private modalService: BsModalService,
    private _horarioService: HorarioService,
    private _AuthService:AuthService
  ) { }

  ngOnInit(): void {
    console.log(this._AuthService.getUser());
    this.user = this._AuthService.getUser();

    this._horarioService.getHorarios().subscribe(
      (horarios: any) => {
        this.events = horarios.map((evento: any) => ({
          title: evento.estado,
          start: moment(evento.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'),
          color: this.getColorForEstado(evento.estado),
        }));
        console.log(this.events);
        this.actualizarEstadisticas();
  
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin],
          events: this.events,
          eventClick: this.handleDateClick.bind(this),
        };
      },
      (error: any) => {
        console.error('Error al obtener los horarios:', error);
      }
    );
  }
  
  handleDateClick(arg: any) {
    console.log(arg);
    console.log(this.events);
    console.log(arg.event._def.title);
    this.start = arg.event.start;
    this.title = arg.event._def.title;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  private actualizarEstadisticas() {
    this.presentDays = this.events.filter((e: any) => e.title === 'Evento').length;
    this.absentDays = this.events.length - this.presentDays;
    console.log("Present " + this.presentDays);
    console.log("Absent " + this.absentDays);
  }

  private getColorForEstado(estado: string): string {
    return estado === 'Disponible' ? '#069606' : (estado === 'Reservado' ? '#b50909' : '#000000');
  }
  
}
