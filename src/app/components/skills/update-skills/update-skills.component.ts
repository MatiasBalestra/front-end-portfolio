import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { SkillsService } from 'src/app/service/skills.service';
import { Skills } from '../../model/skills';

@Component({
  selector: 'app-update-skills',
  templateUrl: './update-skills.component.html',
  styleUrls: ['./update-skills.component.css']
})
export class UpdateSkillsComponent implements OnInit {

  roles!: string[];
  isAdmin = false;


/* Declaring a variable of type Skills and initializing it to null. */
  skill: Skills = null;


  skills: Skills[] = [];


  constructor(    
    private skillService: SkillsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit() {
    
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    const id = this.activatedRoute.snapshot.params['id'];

    this.skillService.listSkills().subscribe(
      data => {

        this.skills = data;

        this.skill = this.skills.filter(skills => skills.idSkills== id)[0];
      },
      err => {
        this.toastr.error(err.error.mesagge, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/portfolio/all']);
      }
    )
  }

onUpdate(){

  const id = this.activatedRoute.snapshot.params['id'];


  this.skillService.update(id, this.skill).subscribe(
      data => {
        this.toastr.success('Skill Updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/portfolio/all']);
      },
      err => {
        this.toastr.error(err.error.mesagge, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }
}