import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-materias',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './lista-materias.component.html'
})
export class ListaMateriasComponent implements OnInit{

  materias: Materia[] = [];

  constructor(private materiaService: MateriaService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadMaterias();
  }


  loadMaterias(): void{
    this.materiaService.list().subscribe({
      next: (response) =>{
        this.materias = response;
      }
    })
  }


  delete(id: number): void {

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
        this.materiaService.delete(id).subscribe({
          next: (response) => {
            this.loadMaterias();
            Swal.fire(
              '¡Eliminado!',
              'Materia eliminada con éxito',
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


}
