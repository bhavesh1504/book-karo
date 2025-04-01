import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})
export class AuthPage implements OnInit {

  isLoading: boolean = false;
  isLogin: boolean = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(formValue: NgForm) {
    if(!formValue.valid) {
      return
    }
    const email = formValue.value.email;
    const password = formValue.value.password;
    console.log(email, password);
  }

  onLogin () {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl.create({
      keyboardClose: true, spinner: 'dots', message: 'Logging in...'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover')
      }, 1500);
    })
  }

  switchAuthPage() {
    this.isLogin = !this.isLogin;
  }

}
