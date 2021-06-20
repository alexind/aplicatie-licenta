import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseContentComponent } from './course-content.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [CourseContentComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxMaskModule,
    AngularEditorModule
  ]
})
export class CourseContentModule { }