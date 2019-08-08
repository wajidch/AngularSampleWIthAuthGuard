import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Headers, Response, Http } from '@angular/common/http';
<<<<<<< HEAD
import { throwError } from 'rxjs';
=======
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


/**
 * Generic class, an end point to call rest apis
 */
@Injectable()
export class apiService implements OnInit {
<<<<<<< HEAD
    jsonHeaders = new HttpHeaders();
=======
    private jsonHeaders: HttpHeaders;
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
    token=localStorage.getItem('token');
    
    
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
<<<<<<< HEAD
        
        // this.jsonHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
        // this.jsonHeaders.set('Accept', 'application/json');
       
        // this.jsonHeaders.set("Access-Control-Allow-Origin", "*")
    }

    ngOnInit() {
       
    }

    get(url: string) {
        
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
     
       
        return this.http.get(this.apiUrl + url,{ headers,
            observe: 'response'})
=======
        this.jsonHeaders = new HttpHeaders();
        this.jsonHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        this.jsonHeaders.append('Accept', 'application/json');
        this.jsonHeaders.append('Authorization', 'bearer '+ this.token);
        this.jsonHeaders.append("Access-Control-Allow-Origin", "*")
    }

    ngOnInit() {
        console.log("tokennn",this.token);
    }

    get(url: string) {
        // const headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        //    headers.append("Access-Control-Allow-Origin", "*")

        return this.http.get(this.apiUrl + url, { headers: this.jsonHeaders })
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


    }

    post(url: string, body) {
<<<<<<< HEAD
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.post(this.apiUrl + url, body,{ headers,
            observe: 'response'})
=======

        return this.http.post(this.apiUrl + url, body, { headers: this.jsonHeaders })
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


    }
    postwithouttoken(url: string, body) {
       
<<<<<<< HEAD
        return this.http.post(this.apiUrl + url, body,{ headers: this.jsonHeaders,
            observe: 'response' })
=======
        return this.http.post(this.apiUrl + url, body,{ headers: this.jsonHeaders })
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


    }

    put(url: string, body: string) {
<<<<<<< HEAD
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.put(this.apiUrl + url, body, { headers,observe: 'response'})
=======

        return this.http.put(this.apiUrl + url, body, { headers: this.jsonHeaders })
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248


    }

    detele(url: string) {
<<<<<<< HEAD
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.delete(this.apiUrl + url, { headers,observe: 'response'})


    }
     
}

=======

        return this.http.delete(this.apiUrl + url, { headers: this.jsonHeaders })


    }

}
>>>>>>> 7ba362f67e60d3c13efd409f96d277cd50830248
