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
        this.getUserData(data.user.uid);
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
    this.firestore.collection("users").doc(uid).get().subscribe((doc: any) => {
      const user = doc.data();
      user.uid = doc.id;
      this.router.navigate(["/dashboard"]);
      localStorage.setItem("USER_DATA", JSON.stringify(user));
      this.userRoleService.setUserRole(user.userRole);
      this.loading = false;
    })
  }
}
