import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakeAssessmentComponent } from './take-assessment.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [TakeAssessmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxMaskModule
  ]
})
export class TakeAssessmentModule { }