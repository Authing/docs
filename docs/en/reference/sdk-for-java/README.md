---
meta:
  - name: description
    content: Java / Kotlin SDK
---

# {{$localeConfig.brandName}} - Java / Kotlin

<LastUpdated/>

{{$localeConfig.brandName}} Java SDK is comprised of two parts：`ManagementClient` and `AuthenticationClient`. All operations in `ManagementClient` are performed as an administrator, including managing users, managing roles, managing authority policies, and managing user pool configuration. All operations in `AuthenticationClient` are performed as the current terminal user, including login, registration, modification of user information, and logout.

You should set the initialized `ManagementClient` instance to a global variable (initialize only once), and the `AuthenticationClient` should be initialized for each request.

## Installation

### gradle project

Add to dependencies in build.gradle:

```
implementation "com.authing:java-core:<LATEST_VERSION>"
```

> You can check the latest version at [https://search.maven.org/artifact/cn.authing/java-core](https://search.maven.org/artifact/cn.authing/java-core) .

### maven project

Add to dependencies in pom.xml:

> If you need to use this SDK in `spring`, since the `spring` relies on old version of `OkHttp`, you need to manually specify the version of `OkHttp`.

```
<dependency>
    <groupId>com.authing</groupId>
    <artifactId>java-core</artifactId>
    <version><LATEST_VERSION></version>
</dependency>
<properties>
    <okhttp3.version>4.8.0</okhttp3.version>
</properties>
```

## Use ManagementClient

Initializing `ManagementClient` requires `userPoolId` and `secret`:

> You can learn how to get [ UserPoolId and Secret here](/guides/faqs/get-userpool-id-and-secret.md) .

```java
import com.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
      ManagementClient managementClient = new ManagementClient("authing_USERPOOL_ID", "authing_USERPOOL_SECRET");

      // get admin privileges
      managementClient.requestToken().execute();
    }
}
```

Now the `ManagementClient` instance is ready to use. For example, you can get the list of users in the user pool.

```java
import com.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
        ManagementClient managementClient = new ManagementClient("authing_USERPOOL_ID", "authing_USERPOOL_SECRET");
        // get admin privileges
        managementClient.requestToken().execute();

        PaginatedUsers users = managementClient.users().list().execute();
    }
}
```

## Use AuthenticationClient

Initializing `ManagementClient` requires `userPoolId` and `appId`:

> You can learn how to get[UserPoolId here](/guides/faqs/get-userpool-id-and-secret.md), and view your own **application** list in the console.

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAppId("authing_APP_ID");
    }
}
```

Next, you can perform operations such as registration and login:

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAppId("authing_APP_ID");

        String email = "test@example.com";
        String password = "123456";
        User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
    }
}
```

After login, `update_profile` and the other methods that require users to log in are available:

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAppId("authing_APP_ID");

        String email = "test@example.com";
        String password = "123456";
        authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();

        User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
    }
}
```

You can also set the `AccessToken` parameter after initialization, so that it is unnecessary to call the `LoginByXXX` method:

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAppId("authing_APP_ID");
        authenticationClient.setAccessToken("ACCESS_TOKEN");
    }
}
```

Executing the `UpdateProfile` method can also succeed:

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAccessToken("ACCESS_TOKEN");
        User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
    }
}
```

## Error handling

```java
import com.authing.core.auth.AuthenticationClient;
import com.authing.core.graphql.GraphQLException;
import java.io.IOException;


public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        authenticationClient.setAccessToken("ACCESS_TOKEN");

        try {
            User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
        } catch (GraphQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Privatization deployment

**The privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Authing service (**without protocol header and Path**) and the password encryption public key. If you are not sure, you can contact the Authing IDaaS service administrator.

### Use ManagementClient

Initializing `ManagementClient` requires `userPoolId` and `secret`:

```java
import com.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
      ManagementClient managementClient = new ManagementClient("authing_USERPOOL_ID", "authing_USERPOOL_SECRET");
      // configure customized doimain name
      managementClient.setHost("https://core.you-authing-service.com");
      // configure customized public key
      managementClient.setPublicKey("public key");
      // get admin privileges
      managementClient.requestToken().execute();
    }
}
```

### Use AuthenticationClient

Initializing `ManagementClient` requires `userPoolId` and `appId`:

```java
import com.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        AuthenticationClient authenticationClient = new AuthenticationClient("authing_USERPOOL_ID");
        // configure customized doimain name
        authenticationClient.setHost("https://core.you-authing-service.com");
        // configure customized public key
        authenticationClient.setPublicKey("public key");
    }
}
```

## Interface index

Available Authentication methods

- Get the user profile of the current user: `getCurrentUser`
- Register with email: `registerByEmail`
- Register with username: `registerByUsername`
- Register with SMS verification code: `registerByPhoneCode`
- Login with email: `loginByEmail`
- Login with username: `loginByUsername`
- Login with SMS verification code: `loginByPhoneCode`
- Login with phone number password: `loginByPhonePassword`
- Send mail: `sendEmail`
- Send SMS verification code: `sendSmsCode`
- Check the valid status of the token: `checkLoginStatus`
- Use the SMS verification code to reset the password: `resetPasswordByPhoneCode`
- Use email verification code to reset password: `resetPasswordByEmailCode`
- Update user profile: `updateProfile`
- Update password: `updatePassword`
- Update phone number: `updatePhone`
- Update email: `updateEmail`
- Refresh token:`refreshToken`
- Bind mobile phone number: `bindPhone`
- Unbind phone number: `unbindPhone`

Learn more:：

::: page-ref /en/reference/sdk-for-java/authentication/
:::

ManagementClient contains the following sub-clients:

::: page-ref /en/reference/sdk-for-java/management/UsersManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/RolesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/PoliciesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/AclManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/UdfManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/GroupsManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/OrgManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/UserpoolManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/WhitelistManagementClient.md
:::

::: page-ref /en/reference/sdk-for-java/management/ApplicationManagementClient.md
:::

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
