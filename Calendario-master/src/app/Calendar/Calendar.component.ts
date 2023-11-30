import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Calendar',
  templateUrl: './Calendar.component.html',
  styleUrls: ['./Calendar.component.css']
})
export class CalendarComponent implements OnInit {

  modalRef?: BsModalRef;
  title: any;
  presentDays: number = 0;
  AbsentDays: number = 0;
  
  events: any = [
    {title:'Present', start: '2023-11-25', color: '#000ff'},
    {title:'Present', start: '2023-11-25', color: '#000ff'},
    {title:'Present', start: '2023-11-25', color: '#000ff'},
    {title:'Absent', date: '2023-11-26', color: '#008080'},
    {title:'Present', date: '2023-11-25', color: '#000ff'},
  ];

  
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

  constructor(private modalService: BsModalService){ }

  ngOnInit():void{
    this.events.forEach((e: { [x:string]: string})=>{
      if (e["title"]=='Present'){
        this.presentDays++;
      }else{
        this.AbsentDays++;
      }
    });
    console.log("Present " + this.presentDays);
    console.log("Absent " + this.AbsentDays)

  }
  handleDateClick(arg:any){
    console.log(arg);
    console.log(arg.event._def.title);
    this.start= arg.event.start;
    this.title= arg.event._def.title;
    this.modalRef = this.modalService.show(this.template, this.config);
  }
}
