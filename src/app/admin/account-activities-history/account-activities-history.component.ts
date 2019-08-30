import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-activities-history',
  templateUrl: './account-activities-history.component.html',
  styleUrls: ['./account-activities-history.component.css']
})
export class AccountActivitiesHistoryComponent implements OnInit {

  transcationList: any;
  notFound: string;
  errormessage: string;
  pager: any;
  pages: any[];
  searchForm: FormGroup;
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getTranscationlist(1);
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })

  }

  loadPage(page) {
    this.getTranscationlist(page)
  }
  search(val) {
    try {
      //this.spinner.show();
      this.loadingBar.start();
      if (val.search) {
        this.apiservice.get(`admin/searchTransactionHistory/${val.search}`)
          .pipe(
            catchError(err => {

              if (err.status === 404) {
                //this.spinner.hide();
                this.pages = [];
                this.loadingBar.complete();
                this.notFound = 'No Record Found';
                this.errormessage = ''
              }
              else {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                 
                })
                this.pages = [];
                this.loadingBar.complete();
                this.notFound = '';
              }

              return throwError(err)
            })
          )
          .subscribe((res: any) => {
            if (res.status === 200) {

              this.notFound = '';
              this.errormessage = '';
              this.pager = res.body.data;
              this.pages = []
              for (let i = 1; i <= res.body.data.last_page; i++) {
                this.pages.push(i)
              }
              this.transcationList = res.body.data.data;
              this.loadingBar.complete();
            }
            else {
              this.transcationList = [];
              this.pages = []
              this.notFound = 'No Record Found';
              this.errormessage = '';
              this.loadingBar.complete();
            }
          })
      }
      else {
        this.getTranscationlist(1);
      }

    } catch (error) {
      this.loadingBar.complete();
    }


  }
  getTranscationlist(page) {

    try {
      //this.spinner.show();
      this.loadingBar.start();
      this.apiservice.get(`admin/getTransactionHistory?page=${page}`)
        .pipe(
          catchError(err => {

            if (err.status === 404) {
              //this.spinner.hide();
              this.pages = [];
              this.loadingBar.complete();
              this.notFound = 'No Record Found';
              this.errormessage = ''
            }
            else {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
               
              })
              this.pages = [];
              this.loadingBar.complete();
              this.notFound = '';
            }

            return throwError(err)
          })
        )
        .subscribe((res: any) => {
          this.loadingBar.complete();
          if (res.status === 200) {

            this.notFound = '';
            this.errormessage = '';
            this.pager = res.body.data;
            this.pages = []
            for (let i = 1; i <= res.body.data.last_page; i++) {
              this.pages.push(i)
            }
            this.transcationList = res.body.data.data;
            this.loadingBar.complete();
          }
          else {
            this.transcationList = [];
            this.pages = []
            this.notFound = 'No Record Found';
            this.errormessage = '';
            this.loadingBar.complete();
          }
        })
    } catch (error) {
      this.loadingBar.complete();
    }

  }
}
