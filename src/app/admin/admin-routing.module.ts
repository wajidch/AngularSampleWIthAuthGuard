import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AccountActivitiesHistoryComponent } from './account-activities-history/account-activities-history.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { DepositRequestComponent } from './deposit-request/deposit-request.component';


const routes: Routes = [

  { path: 'changepassword', component: ChangePasswordComponent, },
  { path: 'demoaccountlist', component: DemoAccountListComponent, },
  { path: 'myprofile', component: MyProfileComponent, },
  { path: 'transcationhistory', component: AccountActivitiesHistoryComponent, },
  { path: 'accountactivitieshistory', component: AccountActivitiesHistoryComponent },
  { path: 'realaccountlist', component: RealAccountListComponent, },
  { path: 'kycrequest', component: KycRequestComponent, },
  // { path: 'withdrawrequest', component: WithdrawRequestComponent },
  // { path: 'depositrequest', component: DepositRequestComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }