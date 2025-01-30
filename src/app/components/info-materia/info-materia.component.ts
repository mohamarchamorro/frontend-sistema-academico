import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MateriaService } from '../../services/materia.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-materia',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './info-materia.component.html'
})
export class InfoMateriaComponent implements OnInit{
  
    id: number | undefined;
    materia: Materia = new Materia();
    errores: any = [];

  constructor(private parametros: ActivatedRoute,
    private router: Router,
    private materiaService: MateriaService
  ) { }


    

  ngOnInit(): void {
    this.id = this.parametros.snapshot.params['id'];
    this.loadInfo();
  }

  
  loadInfo(): void {
    this.materiaService.get(this.id!).subscribe({
      next: (response) =>{
        this.materia = response;
      },
      error: (err) =>{
        this.router.navigate(['/error']);
      }
    })
  }


  onSubmit(ngForm: NgForm): void{
    if(ngForm.valid){
      this.materiaService.update(this.id!,this.materia).subscribe({
        next: (response) =>{
          this.router.navigate(['/materias']);
          Swal.fire('¡Exitoso!', 'Materia actualizado con éxito', 'success');

        },
        error: (err) =>{
          this.errores = err.error;
        }
      })
    }
  }

}
