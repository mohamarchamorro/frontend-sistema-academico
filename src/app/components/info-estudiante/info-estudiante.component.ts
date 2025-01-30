import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais';
import Swal from 'sweetalert2';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-info-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info-estudiante.component.html'
})
export class InfoEstudianteComponent implements OnInit {

  id: number | undefined;
  estudiante: Estudiante = new Estudiante();
  errores: any = []
  paises: Pais[] = [];
  materiasMatriculadas: Materia[] = [];
  materias: Materia[] = [];
  id_materia_matricular: number | undefined;

  constructor(private parametros: ActivatedRoute,
    private router: Router, private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private matriculaService: MatriculaService,
    private paisService: PaisService
  ) { }



  ngOnInit(): void {
    this.id = this.parametros.snapshot.params['id'];
    this.loadInfo();
  }

  loadInfo(): void {

    this.getEstudiante();
    this.getPaises();
    this.getMateriasMatriculadas();
    this.getMaterias();
  }



  getMaterias(): void{
    this.materiaService.list().subscribe({
      next: (response) =>{
        this.materias = response;
      }
    })
  }



  getEstudiante() {
    this.estudianteService.get(this.id!).subscribe({
      next: (response) => {
        this.estudiante = response;
      }, 
      error: (err)=>{
        this.router.navigate(['/error']);
      }
    })
  }

  getMateriasMatriculadas(): void {
    this.materiaService.search(this.id!).subscribe({
      next: (response) => {
        this.materiasMatriculadas = response;
      }, 
      error: (err)=>{
        this.router.navigate(['/error']);
      }
    })
  }


  getPaises() {
    this.paisService.list().subscribe({
      next: (response) => {
        this.paises = response;
      }, 
      error: (err)=>{
        this.router.navigate(['/error']);
      }
    })
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.estudianteService.update(this.id!,this.estudiante).subscribe({
        next: (response) => {
          this.router.navigate(['/estudiantes']);
          Swal.fire('¡Exitoso!', 'Estudiante actualizado con éxito', 'success');
        },
        error: (err) => {
          this.errores = err.error;
        }
      })
    }
  }


  unEnroll(id: number): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.matriculaService.unEnroll(this.id!,id).subscribe({
          next: (response) => {
            this.loadInfo();
            Swal.fire(
              '¡Desmatriculado!',
              'Acción realizada con éxito',
              'success'
            );
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: '¡Oops!',
              text: 'Algo salió mal. Intenta nuevamente.',
            });
          }


        })
      }
    });
  }


  enroll(ngForms: NgForm): void{
    if(ngForms.valid){
      this.matriculaService.enroll(this.id!,this.id_materia_matricular!).subscribe({
        next: (response) =>{
          
          this.loadInfo();
          Swal.fire(
            '¡Matriculado!',
            'Acción realizada con éxito',
            'success'
          );
        },
        error: (err)=>{
          
          Swal.fire({
            icon: 'error',
            title: '¡Oops!',
            text: 'Algo salió mal. Intenta nuevamente.',
          });
        }
      })
    }
  }

}
