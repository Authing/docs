---
meta:
  - name: description
    content: 管理用户自定义字段
---

# 管理用户自定义字段

<LastUpdated/>

Udf 是 User Defined Field（用户自定义字段） 的简称。{{$localeConfig.brandName}} 的数据实体（如用户、角色、分组、组织机构等）可以添加自定义字段，你可以配置 {{$localeConfig.brandName}} 默认不自带的字段，比如你需要创建以一个学校相关的应用，就可以添加一个自定义 `school` 字段。

同时你可以在用户注册完成之后要求用户补充此字段的信息，[点此查看详情](/guides/authentication/extensibility/user-defined-field.md)。

请使用以下方式使用该模块：

```php
use Authing\Mgmt\ManagementClient;

// 初始化资源与权限客户端
// 通过用户池 id 与 用户池密码进行初始化
// 通过回调函数进行初始化
// $management = new ManagementClient("YOUR_USERPOOL_ID", "YOUR_USERPOOL_SECRET");
$management = new ManagementClient(function ($options) {
    $options->userPoolId = 'YOUR_USERPOOL_ID';
    $options->secret = 'YOUR_USERPOOL_SECRET';
});

$udfsManagementClient = $management->udfs();
$udfsManagementClient->paginate // 获取自定义字段定义
$udfsManagementClient->set   // 设置自定义字段元数据
$udfsManagementClient->remove // 删除自定义字段
```

## 设置自定义字段元数据

UdfManagementClient->set(string $targetType, string $key, string $dataType, string $label)

设置自定义字段元数据，如果该字段不存在会自动创建。

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<string\> 字段 key
- `dataType` \<UdfDataType\> 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象。
- `label` \<string\> 字段 Label，一般是一个 Human Readable 字符串。

#### 示例

```php
$udfsManagementClient->set(
    UDFTargetType::USER,
    "keyname",
    UDFDataType::STRING,
    "label name"
);
```

## 删除自定义字段

UdfManagementClient->remove(string $targetType, string $key)

删除自定义字段

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<string\> 字段 key

#### 示例

```php
$udfsManagementClient->remove(
    UDFTargetType::USER, 
    "keyname"
);
```

## 获取自定义字段定义

UdfManagementClient->paginate(string $targetType)

查询用户池定义的自定义字段

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。

#### 示例

```php
$udfsManagementClient->paginate(UDFTargetType::USER);
```

## 获取自定义字段数据列表

UdfManagementClient->listUdv(string $targetType, string $targetId)

获取某一实体的自定义字段数据列表

#### 参数

- `$targetType` \<UDFTargetType\> 自定义字段目标类型， 常量类型 USER 表示用户、ROLE 表示角色。
- `$targetId` \<string\> 对应于 targetType 的 Id，如果是 User，则为 userId。

#### 示例

```php
use Authing\Types\UDFTargetType;

$res = $udfsManagementClient->listUdv(UDFTargetType::USER, 'USERID');
```

#### 示例数据

```json
[
    {
        "key": "好家伙",
        "dataType": "STRING",
        "value": "this is value",
        "label": "这是一个扩展字段"
    }
]
```


## 批量添加自定义数据

UdfManagementClient->setUdvBatch(string $targetType, string $targetId, array $udvList)

批量添加自定义数据

#### 参数

- `$targetType` \<UDFTargetType\> 自定义字段目标类型， 常量类型 USER 表示用户、ROLE 表示角色。
- `$targetId` \<string\> 对应于 targetType 的 Id，如果是 User，则为 userId。
- `$udvList` \<array\> udv 列表，每一个都是一个对像，拥有 key，value。

#### 示例

```php
use Authing\Types\UDFTargetType;

$res = $udfManageClient->setUdvBatch(UDFTargetType::USER, 'USERID', [
    (object) [
        'key' => 'key name',
        'value' => 'this is value',
    ],
]);
```

#### 示例数据

```json
[
    {
        "key": "好家伙",
        "dataType": "STRING",
        "value": "this is value",
        "label": "这是一个扩展字段"
    }
]
```
