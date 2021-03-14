import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCourseComponent } from './add-edit-course.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AddEditCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxMaskModule
  ]
})
export class AddEditCourseModule { }