import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { CommonModule } from '@angular/common';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-estudiante',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './crear-estudiante.component.html'
})
export class CrearEstudianteComponent implements OnInit{
  errores: any = [];

  estudiante: Estudiante = new Estudiante();
  paises: Pais[] = [];
  
  constructor(private estudianteService:EstudianteService, 
    private paisService: PaisService,
    private router:Router){}


  ngOnInit(): void {
    this.getPaises();
  }


  onSubmit(form: NgForm){
    if(form.valid){
      this.estudianteService.create(this.estudiante).subscribe({
        next: (response) =>{
          this.router.navigate(['/estudiantes']);
          Swal.fire('¡Exitoso!','Estudiante creado con éxito','success');
        },
        error: (err)=>{
          this.errores = err.error;
        }
      })
    }
  }

  getPaises(){
    this.paisService.list().subscribe({
      next: (response) =>{
        this.paises = response;
      }
    })
  }

}
