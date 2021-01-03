import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient,
    private LocalStorage:LocalStorageService) { }

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

    return this.http.get("http://localhost:8080/blogs/get", requestOptions);
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

    return this.http.get("http://localhost:8080/blogs/getsingle", requestOptions);
  }

}
