import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Guard/auth.guard';
import { TagComponent } from './components/tag/tag.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { TagAddComponent } from './components/tag-add/tag-add.component';
import { TestComponent } from './components/test/test.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategorysComponent } from './components/categorys/categorys.component';

export const routes: Routes =
 [

   { path: 'login', component: LoginComponent },
   {
     path: 'dashboard',
     component: DashboardComponent,
     canActivate: [AuthGuard],
     children: [
       {path:'tags',component:TagComponent},
       { path: 'tags/edit/:id', component: TagEditComponent },
       {path:'tags/add',component:TagAddComponent},
       {path:'test',component:TestComponent},
       {path:'categorys',component:CategorysComponent},
       {path:'addCategory',component:AddCategoryComponent}
     ]
   },
   { path: '**', redirectTo: 'table' }
  
 ];
