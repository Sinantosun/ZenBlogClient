import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminCategoryComponent } from './admin-components/admin-category/admin-category.component';
import { AdminBlogComponent } from './admin-components/admin-blog/admin-blog.component';
import { LoginComponent } from './main-components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { BlogDetailComponent } from './main-components/blog-detail/blog-detail.component';
import { HomeComponent } from './main-components/home/home.component';
import { UserLoginComponent } from './main-components/user-login/user-login.component';
import { AdminUserComponent } from './admin-components/admin-user/admin-user.component';
import { AdminRoleComponent } from './admin-components/admin-role/admin-role.component';
import { AddOrUpdateComponent } from './admin-components/add-or-update/add-or-update.component';
import { AdminSocialComponent } from './admin-components/admin-social/admin-social.component';
import { AdminMessageComponent } from './admin-components/admin-message/admin-message.component';
import { MessageComponent } from './main-components/message/message.component';
import { AdminContactComponent } from './admin-components/admin-contact/admin-contact.component';
import { AdminDashboardComponent } from './admin-components/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "admin/category",
        pathMatch: 'full'
    },
    {
        path: "",
        component: MainLayoutComponent,
        children: [
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "blog-detail/:id",
                component: BlogDetailComponent
            },
            {
                path: "message",
                component: MessageComponent
            }
        ]
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
            },
            {
                path: "users",
                component: AdminUserComponent,
                canActivate: [AuthGuardService]
            },
             {
                path: "role",
                component: AdminRoleComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "add-role/:id",
                component: AddOrUpdateComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "social",
                component: AdminSocialComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "message",
                component: AdminMessageComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "contact",
                component: AdminContactComponent,
                canActivate: [AuthGuardService]
            },
             {
                path: "dashboard",
                component: AdminDashboardComponent,
                canActivate: [AuthGuardService]
            },
        ]
    },

    {
        path: "login",
        component: LoginComponent
    },
    
    {
        path: "user-login",
        component: UserLoginComponent
    },
    {
        path: "user-login/:returnUrl",
        component: UserLoginComponent
    }

];
