import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
<<<<<<< HEAD
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DepositeMoneyComponent } from './deposite-money/deposite-money.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';
=======
import { DepositeRequestsComponent } from './deposite-requests/deposite-requests.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


const routes: Routes = [
    
     
     { path:'changepassword',component:ChangePasswordComponent,},
<<<<<<< HEAD
     { path:'depositmoney',component:DepositeMoneyComponent,},
     { path:'withdrawmoney',component:WithdrawMoneyComponent,},
     { path:'demoaccountlist',component:DemoAccountListComponent,},
     { path:'verifyaccount',component:VerifyAccountComponent,},
     { path:'myprofile',component:MyProfileComponent,},
     { path:'transcationhistory',component:UserTransactionHistoryComponent,},



=======
     { path:'depositrequest',component:DepositeRequestsComponent,},
     { path:'withdrawrequest',component:WithdrawRequestComponent,},
     { path:'demoaccountlist',component:DemoAccountListComponent,},
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
     { path:'realaccountlist',component:RealAccountListComponent,},
     { path:'kycrequest',component:KycRequestComponent,},

    

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }