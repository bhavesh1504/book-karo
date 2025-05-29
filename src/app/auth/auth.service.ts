import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated: boolean = true;
  private _isUserId: string = 'abc';

  constructor() { }

  get checkUserAuthentication() {
    return this.isUserAuthenticated;
  }

  get userId() {
    return this._isUserId;
  }

  login() {
    this.isUserAuthenticated = true;
  }

  logout() {
    this.isUserAuthenticated = false;
  }
  
}
