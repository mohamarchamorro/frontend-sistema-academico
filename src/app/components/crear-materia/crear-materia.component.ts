import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia';
import { MateriaService } from '../../services/materia.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-materia.component.html'
})
export class CrearMateriaComponent implements OnInit{
  errores: any = [];

  materia: Materia = new Materia();
  
  constructor(private materiaService:MateriaService,
    private router:Router){}

  
    

  ngOnInit(): void {
  }



  onSubmit(form: NgForm){
    if(form.valid){
      this.materiaService.create(this.materia).subscribe({
        next: (response) =>{
          this.router.navigate(['/materias']);
          Swal.fire('¡Exitoso!','Materia creada con éxito','success');
        },
        error: (err)=>{
          this.errores = err.error;
        }
      })
    }
  }


}
