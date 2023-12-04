import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from '../service/horario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-reservados',
  templateUrl: './listar-reservados.component.html',
  styleUrls: ['./listar-reservados.component.css']
})
export class ListarReservadosComponent implements OnInit {
  listHorarios: Horario[] = [];
  fechaOrdenAscendente: boolean = true;
  user: any;
  usuario: string = '';
  public horario: any;

  constructor(
    private _horarioService: HorarioService,
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.obtenerHorarios();
    this.ordenarPorFecha();
  }

 
   
  obtenerHorarios() {
    this._horarioService.getHorarios().subscribe((data: Horario[]) => {
      // Filtra los horarios reservados por el usuario actual
      this.listHorarios = data.filter(horario => horario.estado === 'Reservado' && horario.idUser === this.user.usuarioid);
    }, error => {
      console.log(error);
    });
  }

  // Función para mostrar la confirmación antes de reservar un horario
  confirmarReserva(horario: any) {
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar esta reserva?`);

    if (confirmacion) {
      this.reserva(horario);
    }
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

  
  reserva(data: any) {
    this.user = this._authService.getUser();
    const HORARIO: Horario = {
      fecha: data.fecha,
      hora: data.hora,
      estado: 'Disponible',
      idUser: null
    }
    this._horarioService.editarHorario(data._id, HORARIO).subscribe(res => {
      this.toastr.info('Se ha eliminado la reserva', 'Horario Actualizado!');
      this.router.navigate(['/home-solicitante']);
    })
  }
}