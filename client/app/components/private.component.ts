import { Component } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'private',
  templateUrl: 'private.component.html',
  styleUrls: ['private.component.css'],
  providers: [AuthService]
})
export class PrivateComponent {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.checkCredentials();
  }

  logout() {
    this._authService.logout();
  }
}
