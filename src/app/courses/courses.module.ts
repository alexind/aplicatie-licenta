import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesRoutingModule } from './courses-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { AddEditCourseModule } from 'app/shared/modals/add-edit-course/add-edit-course.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoursesRoutingModule,
    NgxMaskModule,
    AddEditCourseModule
  ]
})
export class CoursesModule { }