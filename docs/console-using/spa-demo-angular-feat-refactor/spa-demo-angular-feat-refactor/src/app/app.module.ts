import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/pages/login/login.component'

import { AuthingModule } from '../enhance-authing-sdk/authing.module'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthingModule.forRoot({
      appId: '62be97e30fa6ea1c1ced35c0',
      appHost: 'https://spa-demo-2022.authing.cn',
      redirectUri: 'http://localhost:3000/callback',
      tokenEndPointAuthMethod: 'none',
      introspectionEndPointAuthMethod: 'none'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
