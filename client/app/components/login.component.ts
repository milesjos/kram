import { Component } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {

  public user = new User('', '');
  public errorMsg: string;

  constructor(private _authService: AuthService) { }

  login() {
    if (!this._authService.login()) {
      this.errorMsg = "Error, dude";
    }
  }
}
