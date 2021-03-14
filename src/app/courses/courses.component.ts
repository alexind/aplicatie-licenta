import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditCourseComponent } from 'app/shared/modals/add-edit-course/add-edit-course.component';
import { UserRoleService } from 'app/shared/services/user-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  public isAdmin: boolean = false;
  public userData: any = {};
  public coursesList: any[] = [];
  constructor(private userRoleService: UserRoleService, private modalService: NgbModal, private firestore: AngularFirestore) {
    this.coursesList = JSON.parse(localStorage.getItem("COURSES"));
    this.userData = JSON.parse(localStorage.getItem("USER_DATA"));
  }

  ngOnInit() {
    this.userRoleService.getUserRole(this.userData.uid).then(role => {
      this.isAdmin = this.userRoleService.isAdmin();
    })
  }

  openCourseModal(mode, course) {
    const modal = this.modalService.open(AddEditCourseComponent);
    modal.componentInstance.mode = mode;
    if (course != null) {
      modal.componentInstance.course = Object.assign({}, course);
    }
    modal.result.then(newCourse => {
      if (mode == "Add") {
        this.coursesList.push(newCourse);
        Swal.fire(
          'Added!',
          'New course has been added.',
          'success'
        );
      } else {
        var ix = this.coursesList.findIndex(f => f.id == newCourse.id);
        this.coursesList[ix] = Object.assign({}, newCourse);
        Swal.fire(
          'Edited!',
          'Course has been edited.',
          'success'
        );
      }      
      localStorage.setItem("COURSES", JSON.stringify(this.coursesList));
    }, reason => {});
  }

  deleteCourse(courseId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.firestore.collection("courses").doc(courseId).delete().then(() => {
          Swal.fire(
            'Deleted!',
            'The course has been deleted.',
            'success'
          );
          this.coursesList = this.coursesList.filter(f => f.id != courseId);
          localStorage.setItem("COURSES", JSON.stringify(this.coursesList));
        })       
      }
    })
  }
}
