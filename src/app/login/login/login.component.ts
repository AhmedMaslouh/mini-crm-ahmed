import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../core/settings/settings.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {JwtHelper} from "angular2-jwt";
import {Router} from "@angular/router";
const swalConst = require('sweetalert2');

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    mouseoverTimerStop: false,
    timeout: 5000
  });
  protected swal: any = swalConst;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public settings: SettingsService, fb: FormBuilder,
              private toasterService: ToasterService, private router: Router) {

    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }
    if (this.loginForm.valid) {
      let token: any;
      if (this.loginForm.controls['username'].value === 'ahmed' && this.loginForm.controls['password'].value === 'user') {
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTIxNTIxNTAsImV4cCI6MTUyMzY4ODE1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkpvaG5ueSIsImxhc3RuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.PHIh0fVzpbTqi8h74stfts_CqgEmku-j0NV5G1iS0BI'
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('name', 'ahmed');
        // redirect to admin module
        this.router.navigate(['contact/list']);
      } else {
        this.toasterService.pop('error', 'Erreur d\'authetification', 'Le nom d\'utilisateur ou le mot de passe est incorrect');
      }
    }
  }

  ngOnInit() {

  }

}
