import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
userName=localStorage.getItem('user_name');
token=localStorage.getItem('admin_token')
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService) { }

  ngOnInit() {
  }
  logout(){

    //this.spinner.show();
    this.loadingBar.start();
    
    this.apiservice.post('admin/logout',this.token).subscribe((res:any)=>{
      
      localStorage.clear();
      localStorage.removeItem('token');
      //this.spinner.hide();
      this.loadingBar.complete();
      this.router.navigateByUrl('admin/login');
      this.loadingBar.complete();
    })

  }
}
