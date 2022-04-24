---
meta:
  - name: description
    content: 管理用户自定义字段
---

# 管理用户自定义字段

<LastUpdated/>

> Udf 是 User Defined Field（用户自定义字段） 的简称。{{$localeConfig.brandName}} 的数据实体（如用户、角色、分组、组织机构等）可以添加自定义字段，你可以配置 {{$localeConfig.brandName}} 默认不自带的字段，比如你需要创建以一个学校相关的应用，就可以添加一个自定义 `school` 字段。
> 
> 同时你可以在用户注册完成之后要求用户补充此字段的信息，[点此查看详情](/guides/authentication/extensibility/user-defined-field.md)。

## 设置自定义字段元数据

UdfManagementClient().set(targetType, key, dataType, label)

> 设置自定义字段元数据，如果该字段不存在会自动创建。

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<String\> 字段 key
- `dataType` \<UdfDataType\> 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象。
- `label` \<String\> 字段 Label，一般是一个 Human Readable 字符串。

#### 示例

```java
UserDefinedField udf = managementClient.udf().set(UdfTargetType.USER, "key", UdfDataType.STRING, "label").execute();
```

## 删除自定义字段

UdfManagementClient().remove(targetType, key)

> 删除自定义字段

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。
- `key` \<String\> 字段 key

#### 示例

```java
managementClient.udf().remove(UdfTargetType.USER, "key").execute();
```

## 获取自定义字段定义

UdfManagementClient().list(targetType)

> 查询用户池定义的自定义字段

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。

#### 示例

```java
List<UserDefinedField> list = managementClient.udf().list(UdfTargetType.USER).execute();
```

## 批量添加自定义数据

UdfManagementClient().setUdvBatch(targetType, targetId, udvList)

> 批量添加自定义数据

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。
- `targetId` \<String\> 自定义字段目标类型的主键
- `udvList` \<List\<UserDefinedDataInput\>\> 自定义数据键值对集合
- `udvList.key` \<String\> 自定义数据的键
- `udvList.vakue` \<String\> 自定义数据的值

#### 示例

```java
List<UserDefinedData> list = managementClient.udf().setUdvBatch(UdfTargetType.USER, "userId",
        Arrays.asList(new UserDefinedDataInput("key", "value"))).execute();
```


## 获取某一实体的自定义字段数据列表

UdfManagementClient().listUdv(targetType, targetId)

> 获取某一实体的自定义字段数据列表

#### 参数

- `targetType` \<UdfTargetType\> 自定义字段目标类型，USER 表示用户、ROLE 表示角色。
- `targetId` \<String\> 自定义字段目标类型的主键。

#### 示例

```java
List<UserDefinedData> list = managementClient.udf().setUdvBatch(UdfTargetType.USER, "userId").execute();
```
