import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient,
    private LocalStorage:LocalStorageService) { }

    url = environment.produrl;


  fetchall(){
    let auth_token = this.LocalStorage.get("token");

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(`${this.url}blogs/get`, requestOptions);
  }

  fetchUserPost(){
    let auth_token = this.LocalStorage.get("token");

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(`${this.url}blogs/getsingle`, requestOptions);
  }

  fetchpostdetails(id){
    let auth_token = this.LocalStorage.get("token");

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(`${this.url}blogs/getblogdetail/${id}`, requestOptions).toPromise();
  }

  addPost(body){
    let auth_token = this.LocalStorage.get("token");

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    console.log("requestOptions",requestOptions);

    return this.http.post(`${this.url}blogs/post`,body, requestOptions).toPromise();
  }

  editPost(body){
    let auth_token = this.LocalStorage.get("token");

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    console.log("requestOptions",requestOptions);

    return this.http.post(`${this.url}blogs/updateblog`,body, requestOptions).toPromise();
  }

  starredPost(id){
    let auth_token = this.LocalStorage.get("token");
    console.log(auth_token);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    console.log("requestOptions",requestOptions);

    return this.http.get(`${this.url}blogs/starredblog/${id}`, requestOptions).toPromise();
  }

}
