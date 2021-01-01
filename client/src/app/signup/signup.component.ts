import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    });
  }

  signup(value) {
    // console.log('signup',value);
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    this.spinner.show();
    this.AuthServiceService.signup(value)
      .then((res) => {

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

        this.form.reset();
        this.toastr.success('Success', 'User Created');
      })
      .catch((err) => {

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

        if ((err.error.data).length > 0) {
          console.log('Error', err.error.data);
          err.error.data.forEach(err => {
            console.log(err.msg);
            this.toastr.error('Failed', err.msg);
          });
        }
        else {
          this.toastr.error('Failed', err.msg);
        }
      });

    console.log(value);
    this.submitted = false;
  }

}
