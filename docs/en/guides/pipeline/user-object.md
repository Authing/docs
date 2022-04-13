---
meta:
  - name: description
    content: user object
---

# User object

<LastUpdated/>


The user object saves various data of the current user, as well as methods for adding user-defined fields and user-defined token fields.

::: hint-warning
There is no user object in the Pre-Register Pipeline.
:::

## Attribute

| Attribute name        | Value type  | Description                                          |
| -------------- | ------- | --------------------------------------------- |
| id             | string  | User ID                                       |
| username       | string  | username                                        |
| email          | string  | email                                          |
| emailVerified  | boolean | Is the mailbox verified                                |
| phone          | string  | phone number                                        |
| phoneVerified  | boolean | Is the phone number verified                              |
| photo          | string  | Avatar link                                      |
| nickname       | string  | nickname                                          |
| gender         | string  | gender                                          |
| signedUp       | string  | Registration time, the format is 2020-02-07T04:29:40.877Z     |
| lastLogin      | string  | Last login time, the format is 2020-02-07T04:29:40.877Z |
| oauth          | string  | Social login information                                |
| registerMethod | string  | Method to register                                      |
| blocked        | boolean | Is it blocked                                 |
| company        | string  | Company name                                        |
| browser        | string  | The browser used by the user                                    |
| device         | string  | The device used by the user                                     |
| country        | string  | country                                         |
| region         | string  | region                                          |
| address        | string  | address                                          |

## Method

| Method Name        | Description                                                                                                                                                                                                                                                                                                                                                                                | Sample code                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| addCustomData | Add user-defined fields. You need to define preset user-defined fields at the user pool level before setting them for users in the Pipeline.                                                                                                                                                                                                                                                                                  | user.addCustomData("KEY", "VALUE") |
| addToken      | **This method is not recommended**，This method is currently limited to users who are compatible with older versions of  {{$localeConfig.brandName}}. Please use the  `addIdToken` below. Calling this method can add custom fields to the token when issuing the token to the user. The new fields will appear under the token.payload.data object. The length of VALUE cannot exceed 100 characters. Otherwise, the token will be too long. To learn how to verify and decrypt Token, please refer to [Verify Token](/user/token.md)。**This interface is only available in the POST_AUTHENTICATION（after login） Pipeline.** | user.addToken('KEY', 'VALUE')      |
| addIdToken    | Setting idToken custom fields can also be used to replace the original idToken content. **This interface is only available in Pre-OIDCTokenIssued Pipeline.**                                                                                                                                                                                                                                                                      | user.addIdToken("KEY","VALUE")     |
