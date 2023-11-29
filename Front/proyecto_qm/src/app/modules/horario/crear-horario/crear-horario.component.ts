import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from '../service/horario.service';
import { Horario } from 'src/app/models/horario';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})

export class CrearHorarioComponent implements OnInit{
  horarioForm: FormGroup;
  titulo = 'Crear horario';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _horarioService: HorarioService,
              private aRouter: ActivatedRoute) { 
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

    const HORARIO: Horario = {
      fecha: this.horarioForm.get('fecha')?.value,
      hora: this.horarioForm.get('hora')?.value,
      estado: this.horarioForm.get('estado')?.value,
    }

    if(this.id != null){
      this._horarioService.editarHorario(this.id, HORARIO).subscribe(data => {
        this.toastr.info('El horario fue actualizado con exito!', 'Horario Actualizado!');
        this.router.navigate(['/horario']);
      })

    }else{
      console.log(HORARIO);
      this._horarioService.guardarHorario(HORARIO).subscribe(data => {
        this.toastr.success('El horario fue registrado con exito!', 'Horario Registrado!');
        this.router.navigate(['/horario']);
      }, error => {
        console.log(error);
        this.horarioForm.reset();
      }) 
    }
  }

  esEditar() {

    if(this.id !== null) {
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