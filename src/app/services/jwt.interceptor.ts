import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    
  } from '@angular/common/http';


import { Observable} from 'rxjs';
import { tap } from "rxjs/operators"
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router:Router,private spinner:NgxSpinnerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
       

      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

            this.spinner.hide();
            localStorage.clear();
            this.router.navigateByUrl('admin/login');


        
        }
      }
    }));
    
  }
}