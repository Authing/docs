# Configure SMS Authentication (MFA)

## Overview

MFA is a security system that is a secondary identity verification for verifying the legitimacy of an operation. For example, remote login requires SMS verification. This article introduces the multi-factor authentication method based on SMS verification code.

## Prerequisite

1. <a :href="`${$themeConfig.consoleDomain}`">Register a new {{$localeConfig.brandName}} Account</a>
2. [Complete the creation of the user pool and application](/guides/basics/authenticate-first-user/use-hosted-login-page.md)

## Enable SMS-based MFA

**1.Enter the selected user pool and select the application that needs to enable SMS MFA**

<img src="./images/4-1.png" style="margin-top: 20px;" class="md-img-padding" />

::: img-description
Select User Pool
:::

<img src="./images/4-2.png" style="margin-top: 20px;" class="md-img-padding" />

::: img-description
Select Application
:::

**2.Click MFA, then enable SMS Verification Code**

<img src="./images/4-3.png" style="margin-top: 20px;" class="md-img-padding" />

**3.Enter  Users and create a user for SMS MFA login.**

<img src="./images/4-4.png" style="margin-top: 20px;" class="md-img-padding" />

<img src="./images/4-5.png" style="margin-top: 20px;" class="md-img-padding" />

## Use SMS-based MFA Login

**1.Click Login, login with the user created above.**

<img src="./images/4-6.png" style="margin-top: 20px;" class="md-img-padding" />

::: img-description
Click Login
:::

<img src="./images/4-7.png" style="margin-top: 20px;" class="md-img-padding" />

::: img-description
Login with phone number and password
:::

**2. Click Send, and enter the verification code to complete the SMS-based MFA verification process.**

<img src="./images/4-8.png" style="margin-top: 20px;" class="md-img-padding" />

::: img-description
Second authentication succeeded
:::

## Disable SMS-based MFA

**1. Enter the Application Details and disable the SMS verification code option.**

<img src="./images/4-9.png" style="margin-top: 20px;" class="md-img-padding" />
