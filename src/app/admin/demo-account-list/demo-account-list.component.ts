import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-demo-account-list',
  templateUrl: './demo-account-list.component.html',
  styleUrls: ['./demo-account-list.component.css']
})
export class DemoAccountListComponent implements OnInit {

  demoaccountlist: any;
  demoForm: FormGroup;
  searchForm:FormGroup;
  leverGroupForm:FormGroup;
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
  accountgroup: any;
  leverages: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  demoModal={lever:'Leverage1',
  account_group:'Group1',
  account_type:'demo',
  platform_type:'meta trader 4',
  currency:'USD',
  user_id:0};
  constructor(private apiservice: apiService, private router: Router
    , private spinner: NgxSpinnerService,
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
    this.demoForm = new FormGroup({
      lever: new FormControl(''),
      account_group: new FormControl(''),
      account_type: new FormControl('demo'),
      platform_type: new FormControl('meta trader 4'),
      currency: new FormControl('USD'),
      user_id:new FormControl('')


    })
    

    this.searchForm=new FormGroup({
      search:new FormControl('')
    })
    this.leverGroupForm=new FormGroup({
      lever:new FormControl(''),
      account_group:new FormControl('')
    })
    this.route.queryParams.subscribe(x => this.demoAccountList(x.page || 1));

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
    this.demoModal.user_id=item.id
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  demoaccount()
  {
console.log("vall",this.demoModal)
this.loadingBar.start();
    this.apiservice.post('admin/createAccount', this.demoModal).subscribe((res => {

      document.getElementById('close').click();
      this.demoAccountList(1);
      //this.spinner.hide();
      this.loadingBar.complete();
    }))
  }
  loadPage(page) {
    this.demoAccountList(page)
  }
  manage(name,email,phoneNumber
    ,account_id,lever,account_group){
    console.log("account id",account_id)
    this.name=name;
    this.email=email;
    this.phone=phoneNumber
    this.accountid=account_id
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

      OpenApprovealert(accountid,status,group,lever){
        Swal.fire({
          title: 'Are you sure want to approve?',
    
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
    
            this.approve(accountid,status,group,lever);
            Swal.fire(
              'Approved!',
              'Your Request has been approved.',
              'success'
            )
            
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        })
      }
    
      OpendisApprovealert(accountid,status,group,lever){
        Swal.fire({
          title: 'Are you sure want to disapprove?',
    
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
    
            this.disapprove(accountid,status,group,lever);
            Swal.fire(
              'Diapproved!',
              'Your Request has been disapproved.',
              'success'
            )
            
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        })
      }
  disapprove(id,status,lever,group){

    this.loadingBar.start();
    let statusobj:any={
      status:status,
      lever:lever,
      account_group:group
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
  approve(id,status,lever,group){

    this.loadingBar.start();
    let statusobj:any={
      status:status,
      lever:lever,
      account_group:group
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
        this.loadingBar.complete();
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
