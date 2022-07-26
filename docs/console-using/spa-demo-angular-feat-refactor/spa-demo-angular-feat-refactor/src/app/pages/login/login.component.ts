import { Component } from '@angular/core'

import { AuthingService } from '../../../enhance-authing-sdk/authing.service'

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private authing: AuthingService
  ) {}

  userInfo = ''

  ngOnInit () {
    this.getCurrentUser()
  }

  onLogin () {
    this.authing.client.enhancedLogin()
  }

  onLogout () {
    this.authing.client.enhancedLogout()
  }

  async getCurrentUser () {
    const _userInfo = await this.authing.client.getCurrentUser()
    this.userInfo = _userInfo && JSON.stringify(_userInfo, null, 2) || ''
  }
}
