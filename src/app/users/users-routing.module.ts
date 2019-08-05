import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { DepositeRequestsComponent } from './deposite-requests/deposite-requests.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';


const routes: Routes = [
    
     
     { path:'changepassword',component:ChangePasswordComponent,},
     { path:'depositrequest',component:DepositeRequestsComponent,},
     { path:'withdrawrequest',component:WithdrawRequestComponent,},
     { path:'demoaccountlist',component:DemoAccountListComponent,},
     { path:'realaccountlist',component:RealAccountListComponent,},
     { path:'kycrequest',component:KycRequestComponent,},

    

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }