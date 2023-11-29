import { Component } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from '../service/horario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-horarios',
  templateUrl: './listar-horarios.component.html',
  styleUrls: ['./listar-horarios.component.css']
})
export class ListarHorariosComponent {
  listHorarios: Horario[] = [];
  
  constructor(
    private _horarioService: HorarioService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.obtenerHorarios();
  }


  obtenerHorarios() {
    this._horarioService.getHorarios().subscribe(data => {
      console.log(data);
      this.listHorarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarHorario(id: any) {
    this._horarioService.eliminarHorario(id).subscribe(data => {
      this.toastr.error('El horario fue eliminado con exito' ,'Horario Eliminado');
      this.obtenerHorarios();
    }, error => {
      console.log(error);
    })
  }

}
