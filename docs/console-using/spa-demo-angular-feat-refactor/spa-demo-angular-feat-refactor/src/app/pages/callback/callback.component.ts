import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthingService } from '../../../enhance-authing-sdk/authing.service'

@Component({
  selector: 'callback-container',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor (
    private router: Router,
    private authing: AuthingService
  ) {}

  ngOnInit () {
    this.handleAuthingLoginCallback()
  }

  async handleAuthingLoginCallback () {
    await this.authing.client.enchancedLoginCallback()
    this.router.navigateByUrl('personal', {
      replaceUrl: true
    })
  }
}
