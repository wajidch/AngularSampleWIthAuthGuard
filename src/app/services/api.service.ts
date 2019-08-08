import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Headers, Response, Http } from '@angular/common/http';
import { throwError } from 'rxjs';


/**
 * Generic class, an end point to call rest apis
 */
@Injectable()
export class apiService implements OnInit {
    jsonHeaders = new HttpHeaders();
    token=localStorage.getItem('token');
    
    
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
        
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


    }

    post(url: string, body) {
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.post(this.apiUrl + url, body,{ headers,
            observe: 'response'})


    }
    postwithouttoken(url: string, body) {
       
        return this.http.post(this.apiUrl + url, body,{ headers: this.jsonHeaders,
            observe: 'response' })


    }

    put(url: string, body: string) {
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.put(this.apiUrl + url, body, { headers,observe: 'response'})


    }

    detele(url: string) {
        const headers = new HttpHeaders()
        .set("Authorization", 'Bearer '+ this.token);
        return this.http.delete(this.apiUrl + url, { headers,observe: 'response'})


    }
     
}

