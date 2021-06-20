import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/shared/services/authentication.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/courses', title: 'Courses', icon: 'pe-7s-notebook', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
  // { path: '/admin', title: 'Admin', icon: 'pe-7s-id', class: '' },
  // { path: '/assessment', title: 'Assessment', icon: 'pe-7s-news-paper', class: '' },

  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.authService.signOut();
  }
}
