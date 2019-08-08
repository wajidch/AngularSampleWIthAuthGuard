import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message:string;
  errormessage: any;
  constructor(
    private route:Router,
    private apiservce:apiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,
        Validators.email]),
      password: new FormControl('',[Validators.required,
        Validators.minLength(8)]),
   
    })
  }
  login(val){
    
      this.spinner.show();
      this.apiservce.postwithouttoken('auth/login',val)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);

          this.spinner.hide();
          this.errormessage=err.error.message
          return throwError(err);
      })
    )
      .subscribe(
        (res:any)=>{
        if(res.status===200){

          this.spinner.hide();
          this.errormessage='';
          localStorage.removeItem('token');
          localStorage.setItem('token',res.body.access_token);
          localStorage.setItem('id',res.body.user.id)
          localStorage.setItem('user_name',res.body.user.name);
          localStorage.setItem('email',res.body.user.email);
          localStorage.setItem('post_code',res.body.user.post_code);
          localStorage.setItem('address',res.body.user.address);
          localStorage.setItem('city',res.body.user.city);
          localStorage.setItem('country',res.body.user.country)
          localStorage.setItem('phone',res.body.user.number)
          this.route.navigate(['users/dashboard']);
        }
       
      })
     
   
   
    
  }

}
