import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.spec';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubbmitLogin() {
    this.auth.login(this.email, this.password).then( res => {
      this.router.navigate(['/home']);
    }).catch(err => alert('El usuario o contraseña son incorrectos.'));
  }

  onGoToRegister() {
    this.router.navigate(['/register']);
  }
}
