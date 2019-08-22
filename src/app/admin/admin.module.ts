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

import { UserTransactionHistoryComponent } from './user-transaction-history/user-transaction-history.component';

import { LoadingBarModule } from '@ngx-loading-bar/core';





@NgModule({
  declarations: [ChangePasswordComponent,
   
    KycRequestComponent,
    DemoAccountListComponent,
  RealAccountListComponent,
  
  MyProfileComponent,
  
   UserTransactionHistoryComponent,
   ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    LoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
