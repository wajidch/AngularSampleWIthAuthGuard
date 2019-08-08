import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-demo-account-list',
  templateUrl: './demo-account-list.component.html',
  styleUrls: ['./demo-account-list.component.css']
})
export class DemoAccountListComponent implements OnInit {

  demoaccountlist:any;
  createdemoAccountForm:FormGroup;
  NoRecordFound:boolean;
  errormessage: any;
  constructor(private apiservice:apiService,private router:Router
    ,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.createdemoAccountForm=new FormGroup({
      lever:new FormControl(''),
      account_group:new FormControl(''),
      account_type:new FormControl('demo'),
      platform_type:new FormControl('meta trader 4'),
      currency:new FormControl('USD'),
      

    })
    this.demoAccountList();
  }


  demoAccountList(){

    this.spinner.show();
    this.apiservice.get('getDemoAccount')
    .pipe(
      catchError(err=>{

        this.errormessage='Something wrong happend try again!';
        this.NoRecordFound=false;
        this.spinner.hide();
        return throwError(err);
      })
    )
    
    .subscribe((res:any)=>{

      if(res.status===200){

      
      this.demoaccountlist=res.body.data;
      this.errormessage='';
      this.NoRecordFound=false;
      this.spinner.hide();
      }
      if(res.status===404)
      {
        this.demoaccountlist=[]
           this.NoRecordFound=true;
           this.errormessage=''
           this.spinner.hide();
      }

    })
  }
  createDemoAccount(val){

    
    this.spinner.show();
    this.apiservice.post('storeAccount',val).subscribe((res=>{

      document.getElementById('close').click();
      this.demoAccountList();
      this.spinner.hide();
    }))
  }
}
