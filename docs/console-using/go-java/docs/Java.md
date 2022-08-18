# Java

本指南将从 Authing Java SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户管理能力。

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

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
ManagementClient managementClient = new ManagementClient(clientOptions);
```

### 简单管理用户

```java
//创建用户
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.dto.CreateUserReqDto;
import cn.authing.sdk.java.dto.UserSingleRespDto;
import cn.authing.sdk.java.model.ManagementClientOptions;
import cn.authing.sdk.java.util.JsonUtils;


public class CreateUserTest {

    private static final String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";// 用户池 id
    private static final String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";//应用密钥

    public static void main(String[] args) throws Throwable {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient client = new ManagementClient(clientOptions);

        CreateUserReqDto request = new CreateUserReqDto();
        request.setUsername("bob");
        request.setPassword("123456");
        UserSingleRespDto response = client.createUser(request);
        System.out.println(JsonUtils.serialize(response));
    }
}
```

## 错误处理

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
}
```
