# 管理多因素认证

<LastUpdated/>

> 此模块用于管理 {{$localeConfig.brandName}} 注册协议，可以在应用下进行`创建`/`修改`/`排序`/`查看`/`删除` **注册协议**。

请使用以下方式使用该模块，而不要直接初始化该模块：

```php
use Authing\Mgmt\GroupsManagementClient;
use Authing\Mgmt\ManagementClient;

$managementClient = new ManagementClient('USERPOOL_ID', 'SECRET');
$managementClient->requestToken();

$agreementsManagementClient = $managementClient->agreements();
$managementClient.agreements().create // 在某个应用下创建注册协议
$managementClient.agreements().list // 获取应用注册协议列表
$managementClient.agreements().delete // 删除应用下某个注册协议
$managementClient.agreements().modify // 修改应用下某个注册协议
$managementClient.agreements().sort // 对某个应用下的注册协议进行排序
```

## 创建注册协议

AgreementsManagementClient().create($appId, $agreement)

在某个应用下创建注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreement` \<AgreementInput\> 注册协议
- `agreement.title` \<string\> 协议标题，可以包含 HTML A 标签。
- `agreement.required` \<boolean\> 是否必须才允许注册，默认为 true。
- `agreement.lang` \<lang\> 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议。

#### 示例

```php
managementClient->agreements()->create('appId', [
    'title' => 'title',
    'required' => false,
    'lang' => 'zh-CN' 
])
```

<!-- #### 返回值 -->



## 删除注册协议

AgreementsManagementClient->delete($appId, $agreementId)

删除应用下某个注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<AgreementInput\> 协议 ID

#### 示例

```javascript
managementClient.agreements.delete('appId', 'agreementId')
```

<!-- #### 返回值 -->

## 修改注册协议

AgreementsManagementClient().modify(appId, agreementId, updates)

修改应用下某个注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<AgreementInput\> 协议 ID
- `updates` \<AgreementInput\> 注册协议
- `updates.title` \<string\> 协议标题，可以包含 HTML A 标签。
- `updates.required` \<boolean\> 是否必须才允许注册，默认为 true。
- `updates.lang` \<lang\> 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议。

#### 示例

```javascript
managementClient.agreements.modify('appId', 'argeementId',{
    title: 'new title',
    required: false,
    lang: 'zh-CN' 
})
```

<!-- #### 返回值 -->

## 排序注册协议

AgreementsManagementClient().sort(appId, agreementId, updates)

对某个应用下的注册协议进行排序

#### 参数

- `appId` \<string\> 应用 ID
- `order` \<number []\>  注册协议

#### 示例

```javascript
managementClient.agreements.sort('appId', ['agreementId1', 'agreementId2',  'agreementId3'])
```

<!-- #### 返回值 -->
