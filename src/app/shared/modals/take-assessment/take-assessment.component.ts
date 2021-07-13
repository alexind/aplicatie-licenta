import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserRoleService } from 'app/shared/services/user-role.service';

@Component({
  selector: 'app-take-assessment',
  templateUrl: './take-assessment.component.html',
  styleUrls: ['./take-assessment.component.css']
})

export class TakeAssessmentComponent implements OnInit {
  public count: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public courseId: any;
  public course: any = {};
  public userData: any;
  public loading: any;
  public testTaken: any;

  constructor(private activeModal: NgbActiveModal, private notifications: NotificationsService, private firestore: AngularFirestore) {
    this.userData = JSON.parse(localStorage.getItem("USER_DATA"));
  }

  ngOnInit() {
    this.loading = true;
    this.firestore.collection("courses").doc(this.courseId).get().subscribe((c: any) => {
      if (c.data().test) {
        this.firestore.collection("users").doc(this.userData.uid).collection("user-courses").doc(this.courseId).get().subscribe(crs => {
          this.course = crs.data();
          if (!this.course.test) {
            this.course.test = c.data().test;            
          } else {
            this.testTaken = true;
          }
          this.loading = false;
        })
      } else {
        this.course.test = null;
        this.loading = false;
      }
    })
  }

  save(f: NgForm) {
    if (f.invalid) {
      this.notifications.showNotification("All fields are required!", "top", "right", "danger");
      return;
    }

    this.course.grade = 1;
    this.count.forEach(ix => {
      if (this.course.test['raspuns_final_intrebarea_' + ix] == this.course.test['varianta_corecta_intrebarea_' + ix]) {
        this.course.grade++;
      }
    });
    

    var courseRef = this.firestore.collection("users").doc(this.userData.uid).collection("user-courses").doc(this.courseId);
    courseRef.update(this.course).then(() => {
      this.notifications.showNotification("Test has been saved!", "top", "right", "success");
    });   
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
