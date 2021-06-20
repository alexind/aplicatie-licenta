import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesRoutingModule } from './courses-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { AddEditCourseModule } from 'app/shared/modals/add-edit-course/add-edit-course.module';
import { AddEditAssessmentModule } from 'app/shared/modals/add-edit-assessment/add-edit-assessment.module';
import { CourseContentModule } from 'app/shared/modals/course-content/course-content.module';
import { CourseMembersModule } from 'app/shared/modals/course-members/course-members.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoursesRoutingModule,
    NgxMaskModule,
    AddEditCourseModule,
    AddEditAssessmentModule,
    CourseContentModule,
    CourseMembersModule
  ]
})
export class CoursesModule { }