import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  
    URL:string = "http://localhost:8080/api/paises";
  
    constructor(private http:HttpClient) { }
  
  
  
    list(): Observable<any>{
      return this.http.get<any>(this.URL);
    }
  
    getById(id:number): Observable<any>{
      return this.http.get<any>(`${this.URL}/${id}`)
    }


}
