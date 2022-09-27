---
meta:
  - name: description
    content: Delphi
---

# {{$localeConfig.brandName}} - Delphi

<LastUpdated/>

{{$localeConfig.brandName}} Delphi SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于后端交互的服务器环境。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端环境下使用。

## 安装

安装 Delphi SDK 库，[点击此处]()获取 SDK 文件。

## 使用管理模块

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数 :

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```delphi
unit ManagementClientTest;

interface

uses
  System.SysUtils, System.Variants, System.Classes,
  ManagementClientOptions, ManagementClient;

type
  TManagementClientTest = class(TObject)
  public
    constructor Create;
    destructor Destroy; override;
  private
    FClientOptions: ManagementClientOptions;
    FClient: ManagementClient
  end;
implementation

const
  DEF_ACCESS_KEY_ID = 'ACCESS_KEY_ID';
  DEF_ACCESS_KEY_SECRET = 'ACCESS_KEY_SECRET';
  DEF_HOST = 'https://core.dev.authing-inc.co';

{ TManagementClientTest }

constructor TManagementClientTest.Create;
begin
  FClientOptions := ManagementClientOptions.Create(DEF_ACCESS_KEY_ID, DEF_ACCESS_KEY_SECRET);
  FClient := ManagementClient.Create(FClientOptions);
end;

destructor TManagementClientTest.Destroy;
begin
  inherited;
  FreeAndNil(FClientOptions);
  FreeAndNil(FClient);
end;
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

## 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

```delphi
procedure TManagementClientTest.ListUserTest;
var
  oRequest: ListUsersDto;
  oOptions: ListUsersOptionsDto;
  oResponse: UserPaginatedRespDto;
  s: string;
begin
  oRequest := ListUsersDto.Create;
  oOptions := UserSingleRespDto.Create;
  oResponse := UserPaginatedRespDto.Create;
  try
	oOptions.setPage(1);
	oOptions.setLimit(10);
	oRequest.setOptions(oOptions);
    oResponse = FClient.getUser(oRequest);
  finally
    FreeAndNil(oRequest);
    FreeAndNil(oOptions);
    FreeAndNil(oResponse);
  end;
end;
```

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`。

如：

```delphi
unit ManagementClientTest;

interface

uses
  System.SysUtils, System.Variants, System.Classes,
  ManagementClientOptions, ManagementClient;

type
  TManagementClientTest = class(TObject)
  public
    constructor Create;
    destructor Destroy; override;
  private
    FClientOptions: ManagementClientOptions;
    FClient: ManagementClient
  end;
implementation

const
  DEF_ACCESS_KEY_ID = 'ACCESS_KEY_ID';
  DEF_ACCESS_KEY_SECRET = 'ACCESS_KEY_SECRET';
   // 你的 Authing 私有化实例 HOST 地址，格式例如 https://core.authing.cn
  DEF_HOST = 'YourHost';

{ TManagementClientTest }

constructor TManagementClientTest.Create;
begin
  FClientOptions := ManagementClientOptions.Create(DEF_ACCESS_KEY_ID, DEF_ACCESS_KEY_SECRET);
  FClient := ManagementClient.Create(FClientOptions);
end;

destructor TManagementClientTest.Destroy;
begin
  inherited;
  FreeAndNil(FClientOptions);
  FreeAndNil(FClient);
end;
```

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
