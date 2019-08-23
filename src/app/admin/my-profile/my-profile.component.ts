import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  message: string;
  name = localStorage.getItem('user_name');
  email = localStorage.getItem('email');
  post_code = localStorage.getItem('post_code');
  address = localStorage.getItem('address');
  city = localStorage.getItem('city');
  country = localStorage.getItem('country');
  phone = localStorage.getItem('phone')
  profileForm: FormGroup;
  errormessage: string;
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private loadingBar:LoadingBarService) { }

  ngOnInit() {

    this.profileForm = new FormGroup({
      name: new FormControl(this.name),
      email: new FormControl(this.email),
      number: new FormControl(this.phone),
      post_code: new FormControl(this.post_code),
      city: new FormControl(this.city),
      address: new FormControl(this.address),
      country: new FormControl(this.country)

    })
  }
  updateProfile(val) {
    //this.spinner.show();
    let profileObj:any={
      name:val.name
    }
    this.loadingBar.start();
    this.apiservice.put('admin/updateProfile', profileObj)
      .pipe(
        catchError(err => {

          this.errormessage = 'Something happend wrong try again!'
          //this.spinner.hide();
          this.loadingBar.complete();
          setTimeout(function () {
            this.errormessage = '';

          }.bind(this), 3000);
          return throwError(err)
        })
      )

      .subscribe((res: any) => {

        console.log("lodd", res.body.data)

        localStorage.setItem('user_name', res.body.data.name);

        localStorage.setItem('email', res.body.data.email);
        // localStorage.setItem('post_code', res.body.data.post_code);
        // localStorage.setItem('address', res.body.data.address);
        // localStorage.setItem('city', res.body.data.city);
        // localStorage.setItem('country', res.body.data.country);
        // localStorage.setItem('phone', res.body.data.number);
        this.message = res.body.message;
        //this.spinner.hide();
        this.loadingBar.complete();
        setTimeout(function () {
          this.message = '';

        }.bind(this), 3000);
      })

  }
}
