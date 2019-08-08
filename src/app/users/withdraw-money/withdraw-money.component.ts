import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {

  withdrawMoneyForm:FormGroup;
  message:string;
  email=localStorage.getItem('email');
  userid=localStorage.getItem('id');
  errormessage: string;
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.withdrawMoneyForm=new FormGroup({
      payment_method:new FormControl('',[Validators.required]),
      operation_type:new FormControl('',[Validators.required]),
      amount:new FormControl('',[Validators.required]),
      currency:new FormControl('',[Validators.required]),
      account_owner:new FormControl('',[Validators.required]),
      iban:new FormControl('',[Validators.required]),
      bank_name:new FormControl('',[Validators.required]),
      status:new FormControl('pending',[Validators.required]),
      email:new FormControl(this.email,[Validators.required]),
      user_id:new FormControl(this.userid,[Validators.required]),
      swift:new FormControl('')
      
      
    })
  }


  withdrawmoney(val){

    this.spinner.show();

    this.apiservice.post('withdrawAmount',val)
    .pipe(
      catchError(err =>{
        this.errormessage='Something happend wrong try again!';
        this.message='';
        this.spinner.hide();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{

      console.log("resss",res);
      this.errormessage=''
      this.message=res.body.message;
      this.spinner.hide();
    })

  }

}
