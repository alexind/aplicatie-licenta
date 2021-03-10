import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from '../enums/user-roles.enum';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class UserRoleService {
    private role: any = null;

    constructor(
        public firestore: AngularFirestore,
        private router: Router
    ) {
    }

    getUserRole(uid) {
        return new Promise((resolve) => {
            if (this.role == null) {
                this.firestore.collection("users").doc(uid).get().subscribe((user: any) => {
                    if (user) {
                        this.role = user.data().userRoleId;
                        resolve(this.role);
                    } else {
                        resolve(null);
                    }
                });
            } else {
                resolve(this.role);
            }
        });
    }

    setUserRole(role) {
        this.role = role;
    }

    isAdmin() {
        return this.role == UserRoles["admin"];
    }

    isProfessor() {
        return this.role == UserRoles["professor"];
    }

    isStudent() {
        return this.role == UserRoles["student"];
    }
}


