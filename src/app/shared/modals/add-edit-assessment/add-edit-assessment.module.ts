import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditAssessmentComponent } from './add-edit-assessment.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AddEditAssessmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxMaskModule
  ]
})
export class AddEditAssessmentModule { }