import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  birthdayCertificateURl: any;
  driverlicensURL: any;
  addressURL: any;
  imgSelected: boolean;
  imginprocess: boolean;
  filesizeerror: boolean;
  message: string;
  fileImage: any;
  statusArray: any;
  submitted: boolean = false;
  constructor(private _http: HttpClient, private apiservice: apiService
    , private spinner: NgxSpinnerService,
    private loadingBar:LoadingBarService) { }

  ngOnInit() {
    this.getStatus()
  }
  uploadBithCertificate(event: any, id) {
    console.log("id", id)
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      const file = event.target.files[0];
      console.log(file);
      console.log('filesize', file.size / 1000000);
      const filesize = file.size / 1000000;
      const type = file.type;
      if (filesize <= 5 && (type === 'image/jpeg' || type === 'image/png')) {
        this.message = ''
        this.filesizeerror = false;
        this.imgSelected = true;
        this.imginprocess = true;
        console.log('true');
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('type', 'Birth certificate');
        if (id != undefined) {
          formData.append('id', id);
        }


        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.birthdayCertificateURl = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        let fileObj = {
          type: 'Birth Certificate',
          file: formData
        }

        this.apiservice.post('fileUpload', formData).subscribe((res) => {
          console.log("responseee", res)
          this.getStatus();
        })



      }
    }

  }

  uploadDriverlicense(event: any, id) {
    console.log("id", id)
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      const file = event.target.files[0];
      console.log(file);
      console.log('filesize', file.size / 1000000);
      const filesize = file.size / 1000000;
      const type = file.type;
      if (filesize <= 5 && (type === 'image/jpeg' || type === 'image/png')) {
        this.message = ''
        this.filesizeerror = false;
        this.imgSelected = true;
        this.imginprocess = true;
        console.log('true');
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('type', 'Driving license');
        if (id != undefined) {
          formData.append('id', id);
        }

        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.driverlicensURL = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        let fileObj = {
          type: 'Birth Certificate',
          file: formData
        }
        this.apiservice.post('fileUpload', formData).subscribe((res) => {
          console.log("responseee", res);
          this.getStatus();
        })



      }
    }

  }

  uploadAddressDocument(event: any, id) {
    console.log("id", id)
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      const file = event.target.files[0];
      console.log(file);
      console.log('filesize', file.size / 1000000);
      const filesize = file.size / 1000000;
      const type = file.type;
      if (filesize <= 5 && (type === 'image/jpeg' || type === 'image/png')) {
        this.message = ''
        this.filesizeerror = false;
        this.imgSelected = true;
        this.imginprocess = true;
        console.log('true');
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('type', 'Address certificate');
        if (id != undefined) {
          formData.append('id', id);
        }
        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.addressURL = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        let fileObj = {
          type: 'Birth Certificate',
          file: formData
        }
        this.apiservice.post('fileUpload', formData).subscribe((res) => {
          console.log("responseee", res);
          this.getStatus();
        })



      }
    }

  }

  DocSubmit() {

    //this.spinner.show();
    this.loadingBar.start();
    this.submitted = true;
    setTimeout(function () {
      this.submitted = false;

    }.bind(this), 3000);
    this.birthdayCertificateURl = '';
    this.driverlicensURL = '';
    this.addressURL = '';
    this.getStatus();
    //this.spinner.hide();
    this.loadingBar.complete();


  }

  getStatus() {
    let statusobarray = [
      {
        id: 0,
        user_id: 0,
        type: "Birth certificate",
        file: "",
        status: "nodata",
        created_at: "",
        updated_at: ""
      },
      {
        id: 0,
        user_id: 0,
        type: "Driving license",
        file: "",
        status: "nodata",
        created_at: "",
        updated_at: ""
      },
      {
        id: 0,
        user_id: 0,
        type: "Address certificate",
        file: "",
        status: "nodata",
        created_at: "",
        updated_at: ""
      }
    ];
    //this.spinner.show();
    this.loadingBar.start();
    this.apiservice.get('profile')
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            //this.spinner.hide();
            this.loadingBar.complete();


          }
          //this.spinner.hide();
          this.loadingBar.complete();
          return throwError(err)
        })
      )
      .subscribe((res: any) => {


        if (res.status === 200) {


          res.body.data.kycs.forEach(function (data, index) {
            if(data.type==='Birth certificate'){
            statusobarray[0] = data;
            }
            if(data.type==='Driving license'){
              statusobarray[1] = data;
              }
              if(data.type==='Address certificate'){
                statusobarray[2] = data;
                }
          })

          this.statusArray = statusobarray
          console.log("array",this.statusArray)
          //this.spinner.hide();
          this.loadingBar.complete();
        }


      })
  }
}
