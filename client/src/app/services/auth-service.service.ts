import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from './user.model';
import { rejects } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  signup(body){
    return this.http.put("http://localhost:8080/auth/signup",body).toPromise();
  }

  login(body){

    let loginPromise = new Promise((resolve, reject)=> {

      this.http.post("http://localhost:8080/auth/login",body)
      .toPromise()
      .then((res)=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });

    return loginPromise;
  }


}
