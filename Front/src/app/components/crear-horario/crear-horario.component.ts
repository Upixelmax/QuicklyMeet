import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Horario } from 'src/app/models/horario';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent  implements OnInit{
  horarioForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService){
    this.horarioForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarHorario(){
    const HORARIO: Horario = {
      fecha: this.horarioForm.get('fecha')?.value,
      hora: this.horarioForm.get('hora')?.value,
      estado: this.horarioForm.get('estado')?.value,
    }

    console.log(HORARIO);
    this.toastr.success('El horario fue registrado con exito!', 'Horario Registrado!');
    this.router.navigate(['/']);
  }
}
