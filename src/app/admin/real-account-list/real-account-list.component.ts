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
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  realModal={
    lever:'Leverage1',
  account_group:'Group1',
  account_type:'real',
  platform_type:'meta trader 4',
  currency:'USD',
  user_id:0};
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.getAlluser();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
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
  getAlluser(){
    // this.loadingBar.start();
     this.apiservice.get(`admin/getAllUser`)
       .pipe(
         catchError(err => {
 
           if (err.status === 404) {
             //this.loadingBar.complete();
             //this.NoRecordFound = true;
             this.errormessage = ''
           }
           else {
             this.errormessage = 'Something happend wrong try again!';
 
             ///this.loadingBar.complete();
             //this.NoRecordFound = false;
           }
           return throwError(err);
         })
       )
 
       .subscribe((res: any) => {
 
         if (res.status === 200) {
 
          
           this.dropdownList = res.body.data;
           this.errormessage = '';
           //this.NoRecordFound = false;
           //this.loadingBar.complete();
         }
         if (res.status === 404) {
           this.dropdownList = []
           //this.NoRecordFound = true;
           this.errormessage = ''
           //this.loadingBar.complete();
         }
 
       })
   }
 
   onItemSelect(item: any) {
     console.log(item);
     this.realModal.user_id=item.id
   }
   onSelectAll(items: any) {
     console.log(items);
   }
 
   realaccount()
   {
 console.log("vall",this.realModal);
 this.loadingBar.start();
     this.apiservice.post('admin/createAccount', this.realModal).subscribe((res => {
 
       document.getElementById('closerealaccountmodel').click();
       this.getRealAccountList(1);
       //this.spinner.hide();
       this.loadingBar.complete();
     }))
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
  disapprove(accountid,status,group,lever){

    this.loadingBar.start();
    let statusobj:any={
      status:status,
      account_group:group,
      lever:lever
    }
    this.apiservice.put(`admin/updateRealAccount/${accountid}`,statusobj)
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
  approve(accountid,status,group,lever){

    console.log("group",this.realModal)
    this.loadingBar.start();
    let statusobj:any={
      status:status,
      account_group:group,
      lever:lever
    }
    this.apiservice.put(`admin/updateRealAccount/${accountid}`,statusobj)
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
