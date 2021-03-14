import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserRoleService } from 'app/shared/services/user-role.service';
import moment = require('moment');

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})

export class AddEditCourseComponent implements OnInit {
  public mode: string = "";
  public course: any = {};
  constructor(private activeModal: NgbActiveModal, private notifications: NotificationsService, private firestore: AngularFirestore) {
  }

  ngOnInit() {

  }

  save(f: NgForm) {
    if (f.invalid) {
      this.notifications.showNotification("Form is not valid!", "top", "right", "danger");
      return;
    }

    if (this.mode == "Add") {
      this.course.lastUpdated = null;
      this.firestore.collection("courses").add(this.course).then(createdCourse => {
        this.course.id = createdCourse.id;
        this.activeModal.close(this.course);
      });      
    } else {
      var courseId = this.course.id; 
      delete this.course["id"];
      this.course.lastUpdated = moment().format("YYYY-MM-DD");
      var courseRef = this.firestore.collection("courses").doc(courseId);      
      courseRef.update(this.course).then(() => {
        this.course.id = courseId;
        this.activeModal.close(this.course);
      });
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
