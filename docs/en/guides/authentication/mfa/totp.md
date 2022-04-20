# MFA: Time-Based One-time Password (TOTP) Authentication 

## Summary 

Multi-factor authentication (MFA) is a security system that is a secondary identity verification for verifying the legitimacy of an operation. For example, remote login requires mobile phone SMS verification. Time-Based One-time Password (TOTP) authentication is a way of MFA that constantly generates a new 6-digit password based on a time interval by device.


## Before the start

1. <a :href="`${$themeConfig.consoleDomain}`">Register an {{$localeConfig.brandName}} account</a>
2. [Complete the creation of the user pool and application](/guides/basics/authenticate-first-user/use-hosted-login-page.md)

## Set up a new MFA

**1. Login in to `https://<your_url>.{{$themeConfig.officeSiteDomain}}`. Then access User Center `https://<your_url>.{{$themeConfig.officeSiteDomain}}/u`**

![](./images/1-1.png)

**2. Click Set up new MFA, then scan the QR code to add MFA with Google Authenticator/Microsoft Authenticator. Here is a sample with Microsoft Authenticator.**

<img src="./images/1-2.png" style="margin-top: 20px; width: 300px; margin: 0 auto; display: block;" class="md-img-padding" />

<div style="height: 20px;"></div>

::: img-description
Choose another account
:::

<img src="./images/1-3.png" style="margin-top: 20px; width: 300px; margin: 0 auto; display: block;" class="md-img-padding" />

**3. Add MFA after scanning the code automatically, you can view the MFA just added in the list**

<img src="./images/1-4.png" style="margin-top: 20px; width: 300px; margin: 0 auto; display: block;" class="md-img-padding" />

**4.Click "Next" in the user center, enter the dynamic password displayed on the newly added MFA, complete the confirmation binding, and click "Next"**

<img src="./images/1-5.png" style="margin-top: 20px; width: 300px; margin: 0 auto; display: block;" class="md-img-padding" />

::: img-description
View MFA password on mobile
:::

![](./images/1-6.png)

::: img-description
Enter the MFA password on the binding page
:::

**5.Be sure to keep the recovery code shown here safely. If you lose your MFA in the future, you can use this recovery code to restore account access. Click "Next".**

![](./images/1-7.png)

::: img-description
Success
:::

![](./images/1-8.png)
## Login in with MFA

**1. Please sign out: `https://<your_url>.{{$themeConfig.officeSiteDomain}}/oidc/session/end`. Then access `https://<your_url>.{{$themeConfig.officeSiteDomain}}`. You can log in with the account that has just been bound to MFA, and you will be prompted to enter the security password for secondary authentication.**

![](./images/2-1.png)

**2. Please enter the correct 6-digit password, complete the secondary authentication, and log in.**

![](./images/2-2.png)

::: img-description
MFA is successfull
:::

## Remove MFA

**1. Click "Unbind" to remove MFA**

![](./images/3-1.png)

::: img-description
Remove MFA successfully
:::