import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message:string;
  constructor(
    private route:Router,
    private apiservce:apiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
   
    })
  }
  login(val){


    try {
      this.spinner.show();
      this.apiservce.postwithouttoken('auth/login',val).subscribe((res:any)=>{
  
        
       
        if(res.status===200){

          this.spinner.hide();
          localStorage.setItem('token',res.access_token)
          this.route.navigate(['users/dashboard']);
        }
        else{
          this.spinner.hide();
          this.message='Invalid email or password';
        }
      })
    } catch (error) {
      this.spinner.hide();
      console.log("errorr",error)
      
    }
   
    
  }

}
