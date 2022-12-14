import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { JobsService } from 'src/app/service/jobs.service';
import { Job } from '../model/experiences';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  roles: string[] = [];
  isAdmin = false;
  
  jobs: Job[] = [];

  constructor(
    private jobsService: JobsService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    ) { }
  
  ngOnInit(){
    this.getListJobs();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  getListJobs(){
    this.jobsService.listJob().subscribe(
      data => {
        this.jobs = data;
      },
      err => {
        console.log(err);
      }
    )
  }

 delete(id: number){
    this.jobsService.deleteJob(id).subscribe(
      data => {
        this.toastr.success('Job deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getListJobs();
      },
      
      err => {

        if (err = 200) {
          this.toastr.success('Job deleted', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.getListJobs();
          window.location.reload
        } 
        else {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      }
    );
  } 



}
