import { Injectable, Inject } from '@angular/core'

import { EnhancedAuthenticationClient } from './EnhancedAuthenticationClient'

import { AuthingClientService } from './authing.client'

@Injectable({
  providedIn: 'root'
})
export class AuthingService {
  constructor (
    @Inject(AuthingClientService) public client: EnhancedAuthenticationClient
  ) {}
}
