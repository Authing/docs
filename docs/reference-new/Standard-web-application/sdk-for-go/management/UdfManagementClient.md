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
> 设置自定义字段元数据，如果该字段不存在会自动创建。
```go
// SetUdf
// 设置自定义字段元数据
func (c *Client) SetUdf(req *model.SetUdfInput) (*model.UserDefinedField, error)
```
#### 参数
- `req` \<SetUdfInput\>  
- `SetUdfInput.TargetType` \<EnumUDFTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色
- `SetUdfInput.Key` \<string\> 字段 key
- `SetUdfInput.DataType` \<EnumUDFDataType\> 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象
- `SetUdfInput.Label` \<string\> 字段 Label，一般是一个 Human Readable 字符串

#### 示例

```go
    resp, err := client.SetUdvBatch("616d41b7410a33da0cb70e65", model.EnumUDFTargetTypeUSER, &[]model.KeyValuePair{
		{Key: "goSDK", Value: "goSDK"},
	})
```

## 删除自定义字段
> 删除自定义字段
```go
// RemoveUdf
// 删除自定义字段
func (c *Client) RemoveUdf(targetType model.EnumUDFTargetType, key string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `targetType` \<EnumUDFTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色
- `key` \<string\> 字段 key

#### 示例

```go
resp, err := client.RemoveUdf(model.EnumUDFTargetTypeUSER, "goSDK")
```

## 获取自定义字段定义
> 查询用户池定义的自定义字段
```go
// ListUdf
// 获取自定义字段定义
func (c *Client) ListUdf(targetType model.EnumUDFTargetType) (*[]model.UserDefinedField, error)
```
#### 参数
- `targetType` \<EnumUDFTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色
#### 示例

```go
resp, err := client.ListUdf(model.EnumUDFTargetTypeUSER)
```


## 批量添加自定义数据
> 批量添加自定义数据
```go
// SetUdvBatch
// 批量添加自定义数据
func (c *Client) SetUdvBatch(id string, targetType model.EnumUDFTargetType, udv *[]model.KeyValuePair) (*[]model.UserDefinedData, error)
```
#### 参数

- `targetType` \<EnumUDFTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色
- `id` \<string\>   目标对象 ID
- `udv` \<[]KeyValuePair\>  自定义字段集合

#### 示例

```go
    resp, err := client.SetUdvBatch("616d41b7410a33da0cb70e65", model.EnumUDFTargetTypeUSER, &[]model.KeyValuePair{
		{Key: "goSDK", Value: "goSDK"},
	})
```


## 获取某一实体的自定义字段数据列表
> 获取某一实体的自定义字段数据列表
```go
// ListUdfValue
// 获取某一实体的自定义字段数据列表
func (c *Client) ListUdfValue(targetType model.EnumUDFTargetType, targetId string) (*[]model.UserDefinedData, error) 
```
#### 参数
- `targetType` \<EnumUDFTargetType\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色
- `targetId` \<string\>   目标对象 ID
#### 示例

```go
resp, err := client.ListUdfValue(model.EnumUDFTargetTypeUSER, "616d41b7410a33da0cb70e65")
```
