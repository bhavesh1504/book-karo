import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated: boolean = true;

  constructor() { }

  get checkUserAuthentication() {
    return this.isUserAuthenticated;
  }

  login() {
    this.isUserAuthenticated = true;
  }

  logout() {
    this.isUserAuthenticated = false;
  }
  
}
