---
meta:
  - name: description
    content: Console Overview
---

# Console Overview

<LastUpdated/>

The console is where you can manage manage all aspects of your Authing resource and configuration.

In [Authing Console](https://console.authing.cn/console/userpool), you can configure and modify Authing's resources, users and other information.

![](./images/console-1.png)

::: img-description
Console Overview
:::

The following table contains a brief overview of the different Console pages and what you can do on each:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Section</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td style="text-align:left"><b>Overview</b></td>
      <td style="text-align:left">
        <p>Application Entrance:</p>
        <ol>
          <li>1. Try Your Login Box.</li>
          <li>2. Add an Identity Provider.</li>
          <li>3. Create an Application. </li>
        </ol>
        <p>You can check users' Login Activities, such as: </p>
        <ol>
          <li>The total number of users.</li>
          <li>The number of users increased today.</li>
          <li>The number of users who registered and logged in within seven days.</li>
        </ol>
      </td>
    </tr>
        <tr>
      <td style="text-align:left"><b>Application</b></td>
      <td style="text-align:left">
        <p>You can create and manage applications, such as: </p>
        <ol>
          <li>Integrating the OIDC protocol for the application.</li>
          <li>Integrating the OAuth 2.0 protocol for the application.</li>
          <li>Integrating the SAML protocol.</li>
          <li>Modifying the default page display configuration.</li>
          <li>Adding custom CSS to configure multi-factor authentication.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Connection</b></td>
      <td style="text-align:left">
        <p>You can connect to third-party identity sources, such as: </p>
        <ol>
          <li>Configure social login.</li>
          <li>Connect to Enterprise Identity Sources (OIDC, SAML).</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Users & Roles</b></td>
      <td style="text-align:left">
        <p>You can manage all users in the system, such as:</p>
        <ol>
          <li>Viewing/modifying user's basic information.</li>
          <li>Viewing login history, login location and original JSON data.</li>
          <li>Setting user groups and user roles.</li>
          <li>Creating an organization. </li>          
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Privilege Management</b></td>
      <td style="text-align:left">
        <p>You can focus on resources, based on PBAC for fine-grained authorization management, such as: </p>
        <ol>
          <li>View and add resources.</li>     
          <li>View and add policies. </li>     
          <li>Authorize policies for users, roles, groups, and organizations.</li>     
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Dvelopers</b></td>
      <td style="text-align:left">
        <p>You can find the API, SDK you need for development.</p>
        <ol>
          <li>API.</li>
          <li>Quick integration.</li>
          <li>Web UI.</li>
          <li>SDK.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Rules & Hooks</b>
      </td>
      <td style="text-align:left">
      <p>You can find Pipeline, Webhook, and custom password functions to enhance the flexibility and scalability of the authentication process. </p>
      <ol>
        <li>Pipeline;</li>
        <li>Webhook;</li>
        <li>Custom password function.</li>
      </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Audit Logs</b>
      </td>
      <td style="text-align:left">
      <p>You can view user operation logs and administrator logs.</p>
      </td>
    </tr>
     <tr>
      <td style="text-align:left"><b>Billing</b>
      </td>
      <td style="text-align:left">
      <p>You can upgrade service and check order details.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Laboratory</b>
      </td>
      <td style="text-align:left">
      <p>You can configure the application panel and create related synchronization tasks.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Configuration</b>
      </td>
      <td style="text-align:left">
      <p>You can edit or delete user pools, modify the configuration of the message service:</p>
      <ol>
        <li>User pool information.</li>
        <li>Security information.</li>
        <li>Message service.</li>
        <li>Extended fields.</li>
        <li>Collaboration administrators.</li>
      </ol>
      </td>
    </tr>
  </tbody>
</table>

## Application

### Application list

![](./images/console-2.png)
::: img-description
Application list
:::

### Application Details

In this page, you can configure the OIDC protocol, the OAuth2.0 protocol and the SAML protocol, modify the application display configuration, etc.

![](./images/console-3.png)
::: img-description
Application Details
:::

### Social Login

::: page-ref /guides/connections/social.md
:::

## Connections

Authing can connect to Social Logins, Enterprise Connections and Custom Databases Connections.

### Social Login

![](./images/console-4.png)
::: img-description
Social Login
:::

### Enterprise Connections

![](./images/console-5.png)
::: img-description
Enterprise Connections
:::

### Custom Databases

![](./images/console-6.png)
::: img-description
Custom Databases
:::

## Users & Roles

### Users

![](./images/console-7.png)

::: img-description
Users
:::

### User Detail

![](./images/console-8.png)
::: img-description
User Detail
:::

## Groups

![](./images/console-9.png)

::: img-description
Groups
:::

### Organization's Directory

![](./images/console-10.png)

::: img-description
Organization's Directory
:::

### Registration Whitelist

![](./images/console-11.png)

::: img-description
Registration Whitelist
:::

### LDAP

![](./images/console-12.png)

::: img-description
LDAP
:::

## Privilege Management

![](./images/console-13.png)
::: img-description
Privilege Management
:::

## Developers

You can find necessary information such as API and SDK for development on the Developers page.

![](./images/console-14.png)

::: img-description
SDK
:::

## Rules & Hooks

Authing's Pipeline, Webhook, and custom password functions can greatly enhance the flexibility in the authentication process and empower users to automate complex scenarios.

### Pipeline

![](./images/console-15.png)
::: img-description
Pipeline
:::

### Webhook

![](./images/console-16.png)
::: img-description
Webhook
:::

### Custom Password Encryption

![](./images/console-17.png)

![](./images/console-18.png)

## Audit Logs

You can view the recent user activity log and administrator activity log.

### User Activity Logs

![](./images/console-19.png)
::: img-description
User Activity Logs
:::

### Administrator Activity Logs

![](./images/console-20.png)
::: img-description
Administrator Activity Logs
:::

## Billing

### Subscription

![](./images/console-21.png)
::: img-description
Subscription
:::

### Payment

![](./images/console-22.png)
::: img-description
Payment
:::

## Laboratory

### Application Panel

![](./images/console-23.png)
::: img-description
Application Panel
:::

### Sync Center

![](./images/console-24.png)
::: img-description
Sync Center
:::

## Configuration

### Basic Settings

![](./images/console-25.png)
::: img-description
Basic Settings
:::

### Security Informatio

1. Security Domain (CORS).
2. JWT Expiration Time.
3. Prohibiting the registration.
4. Frequent registration restrictions.
5. Limitation of failed logins.
6. Set New Registered Email Default To be Verified.

The security domain is the URL that allows requests from JavaScript to the Authing API (usually used with CORS). By default, the system will allow you to use all URLs (). If required, this field allows you to enter other sources. You can separate multiple valid URLs line by line, and use wildcards at the subdomain level（For example：[https://\*.sample.com）。](https://*.sample.com）) to verify these URLs without considering the query string and hash information, if you bring the query The string and hash information system will automatically ignore the entire domain name.

![](./images/console-26.png)

::: img-description
Security Domain
:::

### Message Service

#### Email Templates

There are four types of email templates can be configured in the email template:

1. **Welcome Email** :This email will be sent if the user registers with the email.
2. **Verification Email** : If the user registers with the email, a verification email will be sent to the user to verify the email, and the user can click the link to complete the verification.
3. **Change Password** : This email will be sent when the user requests to change the password, with a verification code attached to the email, and the user needs to fill in this verification code to complete the password modification.
4. **Reset password** : When the user forgets the password, the system will send this password reset email, with a verification code attached to the email, and the user will be able to reset the password after submitting the verification code and new password.

![](./images/console-27.png)

::: img-description
Email Templates
:::

#### Third-party Email Providers

You can customize the mail server on this page.

![](./images/console-28.png)

::: img-description
Third-party Email Providers
:::

For more information:

::: page-ref /guides/userpool-config/email/
:::

#### SMS Verification Service

SMS verification allows users to log in with a one-time password sent to their phone in the form of SMS. Currently, SMS template modification is not supported.

![](./images/console-29.png)

::: img-description
SMS Verification
:::
