import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
       
    path: 'admin/dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
 },

 {path:'',redirectTo: 'admin/login',pathMatch: 'full'},
 
  {
       
    path: 'admin/login' ,  component:LoginComponent
 },
 


 
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  ,canActivate: [AuthGuard]},
  
  {path:'**',redirectTo:'admin/login',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
