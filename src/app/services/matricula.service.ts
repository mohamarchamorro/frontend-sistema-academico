import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';
import { Estudiante } from '../models/estudiante';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {


  URL: string = "http://localhost:8080/api/matriculas";
  soapEndpoint = 'http://localhost:8080/ws';

  constructor(private http: HttpClient) { }



  enroll(idEstudiante: number, idMateria: number): Observable<any> {
    return this.http.post<any>(`${this.URL}/${idEstudiante}/${idMateria}`,null);
  }

  
  unEnroll(idEstudiante: number, idMateria: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${idEstudiante}/${idMateria}`);
  }


  getMateriasByEstudiante(id:number){
    
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://fasttrack.com/web-services-soap">
         <soapenv:Header/>
         <soapenv:Body>
            <web:getMateriasByEstudianteRequest>
              <web:idEstudiante>${id}</web:idEstudiante>
              </web:getMateriasByEstudianteRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml',
    });

    return this.http.post(this.soapEndpoint, soapBody, {
      headers,
      responseType: 'text', 
    });
  }


  
  getEstudiantesByMateria(nombre:string){
    
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://fasttrack.com/web-services-soap">
         <soapenv:Header/>
         <soapenv:Body>
            <web:getEstudiantesByMateriaRequest>
              <web:nombreMateria>${nombre}</web:nombreMateria>
              </web:getEstudiantesByMateriaRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml',
    });

    return this.http.post(this.soapEndpoint, soapBody, {
      headers,
      responseType: 'text', 
    });
  }



  getMatriculas() {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://fasttrack.com/web-services-soap">
         <soapenv:Header/>
         <soapenv:Body>
            <web:getAllMatriculasRequest/>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml',
    });

    return this.http.post(this.soapEndpoint, soapBody, {
      headers,
      responseType: 'text', // Aqui especifico que se espera un texto como respuesta
    });
}


parseXml(xmlStr: string): Document {
  return new DOMParser().parseFromString(xmlStr, 'text/xml');
}

parseXmlToMatriculas(xml: Document): Matricula[] {
  const matriculasXml = xml.getElementsByTagName('ns2:matriculas');
  const matriculas: Matricula[] = [];

  for (let i = 0; i < matriculasXml.length; i++) {
    const matriculaXml = matriculasXml[i];
    
    const estudianteXml = matriculaXml.getElementsByTagName('ns2:estudiante')[0];
    const materiaXml = matriculaXml.getElementsByTagName('ns2:materia')[0];
    
    const estudiante: Estudiante = {
      id: Number(estudianteXml.getElementsByTagName('ns2:id')[0].textContent),
      primer_nombre: estudianteXml.getElementsByTagName('ns2:primerNombre')[0].textContent || '',
      primer_apellido: estudianteXml.getElementsByTagName('ns2:primerApellido')[0].textContent || '',
      id_pais: Number(estudianteXml.getElementsByTagName('ns2:idPais')[0].textContent),
      correo_electronico: estudianteXml.getElementsByTagName('ns2:correoElectronico')[0].textContent || '',
    };

    const materia: Materia = {
      id: Number(materiaXml.getElementsByTagName('ns2:id')[0].textContent),
      nombre: materiaXml.getElementsByTagName('ns2:nombre')[0].textContent || '',
    };

    matriculas.push({ estudiante, materia });
  }

  return matriculas;
}

}
