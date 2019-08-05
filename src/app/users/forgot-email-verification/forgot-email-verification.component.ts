import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-email-verification',
  templateUrl: './forgot-email-verification.component.html',
  styleUrls: ['./forgot-email-verification.component.css']
})
export class ForgotEmailVerificationComponent implements OnInit {
  forgotemailForm:FormGroup
  constructor(private apiservice:apiService,private router:Router) { }

  ngOnInit() {
    this.forgotemailForm=new FormGroup({
      email:new FormControl('',[Validators.required])
    })
  }
  send(val){
    
    this.apiservice.postwithouttoken('auth/forgot',val).subscribe((res:any)=>{
      console.log("after api response ",res)
    })
  }

}
