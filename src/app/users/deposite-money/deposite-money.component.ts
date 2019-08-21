import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-deposite-money',
  templateUrl: './deposite-money.component.html',
  styleUrls: ['./deposite-money.component.css']
})
export class DepositeMoneyComponent implements OnInit {

  depositMoneyForm: FormGroup;
  message: string;
  accountlist: any;
  email = localStorage.getItem('email');
  userid = localStorage.getItem('id');
  errormessage: string;
  constructor(private router: Router, private apiservice: apiService
    , private spinner: NgxSpinnerService,
    private loadingBar:LoadingBarService) { }
  ngOnInit() {
    this.depositMoneyForm = new FormGroup({
      payment_method: new FormControl('', [Validators.required]),
      operation_type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      account_owner: new FormControl('', [Validators.required]),
      iban: new FormControl('', [Validators.required]),
      bank_name: new FormControl('', [Validators.required]),
      status: new FormControl('pending', [Validators.required]),
      email: new FormControl(this.email, [Validators.required]),
      user_id: new FormControl(this.userid, [Validators.required]),
      swift: new FormControl('', [Validators.required]),
      account_id: new FormControl(''),
      bank_id: new FormControl('2345'),
      bank_reference_id: new FormControl('546'),
      reference_no: new FormControl('123'),
      code: new FormControl('324'),
      transaction_id: new FormControl('789')


    })
    this.getAccountList();
  }

  depositmoney(val) {
    //this.spinner.show();
    this.loadingBar.start();
    this.apiservice.post('depositAmount', val)
      .pipe(
        catchError(err => {

          this.errormessage = 'Something happend wrong try again!';
          this.message = '';
          //this.spinner.hide();
          this.loadingBar.complete();
          setTimeout(function () {
            this.errormessage = '';

          }.bind(this), 3000);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {

        this.errormessage = ''
        this.message = res.body.message;
        //this.spinner.hide();
        this.loadingBar.complete();
        setTimeout(function () {
          this.message = '';
          
        }.bind(this), 3000);
        localStorage.setItem("changeroute",'true');

          this.router.navigateByUrl('users/payment-wizard-deposit');
       
      })
  }
  getAccountList() {
    this.apiservice.get('getAccount').subscribe((res: any) => {

      this.accountlist = res.body.data;
    })
  }
}
