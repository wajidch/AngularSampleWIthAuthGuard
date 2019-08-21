import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ForgotEmailVerificationComponent } from './users/forgot-email-verification/forgot-email-verification.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
       
    path: 'users/dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
 },

 {path:'',redirectTo: 'users/login',pathMatch: 'full'},
 {path:'**',redirectTo: 'users/login',pathMatch: 'full'},
  {
       
    path: 'users/login' ,  component:LoginComponent
 },
 { path: 'users/createaccount', component:CreateAccountComponent
},
{ path:'users/forgotpassword',component:ForgotPasswordComponent,},
{ path:'users/forgot',component:ForgotEmailVerificationComponent,},


 
  { path: 'users', loadChildren: './users/users.module#UserModule',canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
