import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }

  fetchall(){
    let auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmZGY1NTU2ZTA4OThkMTFhNDcxZjgxZCIsImlhdCI6MTYwOTQ2NjE3NCwiZXhwIjoxNjA5NDY5Nzc0fQ.6laPx2aDlSyXX2vq9f5QDAynQ4485JddFpU19aR-u-s";
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${auth_token}`
    // })

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

}
