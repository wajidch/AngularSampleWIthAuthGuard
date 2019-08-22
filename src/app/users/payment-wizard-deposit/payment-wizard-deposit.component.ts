import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiService } from 'src/app/services/api.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, RoutesRecognized, NavigationEnd, ActivatedRoute } from '@angular/router';
import { pairwise } from 'rxjs/operators'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-payment-wizard-deposit',
  templateUrl: './payment-wizard-deposit.component.html',
  styleUrls: ['./payment-wizard-deposit.component.css']
})
export class PaymentWizardDepositComponent implements OnInit {

  stepContent1: boolean = true;
  stepContent2: boolean = false;
  stepContent3: boolean = false;
  NoRecordFound: boolean;
  errormessage: string;
  realaccountlist: any;
  transcationList: any;
  notFound: string;
  searchForm:FormGroup
  pager: {
    current_page: 1
  };
  pagesAccount = [];
  pages = [];
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingBar:LoadingBarService) { }

  ngOnInit() {

    this.searchForm=new FormGroup({
      search:new FormControl('')
    })

    this.route.queryParams.subscribe(x => this.getTranscationlist(x.page || 1));
    this.route.queryParams.subscribe(x => this.getRealAccountList(x.page || 1));

    this.currentUrl = this.router.url;
let checkroute=localStorage.getItem("changeroutedeposit")
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log("change route",checkroute)
        if (this.previousUrl === '/users/depositmoney' 
        && checkroute==='true') {
          var step1 = document.getElementById("stepContent1");
          step1.classList.remove("active");
          var step2 = document.getElementById("stepContent2");
          step2.classList.remove("active");
          var step3 = document.getElementById("stepContent3");
          step3.classList.add("active");
          var step4 = document.getElementById("step1");
          step4.classList.remove("active");
          var step5 = document.getElementById("step2");
          step5.classList.remove("active");
          var step6 = document.getElementById("step3");
          step6.classList.add("active");
          
        }
      };
    });
  }

  loadPage(page) {
    this.getTranscationlist(page);
    this.getRealAccountList(page)
  }

  search(val){
    try {
      
      
      //this.spinner.show();
      
      if(val.search){
      this.loadingBar.start();
      this.apiservice.get(`searchTransactions/${val.search}`)
        .pipe(
          catchError(err => {

            if (err.status === 404) {
              //this.spinner.hide();
              this.loadingBar.complete();
              this.notFound = 'No Record Found';
              this.errormessage = ''
            }
            else {
              this.errormessage = 'Something happend wrong try again!';

              //this.spinner.hide();
              this.loadingBar.complete();
              this.notFound = '';
            }

            return throwError(err)
          })
        )
        .subscribe((res: any) => {
          if (res.status === 200) {

            if(res.body.status===404){
              this.transcationList = [];
            this.notFound = 'No Record Found';
            this.pages = [];
            this.errormessage = '';
            //this.spinner.hide();
            this.loadingBar.complete();
            }
            else{
            this.notFound = '';
            this.errormessage = '';
            this.pages = [];
            this.pager = res.body.data;
            for (let i = 1; i <= res.body.data.last_page; i++) {
              this.pages.push(i)
            }

            this.transcationList = res.body.data.data;

            //this.spinner.hide();
            this.loadingBar.complete();
          }
          }
          else {
            this.transcationList = [];
            this.notFound = 'No Record Found';
            this.errormessage = '';
            //this.spinner.hide();
            this.loadingBar.complete();
          }
        })
      }
      else{
        this.getTranscationlist(1)
      }
    } catch (error) {
      //this.spinner.hide();
      this.loadingBar.complete();
    }
  }
  getTranscationlist(page) {

    try {
      
      //this.spinner.show();
      this.loadingBar.start();
      this.apiservice.get(`getDepositTransactions?page=${page}`)
        .pipe(
          catchError(err => {

            if (err.status === 404) {
              //this.spinner.hide();
              this.loadingBar.complete();
              this.notFound = 'No Record Found';
              this.errormessage = ''
            }
            else {
              this.errormessage = 'Something happend wrong try again!';

              //this.spinner.hide();
              this.loadingBar.complete();
              this.notFound = '';
            }

            return throwError(err)
          })
        )
        .subscribe((res: any) => {
          if (res.status === 200) {

            this.notFound = '';
            this.errormessage = '';
            this.pages = [];
            this.pager = res.body.data;
            for (let i = 1; i <= res.body.data.last_page; i++) {
              this.pages.push(i)
            }

            this.transcationList = res.body.data.data;

            //this.spinner.hide();
            this.loadingBar.complete();
          }
          else {
            this.transcationList = [];
            this.notFound = 'No Record Found';
            this.errormessage = '';
            //this.spinner.hide();
            this.loadingBar.complete();
          }
        })
    } catch (error) {
      //this.spinner.hide();
      this.loadingBar.complete();
    }

  }
  getRealAccountList(page) {

    //this.spinner.show();
    this.loadingBar.start();
    this.apiservice.get(`getRealApprovedAccount?page=${page}`)

      .pipe(
        catchError(err => {

          if (err.status === 404) {
           // this.spinner.hide();
           this.loadingBar.complete();
            this.NoRecordFound = true;

            this.errormessage = ''
          }
          else {
            this.errormessage = 'Something happend wrong try again!';

            //this.spinner.hide();
            this.loadingBar.complete();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )
      .subscribe((res: any) => {


        if (res.status === 200) {
          this.pagesAccount = [];
          this.pager = res.body.data;
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pagesAccount.push(i)
          }

          this.realaccountlist = res.body.data.data;
          this.errormessage = '';

          this.NoRecordFound = false;
          //this.spinner.hide();
          this.loadingBar.complete();

        }

        if (res.status === 404) {
          this.realaccountlist = []
          this.errormessage = '';
          this.NoRecordFound = true;
          //this.spinner.hide();
          this.loadingBar.complete();
        }
      })

  }


  realaccounttab() {
    var step1 = document.getElementById("stepContent1");
    step1.classList.add("active");
    var step2 = document.getElementById("stepContent2");
    step2.classList.remove("active");
    var step3 = document.getElementById("stepContent3");
    step3.classList.remove("active");
    var step4 = document.getElementById("step1");
    step4.classList.add("active");
    var step5 = document.getElementById("step2");
    step5.classList.remove("active");
    var step6 = document.getElementById("step3");
    step6.classList.remove("active");

  }
  paymentmethodtab() {
    var step1 = document.getElementById("stepContent1");
    step1.classList.remove("active");
    var step2 = document.getElementById("stepContent2");
    step2.classList.add("active");
    var step3 = document.getElementById("stepContent3");
    step3.classList.remove("active");
    var step4 = document.getElementById("step1");
    step4.classList.remove("active");
    var step5 = document.getElementById("step2");
    step5.classList.add("active");
    var step6 = document.getElementById("step3");
    step6.classList.remove("active");

  }
  payNow() {
    localStorage.removeItem('changeroutedeposit');
    this.router.navigateByUrl('users/depositmoney');
  }

}
