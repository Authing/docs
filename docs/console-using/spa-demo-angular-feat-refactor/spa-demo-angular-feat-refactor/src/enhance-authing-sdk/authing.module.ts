import { NgModule, ModuleWithProviders } from '@angular/core'

import { AuthingService } from './authing.service'
import { AuthingClientService, AuthingClientFactory } from './authing.client'
import { AuthingConfigService, AuthingClientConfig } from './authing.config'

import { AuthenticationClientOptions } from './EnhancedAuthenticationClient'


@NgModule()
export class AuthingModule {
  static forRoot (config: AuthenticationClientOptions): ModuleWithProviders<AuthingModule> {
    return {
      ngModule: AuthingModule,
      providers: [
        AuthingService,
        {
          provide: AuthingConfigService,
          useValue: config
        },
        {
          provide: AuthingClientService,
          useFactory: AuthingClientFactory.createClient,
          deps: [AuthingClientConfig]
        },
      ]
    }
  }
}