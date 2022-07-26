import { Injectable, Optional, Inject, InjectionToken } from '@angular/core'

import { AuthenticationClientOptions } from './EnhancedAuthenticationClient'

export const AuthingConfigService = new InjectionToken<AuthenticationClientOptions>('authing.client')

@Injectable({ providedIn: 'root' })
export class AuthingClientConfig {
  private config?: AuthenticationClientOptions;

  constructor(@Optional() @Inject(AuthingConfigService) config?: AuthenticationClientOptions) {
    if (config) {
      this.set(config);
    }
  }

  set(config: AuthenticationClientOptions): void {
    this.config = config;
  }

  get(): AuthenticationClientOptions {
    return this.config as AuthenticationClientOptions;
  }
}