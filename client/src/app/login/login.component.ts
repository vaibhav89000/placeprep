import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private AuthServiceService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
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

    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    this.spinner.show();
    this.AuthServiceService.login(value)
    .then((res)=> {
      console.log(res);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
      this.form.reset();
        this.toastr.success('Success', 'User Created');
    })
    .catch((err)=>{
      console.log(err);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
      this.toastr.error('Failed', err.error.message);
    })
    this.submitted = false;
  }

}
