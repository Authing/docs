---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 C# Web API Server 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/authing-dotnet-quickstart/archive/refs/heads/main.zip
  jumpUrl: https://github.com/Authing/authing-dotnet-quickstart
---

# .Net Core Web API Server 快速开始

本教程会引导你使用 Authing 保护你的应用 API 端点。

环境要求：
- DotNet SDK 版本 3.1，5.0+

## 配置 Authing

你需要在 Authing 中定义你的 API **权限项目**。API **权限项目**是**调用者**调用你的实际业务应用接口时必须具备的权限。调用者可以是另**一台服务器**，或者是**某个用户**。然后创建一对 AK、SK 密钥，并将权限项目赋予这对密钥。谁有这对密钥谁就具备了相应 API 的调用权限。

例如一个天气预报系统，调用者通过接口读取天气预报列表，其必须具备**天气预报的读取权限**，首先创建一个**读取天气预报**的权限项目，然后创建一对**密钥**，并将这个权限赋予这个密钥，再将密钥交给调用方。

### 创建应用

首先需要创建一个应用。

![](~@imagesZhCn/quickstarts/webApp/csharp/create-app.png)

**认证地址**填写一个域名，作为这个应用在 Authing 的唯一标识，**回调链接**可以随意填写。

![](~@imagesZhCn/quickstarts/webApp/csharp/set-url.png)

然后进入应用详情，在下方的「授权」卡片中，**id_token 签名算法**选择 **RS256**，授权模式中勾选 `client_credentials` 然后点击保存。

![](~@imagesZhCn/quickstarts/webApp/csharp/rs256.png)


### 创建权限项目

在应用详情页面，点击「授权」选项卡，在「API 资源」卡片点击添加。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-1.png)

填写资源名称：WeatherForecast，资源描述：天气预报，API 接口的 URL 地址：`http://localhost:5000/api/WeatherForecast`，为资源定义一个**操作**，本教程为**天气预报资源**定义一个**读取操作**，点击添加操作，操作类型填 `read`，描述填获取天气预报。最后点击保存。

![](~@imagesZhCn/quickstarts/apiServer/csharp/create-resource.png)

### 创建 AK、SK

在下一个卡片，点击**编程访问**，点击右侧的「添加」。

![](~@imagesZhCn/quickstarts/apiServer/create-ak-sk-1.png)

在弹出的窗口点击「创建」，之后会生成一对密钥。

![](~@imagesZhCn/quickstarts/apiServer/create-ak-sk-2.png)

### 定义 AK、SK 具备的权限项目

在「资源授权」选项卡点击右侧的「添加」。

![](~@imagesZhCn/quickstarts/apiServer/authz-1.png)

**被授权主体类型**选择**编程访问账号**，**被授权主体**下拉菜单选择刚刚创建的密钥，**授权作用**选择允许，**资源类型**选择刚刚定义的天气预报资源，**资源标识符**保留默认，**操作**选择特定操作，选择获取天气预报操作。最后点击确定。

![](~@imagesZhCn/quickstarts/apiServer/csharp/shouquan.png)

到此完成了为 AK、SK 密钥赋予权限的操作。接下来可以将这对密钥交给**调用方**，这样他就有了访问天气预报列表接口的权限。

## 保护 API 端点

为了保护业务应用的接口，显然只在 Authing 定义一番接口权限而不改造系统是没有效果的，必须在业务应用里面添加代码。我们基于这样的思路保护 API 接口：调用者**找 Authing 签发 Access token**，然后调用者**携带 Access token 访问业务系统接口**，业务系统接口**检验 Access token 合法性**，并**验证其中的权限项目**，通过后再返回数据。

整体的序列图如下：

![](~@imagesZhCn/quickstarts/apiServer/sequence.png)

### 初始化项目

初始化一个 WebApi 项目

```bash
dotnet new webapi -n ProtectApi
```

### 添加相关项目配置信息

在 /appsettings.Development.json 文件中增加相关配置信息

```json {9-13}
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "JwtSettings": {
    "Issuer": "https://1409458062aaa.authing.cn/oidc",
    "Audience": "60b847b52cd547f747a4cfe8",
    "JwksUri": "https://1409458062aaa.authing.cn/oidc/.well-known/jwks"
  }
}
```

为了在配置信息相关字段的代码提示，在 `/Utils` 目录下新增 `JwtSettings.cs`, 代码如下：

```csharp
namespace quickstart.Utils
{
    public class JwtSettings
    {
        //token是谁颁发的
        public string Issuer { get; set; }
        //token可以给哪些客户端使用
        public string Audience { get; set; }
        // JwksUri
        public string JwksUri { get; set; }
    }
}
```

同时在 `Startup.cs` 启动类配置服务中，新增读取配置信息相关代码：

```csharp {9-12}
public void ConfigureServices(IServiceCollection services)
{
      services.AddControllers();
      services.AddSwaggerGen(c =>
      {
          c.SwaggerDoc("v1", new OpenApiInfo { Title = "quickstart", Version = "v1" });
      });

      //由于初始化的时候我们就需要用，所以使用Bind的方式读取配置
      //将配置绑定到JwtSettings实例中
      var jwtSettings = new JwtSettings();
      Configuration.Bind("JwtSettings", jwtSettings);
}
```

### 增加认证功能

同样在 `Startup.cs` 启动类配置服务中，新增认证与授权相关功能，代码如下：

```csharp {14-43}
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "quickstart", Version = "v1" });
    });

    //由于初始化的时候我们就需要用，所以使用Bind的方式读取配置
    //将配置绑定到JwtSettings实例中
    var jwtSettings = new JwtSettings();
    Configuration.Bind("JwtSettings", jwtSettings);

    services.AddAuthentication(options =>
    {
        //认证middleware配置
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
        //主要是jwt  token参数设置
        o.TokenValidationParameters = new TokenValidationParameters
        {
            //Token颁发机构
            ValidIssuer = jwtSettings.Issuer,
            //颁发给谁
            ValidAudience = jwtSettings.Audience,
            ValidAlgorithms = new string[] { "RS256" },
        };
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.IncludeErrorDetails = true;
        o.SetJwksOptions(new JwkOptions(jwtSettings.JwksUri, jwtSettings.Issuer, new TimeSpan(TimeSpan.TicksPerDay)));
    });

    services.AddAuthorization(options =>
        {
            options.AddPolicy(
                "WeatherForecast:read",
                policy => policy.RequireClaim("scope", "WeatherForecast:read"));
        }
    );
}
```

同时，为了完成对 API 端点的保护，需要在需要保护的 API 上增加 `Authorize` 特性，效果如下:

```csharp {20}
namespace quickstart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

### 增加授权功能

对于不同的 API，所能访问的角色权限可能也是不同的，对于不同角色的权限，也就是可以操作的资源具体体现在该角色所带 Token 的 Scope 属性，在编程中通过对 `Authorize` 特性增加 `Role` 描述来完成 `Scope` 的过滤与校验：

```csharp {20}
namespace quickstart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Policy = "WeatherForecast:read")]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

恭喜 🎉，现在你的应用接口安全了，每次会检验来访者的 Access token 合法性和权限项目。接下来我们从调用者的角度访问这个 API 端点。

### 调用 API 端点

调用 API 端点时，需要考虑一件事：这个接口只要知道调用者是来自哪个服务器的请求就可以了，还是需要知道调用者具体是哪个用户。

举例来说，公司总部的资源服务器的资源接口，只要知道来访者是从分部服务器来的，并且具备权限，就直接返回资源；用户想要获取购物车数据，此时资源接口需要知道用户是谁，用户是否有权限查看购物车数据，然后再将用户他自己的购物车数据返回。

## 相关测试

### 运行项目

然后运行以下命令启动项目：

```bash
dotnet run
```

### 获取 Access token

在发起 API 调用之前，需要**先获取 Access token**。如果你在单页应用或移动端应用中完成登录，会得到一个 Access token，可以携带这个 Access token 调用 API。详情请查看：

- [React 单页应用快速开始](../../spa/react.md#调用资源-api)

如果你要在命令行工具或其他服务端应用请求 API 端点，你需要使用上文提到的 AK、SK 密钥对，通过 OIDC Client Credentials 模式获取 Access token。以下是获取 token 的方式：

<StackSelector snippet="get-access-token" selectLabel="选择语言" :order="['curl', 'javascript']"/>


### 认证测试

首先我们不带任何 token 访问 API，会得到 401 错误信息。

![](~@imagesZhCn/quickstarts/apiServer/csharp/401.png)

之后我们带上获取到的 token 访问 API，会得到该 API 返回的数据。

![](~@imagesZhCn/quickstarts/apiServer/csharp/200.png)
### 鉴权测试

首先我们再获取一个 `Access Token`，该 `Access Token` 并不具有 `WeatherForecast` 资源的 `read` 行为权限。使用该 `Token` 请求对应接口，会得到 403 错误信息。该信息表明此次请求的用户并不具备对应接口的权限，所以禁止访问。

![](~@imagesZhCn/quickstarts/apiServer/csharp/403.png)

之后带上之前获取用来操作 `WeatherForecast:read` 的 `Token` 请求，将会获得接口返回信息。

![](~@imagesZhCn/quickstarts/apiServer/csharp/200.png)

下面我们对比一下两个 `Token` 的不同之处，如下图。

```js
token1=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJJdlk0MWhNV3FxMmRvQlNVVXlwQWwiLCJpYXQiOjE2MjAyOTE4MjgsImV4cCI6MTYyMDI5NTQyOCwic2NvcGUiOiJvcmRlcjpyZWFkIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDUwNzUxYWVkMGYyOWJmNzcyM2M3YTgiLCJhenAiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.dTBBNwQQ7B-gnC3X1NBtk10dJ86nUZ7HlqcCzWTGd7qE0mDhEVmc2hqpySZpjfYuILurO1V73ZaAAcNNHoJqsV90OpSYRIWzJWyHD0u4fDEdbXgP7irYbGaeNz3uPrPzFKYrVwS024KSbURjMRDQZPPNSsdWg3AoYVNz7eXYFfu9BdBU2zdQzxv7XdA_TRa6gJjFDbVJxfHhkwPZ1deTyUj9r9Tct5usb55QuUeVHrKTg91iL77yPgEvQQQoffeCEbtDnLJblx-25rbTYzSfFWuohG7uKpjJsHUjaMn6GjH1bLOgp-pFdoP7Zdc3kamvdobCKqHH2o29-R9lTjXbkg
token2=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEzS3VYX0R4d1pJOEdHenhJNFJrT1R4VG9VZk5hY0g1X1NiQUJlRmN0RWMifQ.eyJqdGkiOiJnc0ljWTlyUE5FOEFlS1M1T1Q1UkIiLCJpYXQiOjE2MjI2OTAwNjEsImV4cCI6MTYyMjY5MzY2MSwic2NvcGUiOiJXZWF0aGVyRm9yZWNhc3Q6cmVhZCIsImlzcyI6Imh0dHBzOi8vMTQwOTQ1ODA2MmFhYS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MGI4NDdiNTJjZDU0N2Y3NDdhNGNmZTgiLCJhenAiOiI2MDg2Njg3ZTRkYzA2NmFlZTk5ZWNjNzEifQ.IvjuPyY7gGl9uz7w4tIE4Q_DoHAln9uLN-ZRhjMafD2w3cE3FMa7zbeBy9brP4CwA88uXEPHj6uYOmkov_MWW1poWeyfsrUWNptBvgMjIOR8sBsYqPGJTWHmjhntoTVn_eoeuo1w0_wqwGiCENbxq4Rp066VLVan1jPd_NqT3MzSOZOeHwZrr7rFP6sfoIChKkNt2nI1YaKZmtoiIpRryHaAo-1F6IMIoqtOhYUJkANTkY2wNEHtUan5nlp29EPXNLqUWtah9-MbTtnCXE8iOtJ2jm2ufgsiogTDXhCLY6syIJZfHlH7yFXI5r_e4jovQWdDhbv1TK2cri0kxgHhZQ
```

![](~@imagesZhCn/quickstarts/apiServer/csharp/scope1.png)

::: img-description
token1 解析内容
:::

![](~@imagesZhCn/quickstarts/apiServer/csharp/scope2.png)

::: img-description
token2 解析内容
:::


我们很容易看到两者的 `Scope` 是不同的，一个具有 `WeatherForecast:read` 行为的，另一个则不具有。而 `[Authorize(Policy = "WeatherForecast:read")]` 的主要作用就是获取 `Token` 中的 `Scope` 检查是否包含在特性描述中，如果没有则没有权限，返回状态码 403，如果有，则可以继续接下来的 API 访问。

只有当我们携带**具备 API 所需的全部权限项目的 Access token** 访问接口时，才能通过检验，收到服务器的返回数据。



### 接下来你可能需要

了解 Authing 资源权限模型：
::: page-ref /guides/access-control/
:::

学习 Token 验签原理：
::: page-ref /guides/faqs/how-to-validate-user-token.md
:::

在 React 单页应用调用 API：
::: page-ref /quickstarts/spa/react.md
:::