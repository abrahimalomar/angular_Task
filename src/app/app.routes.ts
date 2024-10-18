import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Guard/auth.guard';
import { TagComponent } from './components/tag/tag.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { TagAddComponent } from './components/tag-add/tag-add.component';

export const routes: Routes =
 [

   { path: 'login', component: LoginComponent },
   {
     path: 'dashboard',
     component: DashboardComponent,
     canActivate: [AuthGuard],
     children: [
       { path: 'table', component: TableComponent },
       {path:'tags',component:TagComponent},
       { path: 'tags/edit/:id', component: TagEditComponent },
       {path:'tags/add',component:TagAddComponent}
     ]
   },
   { path: '**', redirectTo: 'login' }
  
 ];
