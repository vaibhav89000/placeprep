import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  signup(body){
    return this.http.put("http://localhost:8080/auth/signup",body).toPromise();
  }
}
