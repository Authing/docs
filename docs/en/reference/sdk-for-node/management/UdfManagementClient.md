# UdfManagementClient

<LastUpdated/>

Udf is short for User Defined Field. Authing data entities (such as users, roles, groups, organizations, etc.) can add user defined fields which Authing does not built-in. For example, if you need to create a school-related application, you can add a user defined field: `school` field.

You can ask the user to supplement the information in this field after the user registration is completed, click [here](/guides/authentication/extensibility/user-defined-field.md) to check the details.

Please follow the instructions below to use this client:

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
managementClient.udf.list; // get user defined field metadata list
managementClient.udf.set; // set user defined data
managementClient.udf.remove; // delete user defined data
```

## Set user defined field metadata

UdfManagementClient().set(targetType, key, dataType, label)

> Set user defined field metadata. If the field does not exist, it will be created automatically.

#### Parameter

- `targetType` \<UdfTargetType\> user defined field target type.
- `key` \<string\> field key
- `dataType` \<UdfDataType\> data type. Authing currently supports five data types: string, number, datetime, boolean and object.
- `label` \<string\> Field Label, which commonly is a Human Readable string.

#### Example

```javascript
import { ManagementClient, UdfTargetType, UdfDataType } from "authing-js-sdk";
const udf = await managementClient.udf.set(
  UdfTargetType.User,
  "school",
  UdfDataType.String,
  "school"
);
```

```javascript
// if user defined field "age" does not exist, it will create it automatically

import { ManagementClient, UdfTargetType, UdfDataType } from "authing-js-sdk";
const udf = await managementClient.udf.set(
  UdfTargetType.User,
  "age",
  UdfDataType.Number,
  "age"
);

// if field "age" is created before, it will update its configuration

const udf = await managementClient.udf.set(
  UdfTargetType.User,
  "age",
  UdfDataType.Number,
  "new description"
);
```

#### Return value

- `Promise<UserDefinedField[]>`

## Delete a user defined field

UdfManagementClient().remove(targetType, key)

> Delete a user defined field.

#### Parameter

- `targetType` \<UdfTargetType\> user defined field target type. Use `USER` to represent user and `ROLE` to represent reole.
- `key` \<string\> field key

#### Example

```javascript
await managementClient.udf.remove(UdfTargetType.User, "school");
```

#### Return value

- `Promise<UserDefinedField[]>`

## Get the user defined field

UdfManagementClient().list(targetType)

> Get the user defined field defined by the user pool.

#### Parameter

- `targetType` \<UdfTargetType\> user defined field target type. Use `USER` to represent user and `ROLE` to represent reole.

#### Example

```javascript
const list = await managementClient.udf.list(UdfTargetType.User);
```

#### Return value

- `Promise<UserDefinedField[]>`
