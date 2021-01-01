import { Component } from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private AuthService: AuthServiceService){

  }

  logout(){
    console.log('clicked');
    this.AuthService.logout();
  }
}
