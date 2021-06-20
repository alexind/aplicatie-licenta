import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseMembersComponent } from './course-members.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CourseMembersComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxMaskModule
  ]
})
export class CourseMembersModule { }