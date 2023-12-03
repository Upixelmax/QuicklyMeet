import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from '../service/horario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-horarios',
  templateUrl: './listar-horarios.component.html',
  styleUrls: ['./listar-horarios.component.css']
})
export class ListarHorariosComponent implements OnInit {
  listHorarios: Horario[] = [];
  fechaOrdenAscendente: boolean = true;

  constructor(
    private _horarioService: HorarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerHorarios();
    this.ordenarPorFecha(); // Llamada inicial al ordenar por fecha
  }

  obtenerHorarios() {
    this._horarioService.getHorarios().subscribe(data => {
      this.listHorarios = data;
    }, error => {
      console.log(error);
    });
  }

  // Función para mostrar la confirmación antes de eliminar un horario
  confirmarEliminarHorario(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este horario?');

    if (confirmacion) {
      this.eliminarHorario(id);
    }
  }

  eliminarHorario(id: any) {
    this._horarioService.eliminarHorario(id).subscribe(data => {
      this.toastr.error('El horario fue eliminado con éxito', 'Horario Eliminado');
      this.obtenerHorarios();
    }, error => {
      console.log(error);
    });
  }

  ordenarPorFecha() {
    this.listHorarios.sort((a, b) => {
      const fechaA = this.convertirStringAFecha(a.fecha);
      const fechaB = this.convertirStringAFecha(b.fecha);
  
      return this.fechaOrdenAscendente ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
    });
  }
  
  convertirStringAFecha(fechaString: string): Date {
    const [dia, mes, anio] = fechaString.split('-').map(Number);
    return new Date(anio, mes - 1, dia); // Restamos 1 al mes ya que en JavaScript los meses son 0-indexados
  }

  alternarOrdenFecha() {
    this.fechaOrdenAscendente = !this.fechaOrdenAscendente;
    this.ordenarPorFecha();
  }
}
