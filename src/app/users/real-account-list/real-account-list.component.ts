import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-real-account-list',
  templateUrl: './real-account-list.component.html',
  styleUrls: ['./real-account-list.component.css']
})
export class RealAccountListComponent implements OnInit {

  accountList:any;
  constructor(private apiservice:apiService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getRealAccountList
  }

  getRealAccountList(){

    this.apiservice.get('getAccount').subscribe((res:any)=>{

      
      this.accountList=res.data;
      
    })

  }

}
