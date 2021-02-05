import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit {

  blogs: any;
  showBlogs: any = [];

  constructor(private CommonService: CommonServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route:Router) { }

  ngOnInit(): void {
    this.fetchAll();
  }


  fetchAll(){

    this.spinner.show();

    this.CommonService.fetchUserPost().subscribe((res)=>{

      this.blogs = res['blogs'];
      // console.log('blogs',this.blogs);

      this.showBlogs = [];

      let i=0;
      let arr=[];
      this.blogs.forEach(element => {
        i = i+1;
        arr.push(element);
        if(i===3){
          i=0;
          this.showBlogs.push(arr);
          arr=[];
        }
      });
      if(i>0){
        this.showBlogs.push(arr);
        // console.log('is i',i);
      }

      // console.log(this.showBlogs);

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 200);

    },err => {
      console.log('err',err);

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 200);
      this.toastr.error('Failed');
    })
  }

  view(id){
    this.route.navigate(["view",id]);
  }

  removeStarred(id){
    // this.route.navigate(["add-experiences",id]);
    console.log('remove');
  }



}
