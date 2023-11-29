import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email_login:string = '';
  password_login:string = '';

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


  login(){
    if(!this.email_login || !this.password_login){
      alert("NO PUEDES INGRESAR AL SISTEMA SINO LLENAS TODOS LOS CAMPOS");
      return;
    }
    this.authService.login(this.email_login,this.password_login).subscribe((resp:any) => {
      console.log(resp);
      
      
      if(resp){
        this.router.navigateByUrl('/home');
      }else{
        alert("LAS CREDENCIALES INGRESADAS SON INCORRECTAS");
      }
    })
  }
  

}
