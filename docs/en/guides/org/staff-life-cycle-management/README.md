# Managing the Member Lifecycle

<LastUpdated/>

With the development of the company, the number of internal applications and personnel will continue to increase. Constantly staff onboarding and offboarding, frequent adjustments to the organizational structure of personnel, intricate and complex application account systems within the enterprise, and a sharp increase in the workload of administrators to manually operate accounts. At the same time, the lack of a unified account management control scheme will also bring hidden dangers to enterprise safety production. There are often security risk cases in which employees leave but the application accounts are not closed.

Replacing manual account management with automated **Lifecycle Management(LCM)** is the key to liberating enterprise IT personnel from the tedious and complex identity information management work involved in flexible employment. At the same time, it can also improve the overall business security of the enterprise by shutting down personnel accounts and reducing the authorization error rate.

Account life cycle management has the following advantages:

- Increase productivity and reduce costs
- Reduce complexity
- More secure and compliant

You can read more about [account lifecycle management](/concepts/account-life-cycle-management.md).

## Employee Onboarding

You can perform employee onboarding operations on the organization management page of the console:

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-39-48.png" alt="drawing"/>

### Create an account

You can use your mobile phone number or email to create an account:

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-41-35.png" alt="drawing"/>

### Select the department of the employe

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-42-12.png" alt="drawing"/>

### Authorize the apps that the employee can access

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-42-52.png" alt="drawing"/>

### Authorize roles for this user

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-43-47.png" alt="drawing"/>

## Employee account deactivation

After the account is disabled, the following operations will be performed automatically: 

- Cancel the application authorization relationship
- Cancel the policy authorization relationship
- The account cannot be logged in
- The departmental relationship is still maintained

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-52-24.png" alt="drawing"/>

## Employee resignation

After the employee resigns, the following operations will be performed automatically:

- Cancel the application authorization relationship
- Cancel the policy authorization relationship
- The account cannot be logged in
- Move out of the original department and move to the departed department

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-50-28.png" alt="drawing"/>


## Employee account archive

After the employee account is archived, the following operations will be performed automatically:

The data is readable, but cannot be modified or added.
- Account data retention
- Delete authorization, department, role, group relationship
- The user pool directory is not visible (you need to query the archived accounts separately)
- Can't register again
  - Tip: The user has been archived, please contact the administrator to unarchive

<img src="~@imagesZhCn/guides/org/Xnip2021-02-27_14-51-22.png" alt="drawing"/>

## Delete employee account

All user-related data will be completely deleted. Such as:

- User data
- Application authorization
- Policy authorization
- Departmental Relations
- Grouping relationship
- Role relationship
- Remove from user pool
- Login history

