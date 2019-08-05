import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './users-routing.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { DepositeRequestsComponent } from './deposite-requests/deposite-requests.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [ChangePasswordComponent,DepositeRequestsComponent,
    WithdrawRequestComponent,KycRequestComponent,DemoAccountListComponent,
  RealAccountListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule
  ]
})
export class UserModule { }
