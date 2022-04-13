# PoliciesManagementClient

<LastUpdated/>

> The core of Approw's access and authorization management model is **Resource** and **Policy**. A policy defines an operation privilege for a certain resource. By assigning the policy to a user (or role), you can know whether the user (or role) has operational privilege of a resource.

Please follow the instructions below to use this client：

```javascript
import { ManagementClient } from "approw-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET",
});
managementClient.policies.list; // get policy list
managementClient.policies.create; // create a policy
managementClient.policies.listUsers; // get policy authorization record
```

## Create a policy

PoliciesManagementClient().create(code，policy statement)

> Create a policy

#### Parameter

- `code` \<string\> Unique id of the policy
- `statements` \<PolicyStatement[]\>
- `description` \<string\> description

#### Example

```javascript
import { PolicyEffect } from "approw-js-sdk";

const statements = [
  {
    resource: "books:123",
    effect: PolicyEffect.Allow,
    actions: ["books:edit"],
  },
];

const policy = await managementClient.policies.create(code, statements);
```

#### Return value

- `Promise<DeepPartial<Policy>>`

## Delete a policy

PoliciesManagementClient().delete(code)

> Delete a policy. System built-in policies are maintained by Approw official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy

#### Example

```javascript
const { code, message } = await managementClient.policies.delete("CODE"); // code 200 means success
```

#### Return value

- `Promise<CommonMessage>`

## Bulk delete policies

PoliciesManagementClient().deleteMany(codeList)

> Bulk delete policies. System built-in policies are maintained by Approw official. They can not be updated or deleted.

#### Parameter

- `codeList` \<string\> Unique id of the policy列表

#### Example

```javascript
const { code, message } = await managementClient.policies.deleteMany(["CODE"]); // code 200 means success
```

#### Return value

- `Promise<CommonMessage>`

## Update a policy 

PoliciesManagementClient().update(code, updates)

> Update a policy. System built-in policies are maintained by Approw official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy
- `updates` \<Object\>
- `updates.description` \<string\> description
- `updates.statements` \<PolicyStatement[]\>
- `updates.newCode` \<string\> The new unique id. If it is passed in, it must be unique in the user pool.

#### Example

```javascript
const policy = await managementClient.policies.update("CODE", {
  newCode: "NEWCODE",
});
```

#### Return value

- `Promise<DeepPartial<Policy>>`

## Get policy details

PoliciesManagementClient().detail(code)

> Get policy details

#### Parameter

- `code` \<string\> Unique id of the policy

const policy = await managementClient.policies.detail('CODE');

#### Example

#### Return value

- `Promise<DeepPartial<Policy>>`

## Get policy list

PoliciesManagementClient().list(options)

> Get policy list

#### Parameter

- `options` \<Object\>
- `options.page` \<number\> The default value is: `1`.
- `options.limit` \<number\> The default value is: `10`.
- `options.excludeDefault` \<boolean\> Whether to exclude system default resources. The default value is: `true`.

#### Example

```javascript
const { list, totalCount } = await managementClient.policies.list({
  excludeDefault: false, // include the system default policy
});
```

#### Return value

- `Promise<DeepPartial<PaginatedPolicies>>`

## Get policy assignment record

PoliciesManagementClient().listAssignments(code, page, limit)

> Get policy assignment record

#### Parameter

- `code` \<string\> Unique id of the policy
- `page` \<number\> The default value is: `1`.
- `limit` \<number\> The default value is: `10`.

#### Example

```javascript
const { totalCount, list } = await managementClient.policies.listAssignments(
  "CODE"
);

// list sample data

[
  {
    code: "PolicyCode", // Unique id of the policy
    targetType: "USER", // 'USER' or 'ROLE'
    targetIdentifier: "5f8812866795cc0026352fc5", // user ID or role code
  },
  {
    code: "PolicyCode", // Unique id of the policy
    targetType: "ROLE", // 'USER' or 'ROLE'
    targetIdentifier: "ROLE_CODE", // user ID or role code
  },
];
```

#### Return value

- `Promise<PaginatedPolicyAssignments>`

## Add a policy assignment

PoliciesManagementClient().addAssignments(policies, targetType, targetIdentifiers)

> Add a policy assignment. You can assign the policy to users and roles, and the policy assigned to the role will be inherited by all users in this role. This interface can perform batch operations.

#### Parameter

- `policies` \<string[]\> policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> user id list and role code list

#### Example

```javascript
import { PolicyAssignmentTargetType } from "approw-js-sdk";

await managementClient.policies.addAssignments(
  ["code1", "code2"],
  PolicyAssignmentTargetType.User,
  ["USERID"]
);

await managementClient.policies.addAssignments(
  ["code1", "code2"],
  PolicyAssignmentTargetType.Role,
  ["ROLE_CODE"]
);
```

#### Return value

- `Promise<CommonMessage>`

## Remove a policy assignment

PoliciesManagementClient().removeAssignments(policies, targetType, targetIdentifiers)

> Remove a policy assignment. This interface can perform batch operations.

#### Parameter

- `policies` \<string[]\> policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> user id list and role code list

#### Example

```javascript
import { PolicyAssignmentTargetType } from "approw-js-sdk";

await managementClient.policies.removeAssignments(
  ["code1", "code2"],
  PolicyAssignmentTargetType.User,
  ["USERID"]
);

await managementClient.policies.removeAssignments(
  ["code1", "code2"],
  PolicyAssignmentTargetType.Role,
  ["ROLE_CODE"]
);
```

#### Return value

- `Promise<CommonMessage>`
