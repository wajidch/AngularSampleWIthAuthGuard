import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MustMatch } from 'src/app/common/must-match-validator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  registeruserForm:FormGroup;
  message:string;
  errormessage: any;
  constructor(private apiservice:apiService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registeruserForm=this.formBuilder.group({
      name:new FormControl('',[Validators.required]),
      account_type:new FormControl('real',[Validators.required]),
      number:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,
        Validators.minLength(8)]),
      password_confirmation:new FormControl('',[Validators.required]),
      city:new FormControl('test',[Validators.required]),
      address:new FormControl('g',[Validators.required]),
      post_code:new FormControl('87888',[Validators.required]),
      country:new FormControl('turkey',[Validators.required]),
    },
    {
            validator: MustMatch('password', 'password_confirmation')
        }
    
    )
  }

  register(val)
  {
this.spinner.show();
this.apiservice.postwithouttoken('auth/register',val)
.pipe(
  catchError(err =>{
   
    this.spinner.hide();
    this.message='';
    this.errormessage=err.error.errors.email[0];
    return throwError(err);
  })
)
.subscribe((res:any)=>{

  console.log("responseee",res)

  this.errormessage='';
  this.spinner.hide();
  this.message=res.body.message
})

  }

}
