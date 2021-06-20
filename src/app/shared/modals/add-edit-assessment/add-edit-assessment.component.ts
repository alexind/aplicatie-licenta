import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserRoleService } from 'app/shared/services/user-role.service';

@Component({
  selector: 'app-add-edit-assessment',
  templateUrl: './add-edit-assessment.component.html',
  styleUrls: ['./add-edit-assessment.component.css']
})

export class AddEditAssessmentComponent implements OnInit {
  public count: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public courseId: any;
  public course: any;

  constructor(private activeModal: NgbActiveModal, private notifications: NotificationsService, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.firestore.collection("courses").doc(this.courseId).get().subscribe(c => {
      this.course = c.data();
      if (!this.course.test) {
        this.course.test = {};
      }
    })
  }

  save(f: NgForm) {
    if (f.invalid) {
      this.notifications.showNotification("All fields are required!", "top", "right", "danger");
      return;
    }

    var courseRef = this.firestore.collection("courses").doc(this.courseId);      
    courseRef.update(this.course).then(() => {
      this.notifications.showNotification("Test has been saved!", "top", "right", "success");
    });   
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
