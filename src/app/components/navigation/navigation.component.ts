import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Iconos 
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDoorOpen, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginUsuario } from 'src/app/security/Entity/login-usuario';
import { AuthService } from 'src/app/security/service/auth.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //Icons in use in the website
  iconGitHub = faGithub;
  iconLinkedIn = faLinkedin;

  iconLogin = faSignInAlt;
  entrar = faDoorOpen;
  salir = faSignOutAlt;

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errorMessage!: string;
  

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();

    }else {
      this.isLogged = false;
    }

    if(this.tokenService.getToken()){
  
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
    
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;



        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMessage = err.error.errorMessage;
        console.log(err.error.errorMessage);
        

      }
    })
  }

}
