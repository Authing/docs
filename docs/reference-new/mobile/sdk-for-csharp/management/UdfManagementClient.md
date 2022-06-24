---
meta:
  - name: description
    content: 管理用户自定义字段
---

# 管理用户自定义字段

<LastUpdated/>

Udf 是 User Defined Field（用户自定义字段） 的简称。{{$localeConfig.brandName}} 的数据实体（如用户、角色、分组、组织机构等）可以添加自定义字段，你可以配置 {{$localeConfig.brandName}} 默认不自带的字段，比如你需要创建以一个学校相关的应用，就可以添加一个自定义 `school` 字段。

同时你可以在用户注册完成之后要求用户补充此字段的信息，[点此查看详情](/guides/authentication/extensibility/user-defined-field.md)。

## 设置自定义字段元数据
```csharp
managementClient.Udf.Set
(
  UdfTargetType type,
  string key,
  UdfDataType dataType,
  string label
)
```
> 设置自定义字段元数据，如果该字段不存在会自动创建。

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<string\> 字段 key
- `dataType` \<UdfDataType\> 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象。
- `label` \<string\> 字段 Label，一般是一个 Human Readable 字符串。

#### 示例

```csharp
var udf = await managementClient.Udf.Set(UdfTargetType.USER, "key", UdfDataType.STRING, "label");
```

## 删除自定义字段
```csharp
managementClient.Udf.Remove(UdfTargetType type, string key)
```
> 删除自定义字段

#### 参数

- `type` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<string\> 字段 key

#### 示例

```csharp
var udf = await managementClient.Udf.Remove(UdfTargetType.USER, "key");
```

## 获取自定义字段定义
```csharp
managementClient.Udf.List(UdfTargetType type)
```
> 查询用户池定义的自定义字段

#### 参数

- `type` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。

#### 示例

```csharp
var udfs = await managementClient.Udf.List(UdfTargetType.USER);
```

## 批量添加自定义数据
```csharp
managementClient.Udf.SetUdvBatch
(
  UdfTargetType udfTargetType, 
  string targetId,
  KeyValueDictionary udvList
)
```
> 批量添加自定义数据

#### 参数

- `udfTargetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。
- `targetId` \<string\> 自定义字段目标类型的主键
- `udvList` \<List\<UserDefinedDataInput\>\> 自定义数据键值对集合
- `udvList.key` \<string\> 自定义数据的键
- `udvList.vakue` \<string\> 自定义数据的值

#### 示例

```csharp
KeyValueDictionary dic = new KeyValueDictionary(); 
for (int i = 0; i < 10; i++){
      dic.Add("user"+i.Tostring(), i.Tostring());
}
var addResult = await managementClient.Udf.SetUdvBatch(UdfTargetType.USER, "userUdv", dic);
```


## 获取某一实体的自定义字段数据列表
```csharp
managementClient.Udf.ListUdv(UdfTargetType targetType, string targetId)
```
> 获取某一实体的自定义字段数据列表

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。
- `targetId` \<string\> 自定义字段目标类型的主键。

#### 示例

```csharp
var result = await client.Udf.ListUdv(UdfTargetType.USER, "userUdv");
```
