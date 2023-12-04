import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { HorarioService } from '../horario/service/horario.service';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home-solicitante',
  templateUrl: './home-solicitante.component.html',
  styleUrls: ['./home-solicitante.component.css']
})
export class HomeSolicitanteComponent implements OnInit {
  modalRef?: BsModalRef;
  title: any;
  presentDays = 0;
  absentDays = 0;
  user: any;
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    editable: false,
  };
  config = {
    animated: true
  };
  @ViewChild('template') template!: string;
  startDate: any;

  constructor(
    private modalService: BsModalService,
    private horarioService: HorarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.user = this.authService.getUser();
    console.log(this.user.email);

    this.horarioService.getHorarios().subscribe(
      (horarios: any) => {
        // Filtrar eventos por estado 'Disponible'
        this.events = horarios
          .filter((evento: any) => evento.estado === 'Disponible')
          .map((evento: any) => ({
            title: evento.estado,
            start: moment(evento.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            color: this.getColorForEstado(evento.estado),
          }));

        console.log(this.events);
        this.actualizarEstadisticas();
        this.updateCalendarOptions();
      },
      (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    );
  }

  getColorForEstado(estado: string): string {
    return estado === 'Disponible' ? '#069606' : (estado === 'Reservado' ? '#b50909' : '#000000');
  }

  handleDateClick(arg: any) {
    console.log(arg);
    console.log(this.events);
    console.log(arg.event._def.title);
    this.startDate = arg.event.start;
    this.title = arg.event._def.title;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  private actualizarEstadisticas() {
    this.presentDays = this.events.filter((e: any) => e.title === 'Evento').length;
    this.absentDays = this.events.length - this.presentDays;
    console.log("Present " + this.presentDays);
    console.log("Absent " + this.absentDays);
  }

  private updateCalendarOptions() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: this.events,
      editable: false,
    };
  }
}
