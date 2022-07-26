import { InjectionToken } from '@angular/core'

import { EnhancedAuthenticationClient } from './EnhancedAuthenticationClient'

import { AuthingClientConfig } from './authing.config'

export const AuthingClientService = new InjectionToken<EnhancedAuthenticationClient>('authing.client')

export class AuthingClientFactory {
  static createClient(configFactory: AuthingClientConfig): EnhancedAuthenticationClient {
    const config = configFactory.get();

    if (!config) {
      throw new Error(
        'Configuration must be specified either through AuthModule.forRoot or through AuthClientConfig.set'
      );
    }

    return new EnhancedAuthenticationClient(config)
  }
}