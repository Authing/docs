---
meta:
  - name: description
    content: Error Code
---

# Error Code

<LastUpdated/>

The error code message format is as follows:

```js
    {
        message: 'The system is busy, please try again later',
        code: 1000,
        data: null
    }
```

|<p>Code</p><p></p>|<p>Description</p><p></p>|
| :- | :- |
|<p>1000</p><p></p>|<p>The system is busy, please try again later</p><p></p>|
|<p>1001</p><p></p>|<p>No permission to perform this operation</p><p></p>|
|<p>2000</p><p></p>|<p>The account is abnormal, you need to enter the verification code</p><p></p>|
|<p>2001</p><p></p>|<p>Verification code verification failed (verification code error)</p><p></p>|
|<p>2002</p><p></p>|<p>Monthly login quota has been used up</p><p></p>|
|<p>2003</p><p></p>|<p>The email format is incorrect when registering or logging in</p><p></p>|
|<p>2004</p><p></p>|<p>User does not exist</p><p></p>|
|<p>2005</p><p></p>|<p>User has been locked</p><p></p>|
|<p>2006</p><p></p>|<p>Incorrect password</p><p></p>|
|<p>2007</p><p></p>|<p>Illegal application name</p><p></p>|
|<p>2008</p><p></p>|<p>Already have an app with the same name</p><p></p>|
|<p>2009</p><p></p>|<p>Illegal application type</p><p></p>|
|<p>2010</p><p></p>|<p>The ID of the application that needs to provide the operation</p><p></p>|
|<p>2011</p><p></p>|<p>Application does not exist</p><p></p>|
|<p>2012</p><p></p>|<p>Default user group is missing</p><p></p>|
|<p>2013</p><p></p>|<p>Illegal application description</p><p></p>|
|<p>2014</p><p></p>|<p>Incorrect input format when searching for users</p><p></p>|
|<p>2015</p><p></p>|<p>Illegal search type when searching for users</p><p></p>|
|<p>2016</p><p></p>|<p>Client password decryption error</p><p></p>|
|<p>2017</p><p></p>|<p>Mail to resolve this mode of meta\_data (macro) command error</p><p></p>|
|<p>2018</p><p></p>|<p>The user does not have permission to modify this item</p><p></p>|
|<p>2019</p><p></p>|<p>erification is required when changing the password</p><p></p>|
|<p>2020</p><p></p>|<p>Not logged in yet, no permission to access this request</p><p></p>|
|<p>2021</p><p></p>|<p>Failed to send mail, reason: unable to get mail template</p><p></p>|
|<p>2022</p><p></p>|<p>User email verification failed, reason: unable to get email template</p><p></p>|
|<p>2023</p><p></p>|<p>User mailbox verification failed, reason: verification link has expired and needs to be resent</p><p></p>|
|<p>2024</p><p></p>|<p>Project description cannot exceed 140 words</p><p></p>|
|<p>2025</p><p></p>|<p>Use the default mail service provider error</p><p></p>|
|<p>2026</p><p></p>|<p>The user already exists, please do not register again</p><p></p>|
|<p>2027</p><p></p>|<p>Registered with OAuth, but tried to log in with a password. The password is not set and cannot be verified. Please log in with OAuth</p><p></p>|
|<p>2028</p><p></p>|<p>Please provide the correct phone number or email address</p><p></p>|
|<p>2029</p><p></p>|<p>Password length cannot be less than 6 digits</p><p></p>|
|<p>2030</p><p></p>|<p>No more than 80 users can be queried at a time</p><p></p>|
|<p>2031</p><p></p>|<p>App has banned user registration</p><p></p>|
|<p>2032</p><p></p>|<p>Password required for registration</p><p></p>|
|<p>2034</p><p></p>|<p>Password required for registration</p><p></p>|
|<p>2035</p><p></p>|<p>Mobile phone number has been bound</p><p></p>|
|<p>2036</p><p></p>|<p>User does not belong to this user pool</p><p></p>|
|<p>2037</p><p></p>|<p>The filled-in old mailbox does not match the actual mailbox</p><p></p>|
|<p>2038</p><p></p>|<p>The filled-in old phone does not match the actual phone</p><p></p>|
|<p>2039</p><p></p>|<p>Domain name is already used</p><p></p>|
|<p>2040</p><p></p>|<p>The number is full</p><p></p>|
|<p>2100</p><p></p>|<p>Registration is too frequent, please try again later</p><p></p>|
|<p>2101</p><p></p>|<p>Please provide the app ID</p><p></p>|
|<p>2200</p><p></p>|<p>The mailbox has been bound</p><p></p>|
|<p>2201</p><p></p>|<p>Please enter the original password</p><p></p>|
|<p>2202</p><p></p>|<p>The modified information does not belong to the current user</p><p></p>|
|<p>2203</p><p></p>|<p>The original password is wrong</p><p></p>|
|<p>2204</p><p></p>|<p>E-mail format is incorrect</p><p></p>|
|<p>2205</p><p></p>|<p>Missing parameter：registerInClient</p><p></p>|
|<p>2206</p><p></p>|<p>Login information has expired, need to log in again</p><p></p>|
|<p>2207</p><p></p>|<p>The login information is wrong, need to log in again</p><p></p>|
|<p>2208</p><p></p>|<p>Please use another email</p><p></p>|
|<p>2209</p><p></p>|<p>No permission to delete this user</p><p></p>|
|<p>2210</p><p></p>|<p>A wrong delete operation was performed, which may be caused by deleting a non-existent user, or other errors occurred during the deletion.</p><p></p>|
|<p>2211</p><p></p>|<p>Missing parameter：username</p><p></p>|
|<p>2212</p><p></p>|<p>Cannot delete root user</p><p></p>|
|<p>2213</p><p></p>|<p>When trying to bind a third-party OAuth login method, it has already been bound</p><p></p>|
|<p>2214</p><p></p>|<p>Failed to read the bound OAuth login method</p><p></p>|
|<p>2215</p><p></p>|<p>When trying to bind a third-party OAuth login method, the account has already been bound</p><p></p>|
|<p>2216</p><p></p>|<p>When trying to unbind the third-party OAuth login method, no OAuth login has been bound</p><p></p>|
|<p>2217</p><p></p>|<p>When trying to unbind the third-party OAuth login method or mailbox, there is only one login method, so it cannot be unbind</p><p></p>|
|<p>2218</p><p></p>|<p>When trying to modify the password, the mailbox is not bound, and modification is not allowed</p><p></p>|
|<p>2219</p><p></p>|<p>When trying to unbind the mailbox, the user did not bind the mailbox</p><p></p>|
|<p>2220</p><p></p>|<p>When trying to create or update an OAuth application, this application name already exists</p><p></p>|
|<p>2221</p><p></p>|<p>When trying to update the OAuth app, the app does not exist</p><p></p>|
|<p>2222</p><p></p>|<p>When trying to create or update OAuth application information, a reserved domain name was used</p><p></p>|
|<p>2223</p><p></p>|<p>When trying to create OAuth application information, a used domain name was used</p><p></p>|
|<p>2224</p><p></p>|<p>User pool does not exist</p><p></p>|
|<p>2225</p><p></p>|<p>The updateUser interface cannot directly modify the mailbox, please use the updateEmail interface</p><p></p>|
|<p>2226</p><p></p>|<p>The updateUser interface cannot directly modify the phone number, please use the updateEmail interface</p><p></p>|
|<p>2227</p><p></p>|<p>To modify the mailbox, the original mailbox must be verified</p><p></p>|
|<p>2228</p><p></p>|<p>To modify the phone number, the original phone number must be verified</p><p></p>|
|<p>2229</p><p></p>|<p>The new mailbox is the same as the old mailbox</p><p></p>|
|<p>2230</p><p></p>|<p>The new mailbox is the same as the old mailbox</p><p></p>|
|<p>2231</p><p></p>|<p>Incomplete request parameters!</p><p></p>|
|<p>2300</p><p></p>|<p>Verification code expired</p><p></p>|
|<p>2401</p><p></p>|<p>Mobile application sso session does not exist</p><p></p>|
|<p>3012</p><p></p>|<p>Macro command execution error</p><p></p>|
|<p>3013</p><p></p>|<p>Sending mail error, unknown error</p><p></p>|
|<p>3014</p><p></p>|<p>Failed to send mail, reason: unable to obtain transporter</p><p></p>|
|<p>3617</p><p></p>|<p>No permission to add collaborators</p><p></p>|
|<p>3618</p><p></p>|<p>No permission to add permission items</p><p></p>|
|<p>3619</p><p></p>|<p>No permission to view the user pool information for this user to participate in collaboration</p><p></p>|
|<p>3620</p><p></p>|<p>Collaborator already exists</p><p></p>|
|<p>3621</p><p></p>|<p>No permission to delete collaboration</p><p></p>|
|<p>3622</p><p></p>|<p>No permission to view list of collaborators</p><p></p>|
|<p>3623</p><p></p>|<p>Collaboration does not exist</p><p></p>|
|<p>3624</p><p></p>|<p>No permission to modify collaborators</p><p></p>|
|<p>3829</p><p></p>|<p>This secondary domain name is already used</p><p></p>|
|<p>4212</p><p></p>|<p>OIDC application does not exist</p><p></p>|
|<p>5000</p><p></p>|<p>Failed to obtain the corresponding application of the order</p><p></p>|
|<p>5001</p><p></p>|<p>Order does not exist</p><p></p>|
|<p>5022</p><p></p>|<p>Failed to create order</p><p></p>|
|<p>5023</p><p></p>|<p>Failed to create Alipay order</p><p></p>|
|<p>5024</p><p></p>|<p>Failed to create order, unknown error</p><p></p>|
|<p>5025</p><p></p>|<p>Failed to create order: the price is illegal</p><p></p>|
|<p>7348</p><p></p>|<p>SAML SP application does not exist</p><p></p>|
|<p>8128</p><p></p>|<p>An error occurred when returning saml assertion</p><p></p>|
