import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
=======
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
<<<<<<< HEAD
userName=localStorage.getItem('user_name');
token=localStorage.getItem('token')
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router) { }

  ngOnInit() {
  }
  logout(){

    this.spinner.show();
    this.apiservice.post('auth/logout',this.token).subscribe((res:any)=>{
      
      localStorage.clear();

      this.spinner.hide();
      this.router.navigateByUrl('users/login');
    })

  }
=======

  constructor() { }

  ngOnInit() {
  }

>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
}
