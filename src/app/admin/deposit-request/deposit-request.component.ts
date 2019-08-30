import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { apiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-deposit-request',
  templateUrl: './deposit-request.component.html',
  styleUrls: ['./deposit-request.component.css']
})
export class DepositRequestComponent implements OnInit {
  deposittranscationList: any;
  notFound: string;
  errormessage: string;
  pager: any;
  pages: any[];
  searchForm:FormGroup;
  name: any;
  email: any;
  phone: any;
  accountid: any;
  accountgroup: any;
  amount: any;
  currency: any;

  

  depositDetailModel={
bankname:'',
accountonwer:'',
iban:'',
message:'',
paymentmethod:''
  }
  transactionsid: any;
  constructor(private loadingBar:LoadingBarService,
    private apiservice:apiService) { }

  ngOnInit() {
    this.getDepositTranscationlist(1);
    this.searchForm=new FormGroup({
      search:new FormControl('')
    })
  }
  loadPage(page) {
    this.getDepositTranscationlist(page)
  }
  OpenApprovealert(transactionid,status){
    Swal.fire({
      title: 'Are you sure want to approve?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.approve(transactionid,status);
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

  OpendisApprovealert(transactionid,status){
    Swal.fire({
      title: 'Are you sure want to disapprove?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.disapprove(transactionid,status);
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
  
  search(val){
    try {
      //this.spinner.show();

      if(val.search){
      this.loadingBar.start();
      this.apiservice.get(`admin/searchDepositRequest/${val.search}`)
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
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
               
              })
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
            this.deposittranscationList = res.body.data.data;
            this.loadingBar.complete();
          }
          else {
            this.deposittranscationList = [];
            this.pages = []
            this.notFound = 'No Record Found';
            this.errormessage = '';
            this.loadingBar.complete();
          }
        })
      }
      else{
        this.getDepositTranscationlist(1)
      }
    } catch (error) {
      this.loadingBar.complete();
    }
}

manage(name,email,phoneNumber
  ,account_id,amount,currency,
  account_group,bankname,accountonwer,
  iban,message,paymentmethod,transactions_id){
  
    console.log("ss",currency)
  this.name=name;
  this.email=email;
  this.phone=phoneNumber
  this.accountid=account_id;
  this.accountgroup=account_group;
  this.amount=amount;
  this.currency=currency;
  this.transactionsid=transactions_id;

  this.depositDetailModel={
    bankname:bankname,
    accountonwer:accountonwer,
    iban:iban,
    message:message,
    paymentmethod:paymentmethod
  }
  
  
  $("#manageModal").modal()
}
  getDepositTranscationlist(page) {

    try {
      //this.spinner.show();getDepositRequest
      this.loadingBar.start();
      this.apiservice.get(`admin/getDepositRequest?page=${page}`)
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
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
               
              })
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
            this.deposittranscationList = res.body.data.data;
            this.loadingBar.complete();
          }
          else {
            this.deposittranscationList = [];
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

  disapprove(transactionid,status){

    this.loadingBar.start();
    let statusobj:any={
      status:status,
   
    }
    this.apiservice.put(`admin/updateDepositRequest/${transactionid}`,statusobj)
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
        this.getDepositTranscationlist(1);
      }
    })
  }
  approve(transactionid,status){

   
    this.loadingBar.start();
    let statusobj:any={
      status:status,
     
    }
    this.apiservice.put(`admin/updateDepositRequest/${transactionid}`,statusobj)
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
        this.getDepositTranscationlist(1);
      }
    })
  }
}
