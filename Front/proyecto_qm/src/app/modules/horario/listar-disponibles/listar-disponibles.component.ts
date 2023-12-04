import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from '../service/horario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-disponibles',
  templateUrl: './listar-disponibles.component.html',
  styleUrls: ['./listar-disponibles.component.css']
})
export class ListarDisponiblesComponent implements OnInit {
  listHorarios: Horario[] = [];
  fechaOrdenAscendente: boolean = true;
  user:any;
  usuario:string='';
  public horario: any;

  constructor(
    private _horarioService: HorarioService,
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
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

  reserva(data:any){
    this.user = this._authService.getUser();
    const HORARIO: Horario = {
      fecha: data.fecha,
      hora: data.hora,
      estado: 'Reservado',
      idUser: this.user.usuarioid
    }
    this._horarioService.editarHorario(data._id, HORARIO).subscribe(res => {
      this.toastr.info('El horario fue actualizado con exito!', 'Horario Actualizado!');
    })
  }
}
