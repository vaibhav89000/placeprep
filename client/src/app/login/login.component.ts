import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor() {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.submitted = false;
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    });
  }

  login(value) {
    console.log('login');
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    console.log(value);
    this.submitted = false;
  }

}
