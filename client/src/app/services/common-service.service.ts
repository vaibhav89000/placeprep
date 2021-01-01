import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }

  fetchall(){
    let auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmZGY1NTU2ZTA4OThkMTFhNDcxZjgxZCIsImlhdCI6MTYwOTQ2OTc1NywiZXhwIjoxNjA5NDczMzU3fQ.j-Seu7yJQjfSZbn4JrUJ0KZLQGOM5g2FFFt9YxJ9zDc";
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
