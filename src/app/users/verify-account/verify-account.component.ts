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
  statusArray:any;
  submitted:boolean=false;
  constructor(private _http: HttpClient,private apiservice:apiService
    ,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getStatus()
  }
  uploadBithCertificate(event: any,id) {
    console.log("id",id)
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
        if(id!=undefined){
        formData.append('id', id);
        }

        
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
          this.getStatus();
        })



      } 
    }

  }

  uploadDriverlicense(event: any,id) {
    console.log("id",id)
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
        if(id!=undefined){
          formData.append('id', id);
          }

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
          this.getStatus();
        })



      } 
    }

  }

  uploadAddressDocument(event: any,id) {
    console.log("id",id)
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
        if(id!=undefined){
          formData.append('id', id);
          }
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
          this.getStatus();
        })



      } 
    }

  }

  DocSubmit(){

    this.spinner.show();
    this.submitted=true;
    setTimeout(function() {
      this.submitted=false;
      
  }.bind(this), 3000);
    this.birthdayCertificateURl='';
    this.driverlicensURL='';
    this.addressURL='';
    this.getStatus();
    this.spinner.hide();


  }

  getStatus()
  {
     let statusobarray=[
      {
        id: 0,
        user_id: 0,
        type: "",
        file: "",
        status: "nodata",
        created_at: "",
        updated_at: ""
    },
    {
      id: 0,
      user_id: 0,
      type: "",
      file: "",
      status: "nodata",
      created_at: "",
      updated_at: ""
  },
  {
    id: 0,
    user_id: 0,
    type: "",
    file: "",
    status: "nodata",
    created_at: "",
    updated_at: ""
  }
    ];
    this.spinner.show();
    this.apiservice.get('profile')
    .pipe(
      catchError(err =>{
        if(err.status===404){
          this.spinner.hide();
         
          
        }
        this.spinner.hide();
        return throwError(err)
      })
    )
    .subscribe((res:any)=>{

     
      if(res.status===200){

        
        res.body.data.kycs.forEach(function(data ,index){
          
            console.log("aa",index)

            statusobarray[index]=data;
            // this.status[index].user_id=data.user_id;
            // this.status[index].type=data.type;
            // this.status[index].file=data.file;
            // this.status[index].status=data.status;
            // this.status[index].created_at=data.created_at;
            // this.status[index].updated_at=data.updated_at
            // this.status.push({
              
            //     id: data.id,
            //     user_id: data.user_id,
            //     type: data.type,
            //     file: data.file,
            //     status: data.status,
            //     created_at: data.created_at,
            //     updated_at: data.updated_at
            
            // });
           
          
         
         
        })
        console.log("sss",statusobarray)
        this.statusArray=statusobarray
        this.spinner.hide();
      }


    })
  }
}
