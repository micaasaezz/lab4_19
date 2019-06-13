import { AuthService } from './../../services/auth.service';
import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formularioLogin: FormGroup;

  constructor(private loginService: LoginService, private router: Router,
    private authServ: FirebaseAuthService) { }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ]),
      pass: new FormControl('', Validators.required),
    });
  }

  public Ingresar() {
    console.log(this.formularioLogin.value);
    this.authServ.IniciarSesion(this.formularioLogin.value.email, this.formularioLogin.value.pass).then( (res) => {
      if (res) {
        this.router.navigate(['/home']);
      } else {
        alert('no verificó email');
      }
    });
  }

}
