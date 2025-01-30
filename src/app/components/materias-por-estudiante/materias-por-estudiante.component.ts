import { Component, OnInit } from '@angular/core';
import { Matricula } from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materias-por-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './materias-por-estudiante.component.html'
})
export class MateriasPorEstudianteComponent implements OnInit {
  matriculas: Matricula[] = [];
  id: number | undefined;

  constructor(private matriculaService: MatriculaService, private parametros: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    
    this.parametros.paramMap.subscribe(params => {
      this.id = this.parametros.snapshot.params['id'];
      
      if (this.id != null && this.id != undefined) {
        this.loadMateriasByEstudiante(this.id);
      } else {
        this.loadMatriculas();
      }
    });

  }

  loadMatriculas(): void {

    this.matriculaService.getMatriculas().subscribe({
      next: (response) => {

        const xmlDoc = this.matriculaService.parseXml(response);
        this.matriculas = this.matriculaService.parseXmlToMatriculas(xmlDoc);
        //console.log('Lista de Matrículas:', this.matriculas);
      }
    })
  }



  loadMateriasByEstudiante(id: number) {
    this.matriculaService.getMateriasByEstudiante(id).subscribe({
      next: (response) => {

        const xmlDoc = this.matriculaService.parseXml(response);
        this.matriculas = this.matriculaService.parseXmlToMatriculas(xmlDoc);
      }
    })
  }

  onSubmit(ngForm: NgForm): void {
    if (this.id != null && this.id != undefined) {
      this.router.navigate(['/materias-por-estudiante', this.id]);
    } else {
      this.router.navigate(['/materias-por-estudiante']);
    }

  }



}
