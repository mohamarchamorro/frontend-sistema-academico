import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Matricula } from '../../models/matricula';

@Component({
  selector: 'app-estudiantes-por-materia',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './estudiantes-por-materia.component.html'
})
export class EstudiantesPorMateriaComponent implements OnInit{
  matriculas: Matricula[] = [];
  nombre: string | undefined;

  constructor(private matriculaService:MatriculaService, private parametros: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    
    this.parametros.paramMap.subscribe(params => {
      
      this.nombre = this.parametros.snapshot.params['nombre'];
      if(this.nombre != null && this.nombre != undefined && this.nombre!=""){
        this.loadEstudiantesByMateria(this.nombre);
      }else{
        this.loadMatriculas();
      }
    });


    
  }

  loadMatriculas(): void{
    
    this.matriculaService.getMatriculas().subscribe({
      next: (response) =>{
                
        const xmlDoc = this.matriculaService.parseXml(response);
        this.matriculas = this.matriculaService.parseXmlToMatriculas(xmlDoc); 
        //console.log('Lista de Matrículas:', this.matriculas);
      }
    })
  }




  loadEstudiantesByMateria(nombre:string){
    
    this.matriculaService.getEstudiantesByMateria(nombre).subscribe({
      next: (response) =>{
                
        const xmlDoc = this.matriculaService.parseXml(response);
        this.matriculas = this.matriculaService.parseXmlToMatriculas(xmlDoc); 
      }
    })
  }

  onSubmit(ngForm: NgForm):void{
    
    if (this.nombre != null && this.nombre != undefined && this.nombre!="") {
      this.router.navigate(['/estudiantes-por-materia', this.nombre]);
    } else {
      this.router.navigate(['/estudiantes-por-materia']);
    }

  }

  

}
