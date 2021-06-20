import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/shared/services/notifications.service';
import moment = require('moment');

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: any = {};

  constructor(private notifications: NotificationsService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("USER_DATA"));
  }

  async save(f: NgForm) {
    if (!f.valid) {
      this.notifications.showNotification("Please fill all the required fields", "top", "right", "danger");
      return false;
    }
    var userRef = this.firestore.collection("users").doc(this.user.uid);
    userRef.update({
      about: this.user.about,
      state: this.user.state,
      gender: this.user.gender,
      addressLine: this.user.addressLine,
      city: this.user.city,
      country: this.user.country,
      dateOfBirth: moment(this.user.dateOfBirth).format("YYYY-MM-DD"),
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      postalCode: this.user.postalCode
    });

    localStorage.setItem("USER_DATA", JSON.stringify(this.user));
    this.notifications.showNotification("Profile was updated", "top", "right", "success");
  }
}
