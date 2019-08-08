import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-real-account-list',
  templateUrl: './real-account-list.component.html',
  styleUrls: ['./real-account-list.component.css']
})
export class RealAccountListComponent implements OnInit {

  realaccountlist:any;
  createrealAccountForm:FormGroup;
  NoRecordFound: boolean;
  errormessage: string;
  constructor(private apiservice:apiService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.createrealAccountForm=new FormGroup({
      lever:new FormControl(''),
      account_group:new FormControl(''),
      account_type:new FormControl('real'),
      platform_type:new FormControl('meta trader 4'),
      currency:new FormControl('USD'),
      

    })
    this.getRealAccountList();
  }

  getRealAccountList(){

    this.spinner.show();
    this.apiservice.get('getRealAccount')
    
    .pipe(
      catchError(err =>{
        this.errormessage=err.error.data;

        this.spinner.hide();
        this.NoRecordFound=false;
        return throwError(err);
      })
    )
    .subscribe((res:any)=>{

      
      if(res.status===200)
      {
        this.realaccountlist=res.body.data;
        this.errormessage='';
        this.NoRecordFound=false;
        this.spinner.hide();

      }
     
      if(res.status===404)
      {
        this.realaccountlist=[]
        this.errormessage='';
           this.NoRecordFound=true;
           this.spinner.hide();
      }
    })

  }
  createRealAccount(val){

    
    this.spinner.show();
    this.apiservice.post('storeAccount',val).subscribe((res=>{

      document.getElementById('close').click();
      this.getRealAccountList();
      this.spinner.hide();
    }))
  }

}
