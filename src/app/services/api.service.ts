import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Headers, Response, Http } from '@angular/common/http';


/**
 * Generic class, an end point to call rest apis
 */
@Injectable()
export class apiService implements OnInit {
    private jsonHeaders: HttpHeaders;
    token=localStorage.getItem('token');
    
    
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
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


    }

    post(url: string, body) {

        return this.http.post(this.apiUrl + url, body, { headers: this.jsonHeaders })


    }
    postwithouttoken(url: string, body) {
       
        return this.http.post(this.apiUrl + url, body,{ headers: this.jsonHeaders })


    }

    put(url: string, body: string) {

        return this.http.put(this.apiUrl + url, body, { headers: this.jsonHeaders })


    }

    detele(url: string) {

        return this.http.delete(this.apiUrl + url, { headers: this.jsonHeaders })


    }

}