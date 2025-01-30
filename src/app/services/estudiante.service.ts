import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  URL: string = "http://localhost:8080/api/estudiantes";

  constructor(private http: HttpClient) { }


  create(estudiante: Estudiante): Observable<any> {
    return this.http.post<any>(this.URL, estudiante);
  }


  list(): Observable<any> {
    return this.http.get<any>(this.URL);
  }


  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }



  update(id: number, estudiante: Estudiante): Observable<any> {
    return this.http.put<any>(`${this.URL}/${id}`, estudiante);
  }


}
