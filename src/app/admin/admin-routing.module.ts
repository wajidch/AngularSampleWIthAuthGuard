import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';


const routes: Routes = [
    
     
     { path:'changepassword',component:ChangePasswordComponent,},
    
     { path:'demoaccountlist',component:DemoAccountListComponent,},
     
     { path:'myprofile',component:MyProfileComponent,},
     { path:'transcationhistory',component:UserTransactionHistoryComponent,},
     


     { path:'realaccountlist',component:RealAccountListComponent,},
     { path:'kycrequest',component:KycRequestComponent,},

    

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }