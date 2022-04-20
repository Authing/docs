---
meta:
  - name: description
    content: UdfManagementClien
---

# UdfManagementClien

<LastUpdated/>

Udf is short for User Defined Field. {{$localeConfig.brandName}} data entities (such as users, roles, groups, organizations, etc.) can add user defined fields which {{$localeConfig.brandName}} does not built-in. For example, if you need to create a school-related application, you can add a user defined field: `school` field.

You can ask the user to supplement the information in this field after the user registration is completed,[click here to check the details](/guides/authentication/extensibility/user-defined-field.md).

## Set user defined field metadata

UdfManagementClient().set(targetType, key, dataType, label)

> Set user defined field metadata. If the field does not exist, it will be created automatically.

#### Parameters

- `targetType` \<UdfTargetType\> User defined field target type.
- `key` \<String\> Field key
- `dataType` \<UdfDataType\> Data type. It currently supports five data types: STRING, NUMBER, DATETIME, BOOLEAN and OBJECT. 
- `label` \<String\> Field Label, which commonly is a Human Readable string.

#### Example

```java
UserDefinedField udf = managementClient.udf().set(UdfTargetType.USER, "key", UdfDataType.STRING, "label").execute();
```

## Set user defined field metadata batch

UdfManagementClient().setUdvBatch(targetType, targetId, dataList)

> Set user defined field metadata batch. 

#### Parameters

- `targetType` \<UdfTargetType\> User defined field target type.
- `key` \<String\> Field key
- `dataList` \<List\<UserDefinedDataInput>\> Data list for batch set
- `dataList.key` \<String\> Field key
- `dataList.value` \<String\> Field value


#### Example

```java
UserDefinedDataInput input = new UserDefinedDataInput("key", "value");
List<UserDefinedData> execute = managementClient.udf().setUdvBatch(UdfTargetType.USER, "userId", Arrays.asList(input)).execute();
```

## Delete a user defined field

UdfManagementClient().remove(targetType, key)

> Delete a user defined field

#### Parameters

- `targetType` \<UdfTargetType\> User defined field target type.
- `key` \<String\> Field key

#### Example

```java
CommonMessage message = managementClient.udf().remove(UdfTargetType.USER, "key").execute();
```

## Get the user defined field

UdfManagementClient().list(targetType)

> Get the user defined field defined by the user pool.

#### Parameter

- `targetType` \<UdfTargetType\> User defined field target type.

#### Example

```java
List<UserDefinedField> list = managementClient.udf().list(UdfTargetType.USER).execute();
```

## List target user defined values

UdfManagementClient().listUdv(targetType, targetId)

> List target user defined values

#### Parameter

- `targetType` \<UdfTargetType\> User defined field target type.
- `targetId` \<String\> User defined field target id.

#### Example

```java
List<UserDefinedField> list = managementClient.udf().listUdv(UdfTargetType.USER, "userId").execute();
```