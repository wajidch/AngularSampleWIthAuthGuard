import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
=======

>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

<<<<<<< HEAD
  message:string;
  token=localStorage.getItem('token')
  changepasswordForm:FormGroup
  errormessage: any;
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.changepasswordForm=new FormGroup({
      password:new FormControl('',[Validators.required]),
      password_confirmation:new FormControl('',[Validators.required]),
      token:new FormControl(this.token)
    })
  }

  updatePassword(val){
    this.spinner.show();
    this.apiservice.put('updatePassword',val)
    .pipe(
      catchError(err =>{

        this.errormessage='Something wrong happend try again!';
        this.message='';
        retry(2);
        this.spinner.hide();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{
      this.errormessage=''
      this.message=res.body.message;
      this.spinner.hide();
    })
  }
=======
  constructor() { }

  ngOnInit() {
  }

>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
}
