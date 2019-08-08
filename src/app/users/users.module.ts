import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './users-routing.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
<<<<<<< HEAD
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
=======
import { DepositeRequestsComponent } from './deposite-requests/deposite-requests.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
<<<<<<< HEAD
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DepositeMoneyComponent } from './deposite-money/deposite-money.component';
import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';
=======
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248



@NgModule({
<<<<<<< HEAD
  declarations: [ChangePasswordComponent,
    WithdrawMoneyComponent,KycRequestComponent,DemoAccountListComponent,
  RealAccountListComponent,
  VerifyAccountComponent,
  MyProfileComponent,
  DepositeMoneyComponent,
   UserTransactionHistoryComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
=======
  declarations: [ChangePasswordComponent,DepositeRequestsComponent,
    WithdrawRequestComponent,KycRequestComponent,DemoAccountListComponent,
  RealAccountListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
  ]
})
export class UserModule { }
