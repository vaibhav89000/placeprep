import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }

  fetchall(){
    let auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmZGY1NTU2ZTA4OThkMTFhNDcxZjgxZCIsImlhdCI6MTYwOTQ2NTQ2NSwiZXhwIjoxNjA5NDY5MDY1fQ.U24iLNf03i2s4_Tz4Ee7S-9zT9UaQhPgMmAdPBMZawA";
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get("http://localhost:8080/blogs/get");
  }

}
