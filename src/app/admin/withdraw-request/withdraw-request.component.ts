import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { apiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent implements OnInit {

  withdrawtranscationList: any;
  notFound: string;
  errormessage: string;
  pager: any;
  pages: any[];
  searchForm: FormGroup;
  withdrawForm:FormGroup;
  name: any;
  email: any;
  phone: any;
  accountid: any;
  accountgroup: any;
  amount: any;
  currency: any;
  transactionsid: any;
  file: any;
  constructor(private loadingBar: LoadingBarService,
    private apiservice: apiService) { }

  ngOnInit() {
    this.getWithdrawTranscationlist(1);
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
    this.withdrawForm=new FormGroup({
      file:new FormControl('',[Validators.required])
    })
  }

  search(val) {
    try {
      //this.spinner.show();
      if (val.search) {
        this.loadingBar.start();
        this.apiservice.get(`admin/searchWithdrawRequest/${val.search}`)
          .pipe(
            catchError(err => {

              if (err.status === 404) {
                //this.spinner.hide();
                this.pages = [];
                this.loadingBar.complete();
                this.notFound = 'No Record Found';
                this.errormessage = ''
              }
              else {
                this.errormessage = 'Something happend wrong try again!';
                this.pages = [];
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
              this.pager = res.body.data;
              this.pages = []
              for (let i = 1; i <= res.body.data.last_page; i++) {
                this.pages.push(i)
              }
              this.withdrawtranscationList = res.body.data.data;
              this.loadingBar.complete();
            }
            else {
              this.withdrawtranscationList = [];
              this.pages = []
              this.notFound = 'No Record Found';
              this.errormessage = '';
              this.loadingBar.complete();
            }
          })
      }
      else {
        this.getWithdrawTranscationlist(1);
      }
    } catch (error) {
      this.loadingBar.complete();
    }
  }

  loadPage(page) {
    this.getWithdrawTranscationlist(page)
  }
  manage(name,email,phoneNumber
    ,account_id,amount,currency,
    account_group,transactionid){
    
      console.log("ss",account_id,account_group)
    this.name=name;
    this.email=email;
    this.phone=phoneNumber
    this.accountid=account_id;
    this.accountgroup=account_group;
    this.amount=amount;
    this.currency=currency;
    this.transactionsid=transactionid;
  
    
    
    
    $("#manageModal").modal();
  }
  getWithdrawTranscationlist(page) {

    try {
      //this.spinner.show();
      this.loadingBar.start();
      this.apiservice.get(`admin/getWithdrawRequest?page=${page}`)
        .pipe(
          catchError(err => {

            if (err.status === 404) {
              //this.spinner.hide();
              this.pages = [];
              this.loadingBar.complete();
              this.notFound = 'No Record Found';
              this.errormessage = ''
            }
            else {
              this.errormessage = 'Something happend wrong try again!';
              this.pages = [];
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
            this.pager = res.body.data;
            this.pages = []
            for (let i = 1; i <= res.body.data.last_page; i++) {
              this.pages.push(i)
            }
            this.withdrawtranscationList = res.body.data.data;
            this.loadingBar.complete();
          }
          else {
            this.withdrawtranscationList = [];
            this.pages = []
            this.notFound = 'No Record Found';
            this.errormessage = '';
            this.loadingBar.complete();
          }
        })
    } catch (error) {
      this.loadingBar.complete();
    }

  }
  uploadWithdrawRecipt(event: any) {
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      this.file = event.target.files[0];
      console.log(this.file);
      
      
    }

  }
  disapprove(transactionid,status){

    this.loadingBar.start();
      const formData:any = new FormData();
        formData.append('file', this.file, this.file.name);
        formData.append('status', status);
    let statusobj:any={
      status:status,
      file:this.file
   
    }

    
    this.apiservice.post(`admin/updateWithdrawRequest/${transactionid}`,formData)
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
        this.getWithdrawTranscationlist(1);
      }
    })
  }
  approve(transactionid,status){

   
    this.loadingBar.start();
    const formData:any = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('status', status);
    let statusobj:any={
      status:status,
     
    }
    this.apiservice.post(`admin/updateWithdrawRequest/${transactionid}`,formData)
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
        this.getWithdrawTranscationlist(1);
      }
    })
  }

}
