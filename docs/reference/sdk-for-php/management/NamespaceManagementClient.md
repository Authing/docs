# 管理权限分组

<LastUpdated/>

> 此模块用于管理 {{$localeConfig.brandName}} 权限分组，可以进行权限分组的增删改查

请使用以下方式使用该模块，而不要直接初始化该模块：

```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$namespaceManagementClient = $managementClient->namespaces();
$namespaceManagementClient->list(); // 获取权限分组列表
$namespaceManagementClient->create(); // 创建权限分组
```

## 创建权限分组

NamespaceManagementClient->create(string $code, string $name, string $description)

创建权限分组

#### 参数

- `code` \<string\> 权限分组唯一标识符
- `name` \<string\> 权限分组名
- `description` \<string\> 可选，权限分组描述

#### 示例

```php
$namespaceManagementClient->create(
  'testNamesapce',
  'Test Namcepace',
  'This is a Test Namespace'
);
```

#### 示例数据

```json
{
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "This is a Test Namespace",
  "status": 1,
  "id": 38
}
```

## 获取权限分组列表

NamespaceManagementClient->list(int $page, int $limit)

获取权限分组列表

#### 参数

- `page` \<number\> 页码，默认为 1
- `limit` \<number\> 每页个数，默认为 10

#### 示例

```php
$namespaceManagementClient->list(1, 10);
```

#### 示例数据

```json
[
  {
    "appId": null,
    "appName": null,
    "name": "Test Namcepace",
    "code": "testNamesapce",
    "description": "This is a Test Namespace",
    "status": 1,
    "id": 38
  }
]
```

## 更新权限分组

NamespaceManagementClient->update(int $code, array $updates)

更新权限分组

#### 参数

- `code` \<string\> 权限分组 code
- `updates` \<array\> 需要更新的数据
- `updates.code` \<string\> 可选，权限分组唯一标识符
- `updates.name` \<string\> 可选，权限分组名称
- `updates.description` \<string\> 可选，权限分组描述

#### 示例

```php
$namespaceManagementClient->update('testNamesapce', [ 'name' => 'A New Name' ]);
```

#### 示例数据

```json
{
  "id": 38,
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "A New Name",
  "status": 1
}
```

## 删除权限分组

$namespaceManagementClient->delete(string $code);

删除权限分组

#### 参数

- `code` \<string\> 权限分组 CODE

#### 示例

```php
$namespaceManagementClient->delete('testNamesapce');
```

#### 示例数据

```json
true
```