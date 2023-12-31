import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from 'src/app/models/horario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  url = 'http://localhost:3000/api/horario/';
  urlreserva = 'http://localhost:3000/api/horario/reservar';

  constructor(private http: HttpClient) { }

  getHorarios(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarHorario(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarHorario(horario: Horario): Observable<any> {
    console.log(this.url+horario);
    return this.http.post(this.url, horario);
  }

  obtenerHorario(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarHorario(id: string, horario: Horario): Observable<any> {
    console.log(horario);
    return this.http.put(this.url + id, horario);
  } 

  
}
