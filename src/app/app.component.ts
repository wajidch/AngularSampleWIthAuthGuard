import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiService } from './services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { authService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser:any;
  constructor( public router: Router,
    private apiservice:apiService,
    private loadingBar:LoadingBarService,
    private authenticationService: authService) {
      
     }

  ngOnInit() {
   
    this.currentUser=localStorage.getItem('admin_token');
  }
  
}
