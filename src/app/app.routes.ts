import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminCategoryComponent } from './admin-components/admin-category/admin-category.component';
import { AdminBlogComponent } from './admin-components/admin-blog/admin-blog.component';
import { LoginComponent } from './main-components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "admin",
        pathMatch: 'full'
    },
    {
        path: "",
        component: MainLayoutComponent,
        children: []
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: "category",
                component: AdminCategoryComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "blog",
                component: AdminBlogComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },

    {
        path: "login",
        component: LoginComponent
    }

];
