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
```python
def set(self, targetType, key, dataType, label)
```
#### 参数

- `targetType` \<str\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<str\> 字段 key
- `dataType` \<str\> 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象。
- `label` \<str\> 字段 Label，一般是一个 Human Readable 字符串。

#### 示例

```python
udf = management.udf.set(
    targetType='USER', # 目标类型为用户
    key='school', # key 为 school
    dataType='STRING', # 数据类型为字符串
    label='学校', # 显示的 label 为学校
)

udf = management.udf.set(
    targetType='USER', # 目标类型为用户
    key='age', # key 为 age
    dataType='NUMBER', # 数据类型为数字
    label='年龄', # 显示的 label 为年龄
)
```

## 删除自定义字段
> 删除自定义字段
```python
def remove(self, targetType, key)
```
#### 参数

- `targetType` \<str\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `key` \<str\> 字段 key

#### 示例

```python
management.udf.remove(
    targetType='USER', # 目标类型为用户
    key='school'  # key 为 school
)
```

## 获取自定义字段定义
> 查询用户池定义的自定义字段
```python
def list(self, targetType)
```
#### 参数
- `targetType` \<str\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
#### 示例

```python
udfs = management.udf.list(
  targetType="USER" # 目标类型为用户
)
```


## 批量添加自定义数据
> 批量添加自定义数据
```python
def set_udf_value_batch(self, target_type, target_id, udf_value_list)
```
#### 参数

- `target_type` \<str\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `target_id` \<str\>   目标对象 ID
- `udf_value_list` \<list\>  自定义字段集合

#### 示例

```python
management.udf.set_udf_value_batch(target_type="ROLE", target_id="6139e242fd34431069abe95c",udf_value_list=[
            {'key':'rr','value':'{"ccc":"qq"}'}])
```


## 获取某一实体的自定义字段数据列表
> 获取某一实体的自定义字段数据列表
```python
def list_udf_value(self, target_type, target_id)
```
#### 参数
- `targetType` \<str\> 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
- `target_id` \<str\>   目标对象 ID
#### 示例

```python
management.udf.list_udf_value(target_type="ROLE",target_id="6139cd72eee4ef2653efd1db")
```
