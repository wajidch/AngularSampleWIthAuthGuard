import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-demo-account-list',
  templateUrl: './demo-account-list.component.html',
  styleUrls: ['./demo-account-list.component.css']
})
export class DemoAccountListComponent implements OnInit {

  demoaccountlist: any;
  createdemoAccountForm: FormGroup;
  NoRecordFound: boolean;
  errormessage: any;
  pager: {
    current_page:1
  };
  pages = [];
  constructor(private apiservice: apiService, private router: Router
    , private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createdemoAccountForm = new FormGroup({
      lever: new FormControl(''),
      account_group: new FormControl(''),
      account_type: new FormControl('demo'),
      platform_type: new FormControl('meta trader 4'),
      currency: new FormControl('USD'),


    })

    this.route.queryParams.subscribe(x => this.demoAccountList(x.page || 1));

  }
  loadPage(page) {
    this.demoAccountList(page)
  }

  demoAccountList(page) {

    this.spinner.show();
    this.apiservice.get(`getDemoAccount?page=${page}`)
      .pipe(
        catchError(err => {

          if (err.status === 404) {
            this.spinner.hide();
            this.NoRecordFound = true;
            this.errormessage = ''
          }
          else {
            this.errormessage = 'Something happend wrong try again!';

            this.spinner.hide();
            this.NoRecordFound = false;
          }
          return throwError(err);
        })
      )

      .subscribe((res: any) => {

        if (res.status === 200) {

          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.demoaccountlist = res.body.data.data;
          this.errormessage = '';
          this.NoRecordFound = false;
          this.spinner.hide();
        }
        if (res.status === 404) {
          this.demoaccountlist = []
          this.NoRecordFound = true;
          this.errormessage = ''
          this.spinner.hide();
        }

      })
  }
  createDemoAccount(val) {


    this.spinner.show();
    this.apiservice.post('storeAccount', val).subscribe((res => {

      document.getElementById('close').click();
      this.demoAccountList(1);
      this.spinner.hide();
    }))
  }
}
