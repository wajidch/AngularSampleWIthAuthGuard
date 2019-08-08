import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ForgotEmailVerificationComponent } from './users/forgot-email-verification/forgot-email-verification.component';


const routes: Routes = [
  {
       
    path: 'users/dashboard', component: DashboardComponent
 },
  {
       
    path: 'users/login', component:LoginComponent
 },
 {
       
  path: 'users/createaccount', component:CreateAccountComponent
},
{ path:'users/forgotpassword',component:ForgotPasswordComponent,},
{ path:'users/forgot',component:ForgotEmailVerificationComponent,},


 
  { path: 'users', loadChildren: () => import(`./users/users.module`).then(m => m.UserModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
