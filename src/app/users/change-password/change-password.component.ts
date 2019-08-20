import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MustMatch } from 'src/app/common/must-match-validator';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  message: string;
  token = localStorage.getItem('token')
  changepasswordForm: FormGroup
  errormessage: any;
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changepasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required]),
      token: new FormControl(this.token)
    },
      {
        validator: MustMatch('password', 'password_confirmation')
      }
    )
  }

  updatePassword(val) {
    this.spinner.show();
    this.apiservice.put('updatePassword', val)
      .pipe(
        catchError(err => {

          this.errormessage = 'Something wrong happend try again!';
          this.message = '';
          retry(2);
          this.spinner.hide();
          setTimeout(function () {
            this.errormessage = '';

          }.bind(this), 3000);
          return throwError(err)
        })
      )
      .subscribe((res: any) => {
        this.errormessage = ''
        this.message = res.body.message;
        this.spinner.hide();
        setTimeout(function () {
          this.message = '';

        }.bind(this), 3000);
      })
  }
}
