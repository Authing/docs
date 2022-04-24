---
meta:
  - name: description
    content: Manage MFA
---

# Manage MFA

<LastUpdated/>

This module is primarily used to manage MFA-related operations.

Please use the module in the following ways:

```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$mfaManagementClient = $managementClient->mfa();
$mfaManagementClient->getStatus(USER_ID); // User MFA Binding Status
```

## Get user MFA binding status

MfaManagementClient->getStatus(string \$userId);

Get user MFA binding status

#### parameter

- `userId` \<string\> user ID

#### Example

```php
$mfaManagementClient->getStatus(string $userId);
```

#### Sample data

```json
{
  "FACE": true,
  "OTP": false
}
```

## Mensize user MFA

MfaManagementClient->unAssociateMfa(string $userId, string $mfaType);

Mensize user MFA

#### parameter

- `userId` \<string\> user ID
- `mfaType` \<string\> Melting type, optional value `FACE`, `OTP`

#### Example

```php
$mfaManagementClient->unAssociateMfa(USER_ID, 'OTP');
```

#### Sample data

```json
true
```
