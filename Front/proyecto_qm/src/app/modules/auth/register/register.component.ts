import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email_register:string = '';
  password_register:string = '';
  password_confirmation:string = '';
  name_register:string = '';
  surname_register:string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  register(){
    if(!this.email_register || !this.password_register || !this.password_confirmation || !this.name_register
      || !this.surname_register){
      alert("NO PUEDES REGISTRAR UN USUARIO SINO LLENAS TODOS LOS CAMPOS");
      return;
    }

    if(this.password_register != this.password_confirmation){
      alert("LAS CONTRASEÑAS NO SON IGUALES");
      return;
    }

    let data = {
      email: this.email_register,
      password: this.password_register,
      name: this.name_register,
      surname:this.surname_register,
      rol: 'cliente',
    }

    this.authService.register(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        alert(resp.message_text);
      }else{
        this.email_register = '';
        this.password_register = '';
        this.name_register = '';
        this.surname_register = '';
        this.password_confirmation = '';
        alert("EL USUARIO SE CREO CORRECTAMENTE");
        this.router.navigateByUrl('/auth/login');
      }
    })
  }

}
