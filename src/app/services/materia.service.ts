import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Materia } from "../models/materia";


@Injectable({
    providedIn: "root"
})
export class MateriaService{

    URL:string = "http://localhost:8080/api/materias";
    
    constructor(private http:HttpClient) { }



    create(materia: Materia): Observable<any>{
        return this.http.post<any>(this.URL,materia);
    }


    list(): Observable<any>{
        return this.http.get<any>(this.URL);
    }

    search(idEstudiante:number): Observable<any>{
        return this.http.get<any>(`${this.URL}/search/${idEstudiante}`)
    }

    get(id:number): Observable<any>{
        return this.http.get<any>(`${this.URL}/${id}`)
    }


    delete(id:number): Observable<any>{
        return this.http.delete<any>(`${this.URL}/${id}`)
    }


    update(id:number,materia:Materia): Observable<any>{
        return this.http.put<any>(`${this.URL}/${id}`,materia)
    }


}