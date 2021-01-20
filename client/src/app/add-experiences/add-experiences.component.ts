import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-add-experiences',
  templateUrl: './add-experiences.component.html',
  styleUrls: ['./add-experiences.component.css']
})
export class AddExperiencesComponent implements OnInit {

  form;
  submitted: any;
  roles;
  offers;
  constructor(private CommonService: CommonServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      this.submitted = false;
    }

  ngOnInit(): void {
    this.submitted = false;
    this.roles = [
      "Software tester",
        "Web developer",
        "Systems analyst",
        "Business analyst",
        "Product manager",
        "Network architect",
        "Software engineer",
        "Software developer",
        "Full-stack developer",
        "Engineering manager",
        "User interface designer",
        "Database administrator",
        "Cloud computing engineer",
        "Information security analyst",
        "Computer science professor",
        "Chief information security officer",
        "Software quality assurance manager",
        "Information technology specialist",
        "Mobile application designer or developer",
        "Research and development (R&D) scientist",
        "Computer scientist or computer science researcher",
        "Artificial intelligence and machine learning engineer"
    ]
    this.offers = ["Full Time","Contract","Intern","PPO"];
    this.form = new FormGroup({
      company: new FormControl("",[Validators.required]),
      package: new FormControl("",[Validators.required]),
      typeOffer: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required]),
      rounds: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required])
    });
  }

  create(form){
    this.submitted = true;
    if(!this.form.valid){
      return;
    }

    console.log(form);
    this.spinner.show();
    this.CommonService.addPost(form).then((res)=>{
      this.submitted = false;
      this.spinner.hide();
      this.toastr.success('Success', 'Blog is added Successful');
      this.form.reset();
    })
    .catch((err)=>{
      this.submitted = false;
      this.spinner.hide();
      this.toastr.error('Failed', err.error.message);
    });
  }

}
