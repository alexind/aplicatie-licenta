import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as moment from 'moment';
import { NotificationsService } from '../services/notifications.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private notifications: NotificationsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve) => {
      
      if (this.checkAuthentication()) {
        var tokenDuration = moment.duration(moment().utc().diff(moment(this.authService.authState.metadata.lastSignInTime).utc().format())).asHours();
        if (tokenDuration > 12) {
          this.getHimOut();
          resolve(false);
        }
        resolve(true);
      } else {
        this.authService.getAuthState().then(res => {
          if (res == null) {
            this.getHimOut();
            resolve(false);
          } else {
            var tokenDuration = moment.duration(moment().utc().diff(moment(this.authService.authState.metadata.lastSignInTime).utc().format())).asHours();
            if (tokenDuration > 12) {
              this.getHimOut();
              resolve(false);
            }
            resolve(true);
          }
        });
      }
    });
  }

  getHimOut() {
    this.notifications.showNotification("Your session is expired", "top", "right", "danger");
    this.authService.signOut();
  }

  checkAuthentication() {
    return this.authService.authState;
  }

}
