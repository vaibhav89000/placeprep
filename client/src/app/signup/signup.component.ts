import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor() {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.submitted = false;

    this.form = new FormGroup({
      name: new FormControl("",[Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    });
  }

  signup(value) {
    console.log('login');
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    console.log(value);
    this.submitted = false;
  }

}
