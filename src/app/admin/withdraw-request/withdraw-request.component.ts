import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { apiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent implements OnInit {

  withdrawtranscationList: any;
  notFound: string;
  errormessage: string;
  pager: any;
  pages: any[];
  searchForm: FormGroup;
  constructor(private loadingBar: LoadingBarService,
    private apiservice: apiService) { }

  ngOnInit() {
    this.getWithdrawTranscationlist(1);
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
  }

  search(val) {
    try {
      //this.spinner.show();
      if (val.search) {
        this.loadingBar.start();
        this.apiservice.get(`admin/searchWithdrawTransactionHistory/${val.search}`)
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
                this.errormessage = 'Something happend wrong try again!';
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
              this.withdrawtranscationList = res.body.data.data;
              this.loadingBar.complete();
            }
            else {
              this.withdrawtranscationList = [];
              this.pages = []
              this.notFound = 'No Record Found';
              this.errormessage = '';
              this.loadingBar.complete();
            }
          })
      }
      else {
        this.getWithdrawTranscationlist(1);
      }
    } catch (error) {
      this.loadingBar.complete();
    }
  }

  loadPage(page) {
    this.getWithdrawTranscationlist(page)
  }
  getWithdrawTranscationlist(page) {

    try {
      //this.spinner.show();
      this.loadingBar.start();
      this.apiservice.get(`admin/getWithdrawTransactionHistory?page=${page}`)
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
              this.errormessage = 'Something happend wrong try again!';
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
            this.withdrawtranscationList = res.body.data.data;
            this.loadingBar.complete();
          }
          else {
            this.withdrawtranscationList = [];
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
