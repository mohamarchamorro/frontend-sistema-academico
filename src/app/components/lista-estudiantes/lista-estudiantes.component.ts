import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { CommonModule } from '@angular/common';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './lista-estudiantes.component.html'
})
export class ListaEstudiantesComponent implements OnInit{

  estudiantes: Estudiante[] = [];
  paises: Pais[] = [];

  constructor(private estudianteService:EstudianteService,
    private paisService: PaisService,
    private router:Router
  ){}



  ngOnInit(): void {
    this.loadEstudiantes();
    this.getPaises();
  }


  loadEstudiantes(): void{
    this.estudianteService.list().subscribe({
      next: (response) =>{
        this.estudiantes = response;
      }
    })
  }


  
  getPaises(){
    this.paisService.list().subscribe({
      next: (response) =>{
        this.paises = response;
      }
    })
  }


  getPaisNombre(id_pais: number | undefined): string | undefined{
    const pais = this.paises.find(p => p.id === id_pais);
    return pais ? pais.nombre : 'País no encontrado';
  }


  delete(id:number): void{

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
        this.estudianteService.delete(id).subscribe({
          next: (response)=>{
            this.loadEstudiantes();
            Swal.fire(
              '¡Eliminado!',
              'Estudiante eliminado con éxito',
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
    });
    
  }

}
