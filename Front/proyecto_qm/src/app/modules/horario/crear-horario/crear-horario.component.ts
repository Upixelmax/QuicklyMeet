import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from '../service/horario.service';
import { Horario } from 'src/app/models/horario';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css'],
  providers: [DatePipe],
})

export class CrearHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  titulo = 'Crear horario';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _horarioService: HorarioService,
    private aRouter: ActivatedRoute,
    private datePipe: DatePipe) {
    this.horarioForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarHorario() {
    const fechaFormControl = this.horarioForm.get('fecha');

    if (fechaFormControl) {
      const fechaValor = fechaFormControl.value;
      const fechaFormateada = this.datePipe.transform(fechaValor, 'dd-MM-yyyy');

      if (fechaFormateada) {
        const HORARIO: Horario = {
          fecha: fechaFormateada,
          hora: this.horarioForm.get('hora')?.value,
          estado: this.horarioForm.get('estado')?.value,
          idUser:null
        };

        if (this.id !== null) {
          this._horarioService.editarHorario(this.id, HORARIO).subscribe(data => {
            this.toastr.info('El horario fue actualizado con éxito!', 'Horario Actualizado!');
            this.router.navigate(['/horario']);
          });
        } else {
          this._horarioService.guardarHorario(HORARIO).subscribe(data => {
            this.toastr.success('El horario fue registrado con éxito!', 'Horario Registrado!');
            this.router.navigate(['/horario']);
          }, error => {
            console.log(error);
            this.horarioForm.reset();
          });
        }
      } else {
        console.error('Error al formatear la fecha');
      }
    } else {
      console.error('Error al obtener el control del formulario para la fecha');
    }
  }

  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar horario';
      this._horarioService.obtenerHorario(this.id).subscribe(data => {
        this.horarioForm.setValue({
          fecha: data.fecha,
          hora: data.hora,
          estado: data.estado,
        })
      })
    }
  }

}