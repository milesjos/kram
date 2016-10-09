import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class User {
  constructor(public email: string, public password: string) { }
}

@Injectable()
export class AuthService {
  constructor(private _router: Router) { }

  logout() {
    this._router.navigate(['']);
  }

  login() {
    this._router.navigate(['home']);
    return true;
  }

  checkCredentials() {
    // if (false) {
    //   this._router.navigate(['Login']);
    // }
  }
}
