import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { ChangePasswordComponent } from './change-password/change-password.component';

import { KycRequestComponent } from './kyc-request/kyc-request.component';
import { DemoAccountListComponent } from './demo-account-list/demo-account-list.component';
import { RealAccountListComponent } from './real-account-list/real-account-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyProfileComponent } from './my-profile/my-profile.component';

import { AccountActivitiesHistoryComponent } from './account-activities-history/account-activities-history.component';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { DepositRequestComponent } from './deposit-request/deposit-request.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';





@NgModule({
  declarations: [ChangePasswordComponent,

    KycRequestComponent,
    DemoAccountListComponent,
    RealAccountListComponent,

    MyProfileComponent,

    AccountActivitiesHistoryComponent,

    DepositRequestComponent,

    WithdrawRequestComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    LoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ]
})
export class AdminModule { }
