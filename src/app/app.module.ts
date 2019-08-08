import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
<<<<<<< HEAD
=======
import { LoginComponent } from './users/login/login.component';
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { apiService } from './services/api.service'
import { ForgotEmailVerificationComponent } from './users/forgot-email-verification/forgot-email-verification.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TokenInterceptor } from './services/token.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';
import { LoginComponent } from './users/login/login.component';
import { authService } from './services/auth.service';

=======
import { HttpClientModule } from '@angular/common/http';
import { apiService } from './services/api.service'
import { ForgotEmailVerificationComponent } from './users/forgot-email-verification/forgot-email-verification.component';
import { NgxSpinnerModule } from "ngx-spinner";
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    DashboardComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    ForgotEmailVerificationComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
    
  ],
<<<<<<< HEAD
  providers: [apiService,
    authService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
=======
  providers: [apiService],
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
  bootstrap: [AppComponent]
})
export class AppModule { }
