import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-real-account-list',
  templateUrl: './real-account-list.component.html',
  styleUrls: ['./real-account-list.component.css']
})
export class RealAccountListComponent implements OnInit {

  realaccountlist: any;
  createrealAccountForm: FormGroup;
  searchForm:FormGroup;
  leverGroupForm:FormGroup;
  NoRecordFound: boolean;
  errormessage: string;
  pager = {
    current_page: 1
  };
  pages = [];
  
  name: any;
  email: any;
  phone: any;
  accountid: any;
  accountgroup: any;
  leverages: any;
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.createrealAccountForm = new FormGroup({
      lever: new FormControl(''),
      account_group: new FormControl(''),
      account_type: new FormControl('real'),
      platform_type: new FormControl('meta trader 4'),
      currency: new FormControl('USD'),


    })
    this.searchForm=new FormGroup({
      search:new FormControl('')
    })
    this.leverGroupForm=new FormGroup({
      lever:new FormControl(''),
      account_group:new FormControl('')
    })

    this.route.queryParams.subscribe(x => this.getRealAccountList(x.page || 1));

  }

  loadPage(page) {
    this.getRealAccountList(page)
  }
  manage(name,email,phoneNumber
    ,account_id,lever,account_group){
    console.log("account id",account_group)
    this.name=name;
    this.email=email;
    this.phone=phoneNumber
    this.accountid=account_id;
    this.accountgroup=account_group;
    this.leverages=lever
    this.leverGroupForm=new FormGroup({
      lever:new FormControl(lever),
      account_group:new FormControl(account_group)
    })
    
    $("#manageModal").modal()
  }
  search(val){
     //this.spinner.show();
     this.loadingBar.start();
     if(val.search){
     this.apiservice.get(`admin/searchRealAccount/${val.search}`)
 
       .pipe(
         catchError(err => {
 
           if (err.status === 404) {
             this.loadingBar.complete();
             this.NoRecordFound = true;
             this.errormessage = '';
             this.pages = [];
           }
           else {
             this.errormessage = 'Something happend wrong try again!';
 
             this.loadingBar.complete();
             this.NoRecordFound = false;
             this.pages = [];
           }
           return throwError(err);
         })
       )
       .subscribe((res: any) => {
 
 
         if (res.status === 200) {
           this.loadingBar.complete();
           this.pager = res.body.data;
           this.pages = []
           for (let i = 1; i <= res.body.data.last_page; i++) {
             this.pages.push(i)
           }
           this.realaccountlist = res.body.data.data;
           this.errormessage = '';
           this.NoRecordFound = false;
           //this.spinner.hide();
 
         }
 
         if (res.status === 404) {
           this.realaccountlist = []
           this.loadingBar.complete();
           this.errormessage = '';
           this.NoRecordFound = true;
           //this.spinner.hide();
         }
       })
      }
      else{
        this.getRealAccountList(1);
      }
  }
  getRealAccountList(page) {

    //this.spinner.show();
    this.loadingBar.start()
    this.apiservice.get(`admin/getRealAccount?page=${page}`)

      .pipe(
        catchError(err => {

          if (err.status === 404) {
            this.loadingBar.complete();
            this.NoRecordFound = true;
            this.errormessage = '';
            this.pages = [];
          }
          else {
            this.errormessage = 'Something happend wrong try again!';
            this.pages = [];
            this.loadingBar.complete();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )
      .subscribe((res: any) => {


        if (res.status === 200) {
          this.loadingBar.complete();
          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.realaccountlist = res.body.data.data;
         
          this.errormessage = '';
          this.NoRecordFound = false;
          //this.spinner.hide();

        }

        if (res.status === 404) {
          this.realaccountlist = [];
          this.loadingBar.complete();
          this.errormessage = '';
          this.NoRecordFound = true;
          //this.spinner.hide();
        }
      })

  }
  createRealAccount(val) {


    this.spinner.show();
    this.apiservice.post('storeAccount', val).subscribe((res => {

      document.getElementById('close').click();
      this.getRealAccountList(1);
      this.spinner.hide();
    }))
  }
  disapprove(id,status,group,lever){

    this.loadingBar.start();
    let statusobj:any={
      status:status,
      account_group:group,
      lever:lever
    }
    this.apiservice.put(`admin/updateRealAccount/${id}`,statusobj)
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
        this.getRealAccountList(1);
      }
    })
  }
  approve(id,status,group,lever){

    console.log("group",group,lever)
    this.loadingBar.start();
    let statusobj:any={
      status:status,
      account_group:group,
      lever:lever
    }
    this.apiservice.put(`admin/updateRealAccount/${id}`,statusobj)
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
        this.getRealAccountList(1);
      }
    })
  }
}