import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    authState: any = null;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.getAuthState();
    }

    getAuthState() {
        return new Promise((resolve) => {
            this.afAuth.authState.subscribe(auth => {
                if (auth) {
                    this.authState = auth;
                    resolve(this.authState)
                } else {
                    resolve(null);
                }
            });
        });

    }

    // signOut method for logging out from the Angular/Firebase app-->
    signOut() {
        return this.afAuth.signOut().then(() => {
            this.authState = null;
            localStorage.clear();
            this.router.navigate(['/login']);
        })
    }

    resetPassword(email) {
        this.afAuth.sendPasswordResetEmail(email);
    }
}