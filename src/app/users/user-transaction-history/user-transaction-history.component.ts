import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Component({
  selector: 'app-user-transaction-history',
  templateUrl: './user-transaction-history.component.html',
  styleUrls: ['./user-transaction-history.component.css']
})
export class UserTransactionHistoryComponent implements OnInit {

  transcationList: any;
  notFound: string;
  errormessage: string;
  constructor(private apiservice: apiService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTranscationlist();
  }

  getTranscationlist() {

    try {
      this.spinner.show();
      this.apiservice.get('getTransactions')
        .pipe(
          catchError(err => {

            if (err.status === 404) {
              this.spinner.hide();
              this.notFound = 'No Record Found';
              this.errormessage = ''
            }
            else {
              this.errormessage = 'Something happend wrong try again!';

              this.spinner.hide();
              this.notFound = '';
            }

            return throwError(err)
          })
        )
        .subscribe((res: any) => {
          if (res.status === 200) {

            this.notFound = '';
            this.errormessage = '';
            this.transcationList = res.body.data.data;
            this.spinner.hide();
          }
          else {
            this.transcationList = [];
            this.notFound = 'No Record Found';
            this.errormessage = '';
            this.spinner.hide();
          }
        })
    } catch (error) {
      this.spinner.hide();
    }

  }
}
