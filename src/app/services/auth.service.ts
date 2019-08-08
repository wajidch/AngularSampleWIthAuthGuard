import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Headers, Response, Http } from '@angular/common/http';


/**
 * Generic class, an end point to call rest apis
 */
@Injectable()
export class authService implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    

    getToken()
    {
        return localStorage.getItem('token')
    }
}