import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  login(email: string, password: string): Observable<any> {
    let URL = URL_SERVICIOS + "/users/login_tienda";
  
    return this.http.post(URL, { email: email, password: password }).pipe(
      map((auth: any) => {
        console.log("Usuario autenticado con rol:", auth.USER.user.rol);
  
        const result = this.savelocalStorage(auth);
        
        // Devolver un objeto que contenga el resultado y el rol
        return { result: result, rol: auth.USER.user.rol };
      }),
      catchError((err: any) => {
        console.error('Error al autenticar:', err);
        return of(undefined);
      })
    );
  }

  savelocalStorage(auth:any){
    if(auth && auth.USER.token){
      localStorage.setItem("token",auth.USER.token);
      localStorage.setItem("user",JSON.stringify(auth.USER.user));
      return true;
    }
    return false;
  }

  register(data:any){
    let URL = URL_SERVICIOS+"/users/register";
    return this.http.post(URL,data);
  }
}
