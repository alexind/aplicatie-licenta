import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRolesInverted } from 'app/shared/enums/user-roles.enum';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserRoleService } from 'app/shared/services/user-role.service';
import { timeStamp } from 'console';
import moment = require('moment');

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html',
  styleUrls: ['./course-members.component.css']
})

export class CourseMembersComponent implements OnInit {
  public courseId: any;
  public activeTab: string = "students";
  public courseMembers: any[] = [];
  public loading: boolean = false;
  public emailToAdd: string = "";

  constructor(private activeModal: NgbActiveModal, private notifications: NotificationsService, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.loading = true;
    this.getCourseMembers().then(() => {
      this.loading = false;
    })
  }

  addMemberToCourse(f: NgForm) {
    if (f.invalid) {
      this.notifications.showNotification("Please enter a valid e-mail!", "top", "right", "danger");
      return;
    }

    if (this.courseMembers.find(m => m.email == this.emailToAdd)) {
      this.notifications.showNotification("Already a member!", "top", "right", "danger");
      return;
    }

    this.firestore.collection("users").ref.where("email", "==", this.emailToAdd).limit(1).get().then(userData => {
      if (userData.empty) {
        this.notifications.showNotification("No member was found under this e-mail address!", "top", "right", "danger");
        return;
      }

      userData.forEach(f => {
        var obj = {
          courseId: this.courseId,
          grade: null,
          test: null
        };
        this.firestore.collection("users").doc(f.id).collection("user-courses").doc(this.courseId).set(obj).then(data => {
          this.getCourseMembers();
          this.emailToAdd = "";
        });
      })
    });
  }

  getCourseMembers() {
    this.courseMembers = [];
    return new Promise(resolve => {
      this.firestore.collectionGroup("user-courses", ref => ref.where("courseId", "==", this.courseId)).get().subscribe(data => {
        if (data.size == 0) {
          resolve(true);
        }
  
        data.forEach((f: any) => {
          let entry: any = {};
          f.ref.parent.parent.get().then(val => {
            entry = val.data();
            entry.grade = f.data().grade;
            entry.test = f.data().test;
            entry.uid = val.id;
            entry.userRoleDescription = UserRolesInverted[entry.userRole];
            this.courseMembers.push(entry);
  
            if (this.courseMembers.length == data.size) {
              resolve(true);
            }
          });
        });
      });
    });
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
