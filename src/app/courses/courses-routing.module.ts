import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AuthenticationGuard } from 'app/shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CoursesComponent,
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }