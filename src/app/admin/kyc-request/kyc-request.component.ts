import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment'
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-kyc-request',
  templateUrl: './kyc-request.component.html',
  styleUrls: ['./kyc-request.component.css']
})
export class KycRequestComponent implements OnInit {
  type: any;
  NoRecordFound: string;
  errormessage: string;

  constructor(private apiservice:apiService,
    private loadingBar:LoadingBarService,
    private route: ActivatedRoute,) { }

  kyclist:any;
  name:string;
  email:string;
  url:any;
  kycid:any;
  searchForm:FormGroup;
  pager: {
    current_page: 1
  };
  pages = [];
  ngOnInit() {
    this.searchForm=new FormGroup({
      search:new FormControl('')
    })
    this.route.queryParams.subscribe(x => this.getKyclist(x.page || 1));

  }

  search(val){
    try {
      this.loadingBar.start();
      this.apiservice.get(`admin/searchKyc/${val.search}`)

    .pipe(
      catchError(err =>{
        
        if (err.status === 404) {
          this.loadingBar.complete();
          this.pages = []
          this.NoRecordFound = 'New Request Not Found';
          this.errormessage = ''
        }
        else {
          this.errormessage = 'Something happend wrong try again!';

          this.loadingBar.complete();
          this.NoRecordFound = '';
        }
        return throwError(err);
       
      })
    )
    .subscribe((res:any)=>{
      
      this.NoRecordFound=''
      this.errormessage=''
      this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
      this.kyclist=res.body.data.data;
      this.loadingBar.complete();
  
    })
    } catch (error) {
      

    }
  }
  loadPage(page) {
    this.getKyclist(page)
  }

  manage(name,email,imageurl,kyctype,kyc_id){

    console.log("name,email",name,email);
    this.name=name;
    this.email=email;
    this.url=`${environment.imageUrl}/${imageurl}`;
    this.type=kyctype;
this.kycid=kyc_id
    $("#myModal2").modal()
    
  }
  getKyclist(page){
    try {
      this.loadingBar.start();
      this.apiservice.get(`admin/getKyc?page=${page}`)

    .pipe(
      catchError(err =>{
        
        if (err.status === 404) {
          this.loadingBar.complete();
          this.NoRecordFound = 'New Request Not Found';
          this.errormessage = ''
        }
        else {
          this.errormessage = 'Something happend wrong try again!';

          this.loadingBar.complete();
          this.NoRecordFound = '';
        }
        return throwError(err);
       
      })
    )
    .subscribe((res:any)=>{
      
      this.NoRecordFound=''
      this.errormessage=''
      this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
      this.kyclist=res.body.data.data;
      this.loadingBar.complete();
  
    })
    } catch (error) {
      

    }
    
  }
  OpenApprovealert(kycid,status){
    Swal.fire({
      title: 'Are you sure want to approve?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.approve(kycid,status);
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

  OpendisApprovealert(kycid,status){
    Swal.fire({
      title: 'Are you sure want to disapprove?',

      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.disapprove(kycid,status);
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
  disapprove(kycid,status){

    this.loadingBar.start();
    let statusobj:any={
      status:status
    }
    this.apiservice.put(`admin/updateKyc/${kycid}`,statusobj)
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
        this.getKyclist(1);
      }
    })
  }
  approve(kycid,status){

    this.loadingBar.start();
    let statusobj:any={
      status:status
    }
    this.apiservice.put(`admin/updateKyc/${kycid}`,statusobj)
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
        this.getKyclist(1);
      }
    })
  }
}
