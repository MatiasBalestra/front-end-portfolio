import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security/service/token.service';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { Persona } from '../../model/persona';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {
  
  person: Persona = null;

  roles!: string[];
  isAdmin = false;

  constructor(
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(){
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    const id = this.activatedRoute.snapshot.params['id'];

    this.portfolioService.getPortfolio().subscribe(
      data => {

        this.person = data[0];
      },
      err => {
        this.toastr.error(err.error.mesagge, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        //this.router.navigate(['/portfolio/all']);
      }
    )
  }

  onUpdate(){

    const id = this.activatedRoute.snapshot.params['id'];

    this.portfolioService.updatePersona(id, this.person).subscribe(
      data => {
        this.toastr.success('Person Updated', 'OK', {
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
