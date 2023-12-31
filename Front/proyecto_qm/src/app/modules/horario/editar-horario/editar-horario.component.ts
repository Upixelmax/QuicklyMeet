import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from '../service/horario.service';
import { Horario } from 'src/app/models/horario';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css']
})
export class EditarHorarioComponent {
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

  editarHorario(){
    const HORARIO: Horario = {
      fecha: this.horarioForm.get('fecha')?.value,
      hora: this.horarioForm.get('hora')?.value,
      estado: this.horarioForm.get('estado')?.value,
      idUser: null
    }

    if(this.id != null){
      this._horarioService.editarHorario(this.id, HORARIO).subscribe(data => {
        this.toastr.info('El horario fue actualizado con exito!', 'Horario Actualizado!');
        this.router.navigate(['/horario']);
      })
    }
  }

}
