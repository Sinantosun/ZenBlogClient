import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminCategoryComponent } from './admin-components/admin-category/admin-category.component';
import { AdminBlogComponent } from './admin-components/admin-blog/admin-blog.component';


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
        children: [
            {
                path: "category",
                component: AdminCategoryComponent
            },
            {
                path: "blog",
                component: AdminBlogComponent
            }
        ]
    }

];
