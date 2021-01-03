import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceService} from './services/auth-service.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  shownav: boolean = false;

  constructor(private AuthService: AuthServiceService,
    private LocalStorage: LocalStorageService,
    private router: Router){

  }

  logout(){
    // console.log('clicked');
    this.shownav = !this.shownav;
    this.AuthService.logout();
  }

  login(){
    this.shownav = !this.shownav;
    if(this.LocalStorage.get('token')){
      this.router.navigate(['/placements']);
    }
    else{
      this.AuthService.logout();
    }
  }

  toggle(){
    // console.log('toggle');
    this.shownav = !this.shownav;
  }

  placements(){
    this.shownav = !this.shownav;
    this.router.navigate(['/placements']);
  }

  experiences(){
    this.shownav = !this.shownav;
    this.router.navigate(['/my-experiences']);
  }

  }
