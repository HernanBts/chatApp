import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.spec';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  pass: string;
  cpass: string;

  constructor(
    private auth: AuthService,
    private alert: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async onSignUp() {
    const { name, email, pass, cpass } = this;
    if (pass !== cpass) {
      const alertEl = await this.alert.create({
        header: 'Error',
        message: 'The password dont match.',
        buttons: [{
          text: 'OK',
          role: 'cancel'
        }
        ]
      });
      alertEl.present();
    } else {
      return this.auth.register(email, pass, name).then(auth => {
        this.router.navigate(['home']);
        console.log(auth);
      }).catch(err => console.log(err));
    }
    // this.auth.register(this.email, this.password).then( res => {
    //   this.router.navigate(['/home']);
    // }).catch(err => alert('El usuario o contraseña son incorrectos.'));
  }
}
