# Java

这篇文档简单介绍了 Java SDK 的基本使用方式。ManagementClient 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 Authing 控制台 (opens new window)中能做的所有操作，都能用此模块完成，此模块适合在后端使用。

<AppDetailSiderBar />

## 安装

### Gradle 项目

```
implementation "cn.authing:authing-java-sdk:<{final_version}>"
```

### Maven 项目

```xml
<dependency>
    <groupId>cn.authing</groupId>
    <artifactId>authing-java-sdk</artifactId>
    <version>{final_version}</version>
</dependency>
```

## 管理你的用户

### 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数:

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
ManagementClient managementClient = new ManagementClient(clientOptions);
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。

### 获取用户列表

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;

public class ListUsersTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        ListUsersDto request = new ListUsersDto();
        request.setPage(1);
        request.setLimit(10);
        request.setWithCustomData(Boolean.TRUE);
        request.setWithIdentities(Boolean.TRUE);
        request.setWithDepartmentIds(Boolean.TRUE);

        UserPaginatedRespDto response = client.listUsers(request);
        System.out.println(JsonUtils.serialize(response));
    }
}
```

### 获取用户详情

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;

public class GetUserTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        GetUserDto request = new GetUserDto();
        request.setUserId("6278b61c88cb22e9faff7643");
        request.setWithCustomData(Boolean.TRUE);
        request.setWithIdentities(Boolean.TRUE);
        request.setWithDepartmentIds(Boolean.TRUE);

        UserSingleRespDto response = client.getUser(request);
        System.out.println(JsonUtils.serialize(response));
    }
}
```

### 创建用户

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.CreateUserReqDto;
import cn.authing.sdk.java.dto.UserSingleRespDto;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;


public class CreateUserTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        CreateUserReqDto request = new CreateUserReqDto();
        request.setEmail("test@example.com");
        request.setPhone("17612345678");
        request.setPhoneCountryCode("phoneCountryCode_5145");
        request.setUsername("bob");
        request.setName("name_3363");
        request.setNickname("nickname_3404");
        request.setPhoto("photo_3306");
        request.setGender(CreateUserReqDto.Gender.M);
        request.setEmailVerified(Boolean.TRUE);
        request.setPhoneVerified(Boolean.TRUE);
        request.setExternalId("10010");
        request.setPassword("123456");

        UserSingleRespDto response = client.createUser(request);
        System.out.println(JsonUtils.serialize(response));
    }
}
```

### 修改用户资料

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;

public class UpdateUserTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        UpdateUserReqDto request = new UpdateUserReqDto();
        request.setUserId("6264b1757db835fc22f1969c");
        request.setPhoneCountryCode("+86");
        request.setName("张三");
        request.setNickname("张三ffff");
        request.setPhoto("https://files.authing.co/authing-console/default-user-avatar.png");
        request.setExternalId("externalId_4571");
        request.setStatus(cn.authing.sdk.java.dto.UpdateUserReqDto.Status.DELETED);
        request.setEmailVerified(Boolean.TRUE);
        request.setPhoneVerified(Boolean.TRUE);
        request.setGender(cn.authing.sdk.java.dto.UpdateUserReqDto.Gender.M);
        request.setUsername("bob");
        request.setPasswordEncryptType(cn.authing.sdk.java.dto.UpdateUserReqDto.PasswordEncryptType.SM2);
        request.setEmail("test@example.com");
        request.setPhone(null);
        request.setPassword("password_3847");
        // Object customData = new Object();
        request.setCustomData(customData);

        UserSingleRespDto response = client.updateUser(request);
        System.out.println(JsonUtils.serialize(response));
    }
}
```

### 批量删除用户

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.DeleteUsersBatchDto;
import cn.authing.sdk.java.dto.IsSuccessRespDto;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;

import java.util.Collections;

public class DeleteUserBatchTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        DeleteUsersBatchDto request = new DeleteUsersBatchDto();
        request.setUserIds(Collections.singletonList("userId_1362"));

        IsSuccessRespDto response = client.deleteUsersBatch(request);
        System.out.println(JsonUtils.serialize(response));
    }

}
```

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `statusCode`: 请求是否成功状态码，当 `statusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `apiCode`: 细分错误码，当 `apiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
    ManagementClient managementClient = new ManagementClient(clientOptions);
    CreateRoleDto request = new CreateRoleDto();
    request.setCode("code");
    request.setNamespace("namespace");
    request.setDescription("description");
    RoleSingleRespDto response = managementClient.createRole(request);

    if (response.getCode() != 200) {
    throw new RuntimeException(response.getMessage()); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
    }

    // 继续你的业务逻辑 ...
}
```
