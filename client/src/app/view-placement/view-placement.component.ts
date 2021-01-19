import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-view-placement',
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.css']
})
export class ViewPlacementComponent implements OnInit {

  blog: any;
  constructor(private CommonService: CommonServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      console.log(params);

      this.fetch(params);
   });

  }

  fetch(data){


    this.CommonService.fetchpostdetails(data.id)
    .then((res)=>{
      console.log('res',res);

      this.blog = res['blogs'];
      this.spinner.hide();
    })
    .catch((err)=>{
      console.log('err',err);
      this.spinner.hide();
      this.router.navigate(["placements"]);
    })


  }


}
