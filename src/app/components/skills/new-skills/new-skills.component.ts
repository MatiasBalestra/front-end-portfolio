import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { SkillsService } from 'src/app/service/skills.service';
import { Skills } from '../../model/skills';

@Component({
  selector: 'app-new-skills',
  templateUrl: './new-skills.component.html',
  styleUrls: ['./new-skills.component.css']
})
export class NewSkillsComponent implements OnInit {

roles!: string[];
isAdmin: boolean = false;

nameSkill= '';
levelSkill!: number;
logoSkill!: string;

  constructor(
    private skillService: SkillsService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  onCreate(): void {
    const skill = new Skills(this.nameSkill, this.levelSkill, this.logoSkill);
    this.skillService.save(skill).subscribe(
      data => {
        this.toastr.success('Skill created!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['']);
      },
      err => {
        if (err.status == 200) {
          this.toastr.success('Skill created!', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['']);
        } else {

          this.toastr.error('', 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          // this.router.navigate(['/']);
        }

      }
    );
  }

}
