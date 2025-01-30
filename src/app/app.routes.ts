import { Routes } from '@angular/router';
import { ListaEstudiantesComponent } from './components/lista-estudiantes/lista-estudiantes.component';
import { ListaMateriasComponent } from './components/lista-materias/lista-materias.component';
import { CrearEstudianteComponent } from './components/crear-estudiante/crear-estudiante.component';
import { CrearMateriaComponent } from './components/crear-materia/crear-materia.component';
import { InfoEstudianteComponent } from './components/info-estudiante/info-estudiante.component';
import { InfoMateriaComponent } from './components/info-materia/info-materia.component';
import { ErrorComponent } from './components/error/error.component';
import { EstudiantesPorMateriaComponent } from './components/estudiantes-por-materia/estudiantes-por-materia.component';
import { MateriasPorEstudianteComponent } from './components/materias-por-estudiante/materias-por-estudiante.component';

export const routes: Routes = [
    {path:"",redirectTo:"estudiantes",pathMatch:"full"},
    {path:"estudiantes",component:ListaEstudiantesComponent},
    {path:"materias",component:ListaMateriasComponent},
    {path:"crear-estudiante",component:CrearEstudianteComponent},
    {path:"crear-materia",component:CrearMateriaComponent},
    {path:"estudiantes/:id",component:InfoEstudianteComponent},
    {path:"materias/:id",component:InfoMateriaComponent},
    {path:"error",component:ErrorComponent},
    {path:"estudiantes-por-materia",component:EstudiantesPorMateriaComponent},
    {path:"estudiantes-por-materia/:nombre",component:EstudiantesPorMateriaComponent},
    {path:"materias-por-estudiante",component:MateriasPorEstudianteComponent},
    {path:"materias-por-estudiante/:id",component:MateriasPorEstudianteComponent}

];
