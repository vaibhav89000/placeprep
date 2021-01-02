import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { rejects } from 'assert';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,
    private LocalStorage: LocalStorageService,
    private router:Router) {

    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();

  }

  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  public get userValue(): User {
    return this.userSubject.value;
  }


  signup(body) {
    return this.http.put("http://localhost:8080/auth/signup", body).toPromise();
  }

  login(body) {

    let loginPromise = new Promise((resolve, reject) => {

      this.http.post("http://localhost:8080/auth/login", body)
        .toPromise()
        .then((res: any) => {

          this.userSubject.next(res);
          // console.log('res',res);
          this.LocalStorage.clear();
          this.LocalStorage.set("token", res.token);
          this.LocalStorage.set("email", res.email);
          this.LocalStorage.set("userId", res.userId);
          this.startRefreshTokenTimer();
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

    return loginPromise;
  }

  private refreshTokenTimeout;
  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token

    const jwtToken = JSON.parse(
      atob(this.userValue.token.split(".")[1])
    );

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.logout(),
      timeout
    );
  }

  logout(){
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.LocalStorage.clear();
    this.router.navigate(['/login']);
  }


  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }




}
