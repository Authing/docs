### Install

Use `yarn` or `npm` to install:

```bash
$ yarn add @approw/ng-ui-components

# OR

$ npm install @approw/ng-ui-components --save
```

Or use `CDN` to import:

```html
<script src="https://cdn.jsdelivr.net/npm/@approw/ng-ui-components"></script>

<div ng-app="">
  <approw-guard [appId]="APPROW_APP_ID"></approw-guard>
</div>
```

### Initialize

```javascript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ApprowGuardModule } from '@approw/ng-ui-components'
import { AppComponent } from './app.component'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ApprowGuardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// app.component.ts
import { Component } from '@angular/core'
import {
  CommonMessage,
  AuthenticationClient,
} from 'ng-ui-components'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo'
  appId = 'APPROW_APP_ID'
  onLoad([e]: [AuthenticationClient]) {
    console.log('ffffff', e)
  }
}

// app.component.html
<approw-guard [appId]="appId" (onLoad)="onLoad($event)"></approw-guard>
```

### Monitor login success event

It is simple. You only need to pass a callback `onLogin`.

```html
<approw-guard [appId]="appId" (onLogin)="onLoad($event)"></approw-guard>
```

```javascript
export class AppComponent {
  title = "demo";
  appId = "APPROW_APP_ID";
  onLogin([user]) {
    console.log("userInfo: ", user);
  }
}
```

The `token` field in user information is the identity credential. In the following steps, you need to carry it in requests when you want to access back-end resources. The back end will verify this `token`.