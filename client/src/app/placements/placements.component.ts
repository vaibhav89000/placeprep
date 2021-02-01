import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.css']
})
export class PlacementsComponent implements OnInit {

  blogs: any;
  showBlogs: any = [];
  filterblogs: any = [];
  form: FormGroup;
  options: any = [];

  constructor(private CommonService: CommonServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchAll();

    this.options = [
      "company",
      "package",
      "typeOffer",
      "role",
      "rounds",
    ]

    this.form = new FormGroup({
      filter: new FormControl("company"),
      search: new FormControl("")
    })

    this.form.get('search')
      .valueChanges
      .subscribe((res) => {

        if (res) {

          this.showBlogs = [];

          if (this.form.get('filter').value) {
            if (this.form.get('filter').value === 'rounds') {
              console.log(typeof res);
              this.filterblogs = this.blogs.filter((result) => (result['rounds']).toString() === res);
            }
            else {
              this.filterblogs = this.blogs.filter((result) => ((result[this.form.get('filter').value]).toLowerCase()).includes(res.toLowerCase()));
            }

            // console.log('this.filterblogs',this.filterblogs);
            this.showBlogs = [];

            let i = 0;
            let arr = [];
            this.filterblogs.forEach(element => {
              i = i + 1;
              arr.push(element);
              if (i === 3) {
                i = 0;
                this.showBlogs.push(arr);
                arr = [];
              }
            });
            if (i > 0) {
              this.showBlogs.push(arr);
              // console.log('is i',i);
            }
          }


        }
        else {
          this.fetchAll();
        }
      })


  }

  fetchAll() {

    this.spinner.show();

    this.CommonService.fetchall().subscribe((res) => {
      // console.log('res',res);

      this.blogs = res['blogs'];
      // console.log('blogs',this.blogs);

      this.showBlogs = [];

      let i = 0;
      let arr = [];
      this.blogs.forEach(element => {
        i = i + 1;
        arr.push(element);
        if (i === 3) {
          i = 0;
          this.showBlogs.push(arr);
          arr = [];
        }
      });
      if (i > 0) {
        this.showBlogs.push(arr);
        // console.log('is i',i);
      }

      // console.log(this.showBlogs);

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 200);

    }, err => {
      // console.log('err',err);

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 200);
      this.toastr.error('Failed');
    })
  }

  view(id) {
    this.router.navigate(["view", id]);
  }

  starred(id){
    this.spinner.show();
    this.CommonService.starredPost(id).then(res => {
      this.spinner.hide();
      this.toastr.success('Starred');
    })
    .catch((err)=>{
      this.spinner.hide();
      this.toastr.error('Failed');
    })
  }



}
