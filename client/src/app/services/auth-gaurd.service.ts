import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthServiceService } from './auth-service.service';
import {LocalStorageService} from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router:Router,
    private authService:AuthServiceService,
    private LocalStorage : LocalStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const user = this.authService.userValue;
    // if (user) {
    //   // logged in so return true
    //   return true;
    // } else {
    //   // not logged in so redirect to login page with the return url
    //   this.router.navigate(["/"], {
    //     queryParams: { returnUrl: state.url },
    //   });
    //   return false;
    // }

    console.log('checking gaurds');
    if (this.LocalStorage.get("token")) {
      return true;
    } else {
      this.router.navigate(["/"]);
    }
    }
}
