import { Routes } from '@angular/router';
import { IconsComponent } from '../../icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'user', 
        loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
    },
    { 
        path: 'courses', 
        loadChildren: () => import('../../courses/courses.module').then(m => m.CoursesModule),
    },
    { path: 'icons',          component: IconsComponent },
];
