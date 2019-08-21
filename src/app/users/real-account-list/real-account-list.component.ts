import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-real-account-list',
  templateUrl: './real-account-list.component.html',
  styleUrls: ['./real-account-list.component.css']
})
export class RealAccountListComponent implements OnInit {

  realaccountlist: any;
  createrealAccountForm: FormGroup;
  NoRecordFound: boolean;
  errormessage: string;
  pager = {
    current_page: 1
  };
  pages = [];
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.createrealAccountForm = new FormGroup({
      lever: new FormControl(''),
      account_group: new FormControl(''),
      account_type: new FormControl('real'),
      platform_type: new FormControl('meta trader 4'),
      currency: new FormControl('USD'),


    })

    this.route.queryParams.subscribe(x => this.getRealAccountList(x.page || 1));

  }

  loadPage(page) {
    this.getRealAccountList(page)
  }
  getRealAccountList(page) {

    //this.spinner.show();
    this.loadingBar.start()
    this.apiservice.get(`getRealAccount?page=${page}`)

      .pipe(
        catchError(err => {

          if (err.status === 404) {
            this.loadingBar.complete();
            this.NoRecordFound = true;
            this.errormessage = ''
          }
          else {
            this.errormessage = 'Something happend wrong try again!';

            this.loadingBar.complete();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )
      .subscribe((res: any) => {


        if (res.status === 200) {
          this.loadingBar.complete();
          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.realaccountlist = res.body.data.data;
          this.errormessage = '';
          this.NoRecordFound = false;
          this.spinner.hide();

        }

        if (res.status === 404) {
          this.realaccountlist = []
          this.errormessage = '';
          this.NoRecordFound = true;
          this.spinner.hide();
        }
      })

  }
  createRealAccount(val) {


    this.spinner.show();
    this.apiservice.post('storeAccount', val).subscribe((res => {

      document.getElementById('close').click();
      this.getRealAccountList(1);
      this.spinner.hide();
    }))
  }

}
