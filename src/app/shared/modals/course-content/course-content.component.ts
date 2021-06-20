import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserRoleService } from 'app/shared/services/user-role.service';
import moment = require('moment');

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})

export class CourseContentComponent implements OnInit {
  public courseId: any;
  public isStudent: boolean;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    height: "200px",
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'strikeThrough',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'toggleEditorMode',
        'removeFormat'
      ]
    ]
  };
  public course: any = {};
  constructor(private activeModal: NgbActiveModal, private notifications: NotificationsService, private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.firestore.collection("courses").doc(this.courseId).get().subscribe(c => {
      this.course = c.data();
      if (!this.course.course) {
        this.course.course = "";
      }
    })
  }

  save() {
    var courseRef = this.firestore.collection("courses").doc(this.courseId);      
    courseRef.update(this.course).then(() => {
      this.notifications.showNotification("Test has been saved!", "top", "right", "success");
    });
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
