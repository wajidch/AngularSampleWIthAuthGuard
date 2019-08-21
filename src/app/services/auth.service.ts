import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Headers, Response, Http } from '@angular/common/http';


/**
 * Generic class, an end point to call rest apis
 */
@Injectable()
export class authService implements OnInit {
    constructor(private route:Router){}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    

    isLoggedIn()
    {
        let token= localStorage.getItem('token');
        if(token){
         return true;
        }
        else{
            return false
        }
    }
}