import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-demo-account-list',
  templateUrl: './demo-account-list.component.html',
  styleUrls: ['./demo-account-list.component.css']
})
export class DemoAccountListComponent implements OnInit {

  demoaccountlist: any;
  createdemoAccountForm: FormGroup;
  searchForm:FormGroup;
  NoRecordFound: boolean;
  errormessage: any;
  pager: {
    current_page: 1
  };
  pages = [];
  name: any;
  email: any;
  phone: any;
  accountid: any;
  constructor(private apiservice: apiService, private router: Router
    , private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.createdemoAccountForm = new FormGroup({
      lever: new FormControl(''),
      account_group: new FormControl(''),
      account_type: new FormControl('demo'),
      platform_type: new FormControl('meta trader 4'),
      currency: new FormControl('USD'),


    })
    this.searchForm=new FormGroup({
      search:new FormControl('')
    })

    this.route.queryParams.subscribe(x => this.demoAccountList(x.page || 1));

  }
  loadPage(page) {
    this.demoAccountList(page)
  }
  manage(name,email,phoneNumber,account_id){
    console.log("account id",account_id)
    this.name=name;
    this.email=email;
    this.phone=phoneNumber
    this.accountid=account_id
    
    $("#manageModal").modal()
  }
  search(val){
    //this.spinner.show();
    console.log("value",val.search)
    if(val.search){
    this.loadingBar.start();
    this.apiservice.get(`admin/searchDemoAccount/${val.search}`)
      .pipe(
        catchError(err => {
    
          if (err.status === 404) {
            this.loadingBar.complete();
            this.NoRecordFound = true;
            this.errormessage = ''
            this.pages = []
          }
          else {
            this.errormessage = 'Something happend wrong try again!';
    
            this.loadingBar.complete();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )
    
      .subscribe((res: any) => {
    
        if (res.status === 200) {
    
          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.demoaccountlist = res.body.data.data;
          this.errormessage = '';
          this.NoRecordFound = false;
          this.loadingBar.complete();
        }
        if (res.status === 404) {
          this.demoaccountlist = []
          this.pages = []
          this.NoRecordFound = true;
          this.errormessage = ''
          this.loadingBar.complete();
        }
    
      })
    }
    else{
      this.demoAccountList(1)
    }
      }
  disapprove(id,status){

    this.loadingBar.start();
    let statusobj:any={
      status:status
    }
    this.apiservice.put(`admin/updateDemoAccount/${id}`,statusobj)
    .pipe(
      catchError(err =>{

       this.loadingBar.complete();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{
      console.log("res",res);
      if(res.status===200){
        this.loadingBar.complete();
        document.getElementById('closedisapprove').click();
        document.getElementById('closemain').click();
        this.demoAccountList(1);
      }
    })
  }
  approve(id,status){

    this.loadingBar.start();
    let statusobj:any={
      status:status
    }
    this.apiservice.put(`admin/updateDemoAccount/${id}`,statusobj)
    .pipe(
      catchError(err =>{

       this.loadingBar.complete();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{
      console.log("res",res);
      if(res.status===200){
        
        this.loadingBar.complete();
        document.getElementById('closeapprove').click();
        document.getElementById('closemain').click();
        this.demoAccountList(1);
      }
    })
  }
  demoAccountList(page) {

    //this.spinner.show();
    this.loadingBar.start();
    this.apiservice.get(`admin/getDemoAccount?page=${page}`)
      .pipe(
        catchError(err => {

          if (err.status === 404) {
            this.loadingBar.complete();
            this.NoRecordFound = true;
            this.errormessage = ''
          }
          else {
            this.errormessage = 'Something happend wrong try again!';

            this.loadingBar.complete();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )

      .subscribe((res: any) => {

        if (res.status === 200) {

          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.demoaccountlist = res.body.data.data;
          this.errormessage = '';
          this.NoRecordFound = false;
          this.loadingBar.complete();
        }
        if (res.status === 404) {
          this.demoaccountlist = []
          this.NoRecordFound = true;
          this.errormessage = ''
          this.loadingBar.complete();
        }

      })
  }
  createDemoAccount(val) {


    //this.spinner.show();
    this.loadingBar.start();
    this.apiservice.post('storeAccount', val).subscribe((res => {

      document.getElementById('close').click();
      this.demoAccountList(1);
      //this.spinner.hide();
      this.loadingBar.complete();
    }))
  }
}
