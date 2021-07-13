import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditCourseComponent } from 'app/shared/modals/add-edit-course/add-edit-course.component';
import { AddEditAssessmentComponent } from 'app/shared/modals/add-edit-assessment/add-edit-assessment.component';
import { UserRoleService } from 'app/shared/services/user-role.service';
import Swal from 'sweetalert2';
import { CourseContentComponent } from 'app/shared/modals/course-content/course-content.component';
import { CourseMembersComponent } from 'app/shared/modals/course-members/course-members.component';
import { TakeAssessmentComponent } from 'app/shared/modals/take-assessment/take-assessment.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  public isAdmin: boolean = false;
  public isProfessor: boolean = false;
  public isStudent: boolean = false;
  public userData: any = {};
  public allCourses: any[] = [];
  public coursesList: any[] = [];

  constructor(private userRoleService: UserRoleService, private modalService: NgbModal, private firestore: AngularFirestore) {
    this.allCourses = JSON.parse(localStorage.getItem("COURSES"));
    this.userData = JSON.parse(localStorage.getItem("USER_DATA"));
  }

  ngOnInit() {
    this.userRoleService.getUserRole(this.userData.uid).then(role => {
      this.isAdmin = this.userRoleService.isAdmin();
      this.isProfessor = this.userRoleService.isProfessor();
      this.isStudent = this.userRoleService.isStudent();

      if (this.isAdmin) {
        this.coursesList = JSON.parse(localStorage.getItem("COURSES"));
      } else {
        this.getCoursesForMember();
      }
    })
  }

  getCoursesForMember() {
    this.firestore.collection("users").doc(this.userData.uid).collection("user-courses").ref.get().then(data => {
      data.forEach(f => {
        var tmpCourse = this.allCourses.find(c => c.id == f.id);
        if (tmpCourse) {
          this.coursesList.push(tmpCourse);
        }
      })
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
  
  goToCourse(courseId) {
    const modal = this.modalService.open(CourseContentComponent, { size: "lg" });
    modal.componentInstance.courseId = courseId;
    modal.componentInstance.isStudent = this.isStudent;
  }

  createTest(courseId) {
    const modal = this.modalService.open(AddEditAssessmentComponent, { size: "lg" });
    modal.componentInstance.courseId = courseId;
  }

  takeTest(courseId) {
    const modal = this.modalService.open(TakeAssessmentComponent, { size: "lg" });
    modal.componentInstance.courseId = courseId;
  }

  courseMembers(courseId) {
    const modal = this.modalService.open(CourseMembersComponent, { size: "lg" });
    modal.componentInstance.courseId = courseId;
  }
}
