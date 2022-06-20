### Install

Use `yarn` or `npm` to install:

```bash
$ yarn add @authing/vue-ui-components

# OR

$ npm install @authing/vue-ui-components --save
```

Or use `CDN` to import:

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components"></script>

<link href="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.css" rel="stylesheet"></link>
```

### Initialize

You need to import `AuthingGuard` from `@authing/react-ui-components`. Initializing `AuthingGuard` requires only one parameter-your application ID (appId). You can get the appId of the application on the application list page of the console.

```vue
<template>
  <AuthingGuard :appId="appId" :config="config" />
</template>

<script>
import { AuthingGuard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    AuthingGuard
  },
  data() {
    return {
      appId: "authing\_APP\_ID",
      config: {
        socialConnections: ["github"],
        logo: "https://usercontents.authing.cn/client/logo@2.png",
        title: "{{$localeConfig.brandName}}"
      }
    };
  },
  methods: {}
};
</script>
```

### Monitor login success event

You only need to monitor the `@login` event.

```vue
<template>
  <AuthingGuard :appId="appId" :config="config" @login="handleLogin" />
</template>

<script>
import { AuthingGuard } from "@authing/vue-ui-components";

export default {
  components: {
    AuthingGuard
  },
  data() {
    return {
      appId: "authing\_APP\_ID",
      config: {
        socialConnections: ["github"],
        logo: "https://usercontents.authing.cn/client/logo@2.png",
        title: "{{$localeConfig.brandName}}"
      }
    };
  },
  methods: {
    handleLogin(userInfo) {
      console.log(userInfo);
    }
  }
};
</script>
```

The `token` field in user information is the identity credential. In the following steps, you need to carry it in requests when you want to access back-end resources. The back end will verify this `token`.
