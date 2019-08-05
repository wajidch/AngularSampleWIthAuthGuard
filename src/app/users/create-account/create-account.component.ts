import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  registeruserForm:FormGroup;
  message:string;
  constructor(private apiservice:apiService,
    private router:Router,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.registeruserForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      account_type:new FormControl('real',[Validators.required]),
      number:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      password_confirmation:new FormControl('',[Validators.required]),
      city:new FormControl('trs',[Validators.required]),
      address:new FormControl('g',[Validators.required]),
      post_code:new FormControl('87888',[Validators.required]),
      country:new FormControl('fgd',[Validators.required]),
    })
  }

  register(val)
  {
this.spinner.show();
this.apiservice.postwithouttoken('auth/register',val).subscribe((res:any)=>{

  this.spinner.hide();
  this.message=res.message
})

  }

}
