import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  birthdayCertificateURl: any;
  driverlicensURL:any;
  addressURL:any;
  imgSelected: boolean;
  imginprocess: boolean;
  filesizeerror: boolean;
  message: string;
  fileImage: any;
  status:any;
  submitted:boolean=false;
  constructor(private _http: HttpClient,private apiservice:apiService
    ,private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }
  uploadBithCertificate(event: any) {
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
        
        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.birthdayCertificateURl = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      
        let fileObj={
          type:'Birth Certificate',
          file:formData
        }
        this.apiservice.post('fileUpload',formData).subscribe((res)=>{
          console.log("responseee",res)
         // this.getStatus();
        })



      } 
    }

  }

  uploadDriverlicense(event: any) {
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

        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.driverlicensURL = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      
        let fileObj={
          type:'Birth Certificate',
          file:formData
        }
        this.apiservice.post('fileUpload',formData).subscribe((res)=>{
          console.log("responseee",res);
          //this.getStatus();
        })



      } 
    }

  }

  uploadAddressDocument(event: any) {
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

        const reader = new FileReader();
        this.imgSelected = true;
        reader.onload = (value: any) => {
          this.addressURL = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      
        let fileObj={
          type:'Birth Certificate',
          file:formData
        }
        this.apiservice.post('fileUpload',formData).subscribe((res)=>{
          console.log("responseee",res);
          //this.getStatus();
        })



      } 
    }

  }

  DocSubmit(){

    this.spinner.show();
    this.submitted=true;
    this.birthdayCertificateURl='';
    this.driverlicensURL='';
    this.addressURL='';

    this.spinner.hide();


  }

  getStatus()
  {
    this.spinner.show();
    this.apiservice.get('profile')
    .pipe(
      catchError(err =>{

        this.spinner.hide();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{

      if(res.status===200){

        this.status=res.body.kycs;
        console.log(res.body.kycs)
        this.spinner.hide();
      }

    })
  }
}
