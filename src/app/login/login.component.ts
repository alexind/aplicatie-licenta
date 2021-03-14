import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserRoleService } from 'app/shared/services/user-role.service';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { NgForm } from '@angular/forms';

interface LoginModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: LoginModel = { username: '', password: '' };
  public loading: boolean;
  public screen: string = "login";

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private notifications: NotificationsService,
    private userRoleService: UserRoleService,
    private router: Router) {
  }

  ngOnInit() {
  }

  login(f: NgForm) {
    if (f.invalid) {
      this.notifications.showNotification("Please enter the credentials correctly", "top", "right", "danger");
      return;
    }

    this.loading = true;
    this.auth.signInWithEmailAndPassword(this.credentials.username, this.credentials.password).then(async data => {
      if (data.user.emailVerified) {
        await this.getUserData(data.user.uid);
        await this.getCourses();
        this.router.navigate(["/user"]);
        this.loading = false;
      } else {
        this.notifications.showNotification("E-mail not verified", "top", "right", "danger");
        this.loading = false;
      }
    }, err => {
      this.notifications.showNotification("Incorrect credentials", "top", "right", "danger");
      this.loading = false;
    });
  }

  getUserData(uid) {
    return new Promise(resolve => {
      this.firestore.collection("users").doc(uid).get().subscribe((doc: any) => {
        const user = doc.data();
        user.uid = doc.id;        
        localStorage.setItem("USER_DATA", JSON.stringify(user));
        this.userRoleService.setUserRole(user.userRole);
        resolve(true);
      })
    })
  }

  getCourses() {
    return new Promise(resolve => {
      this.firestore.collection("courses").ref.get().then(courses => {
        let coursesList: any[] = [];
        courses.forEach(course => {
          let c: any = course.data();
          c.id = course.id;
          coursesList.push(c);
        });
        localStorage.setItem("COURSES", JSON.stringify(coursesList));
        resolve(true);
      })
    })
  }
}
