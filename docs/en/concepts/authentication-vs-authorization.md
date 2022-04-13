# Authentication vs Authorization 

<LastUpdated/>

When developing or managing an application, we often see two nouns-authentication and authorization. Oftentimes authentication and authorization appear in the same context.
Although these two categories are often classified in the same context, they are actually  conceptually different.

In simple terms, authentication is the process of verifying one’s identity, and authorization is the process of verifying that one has access.

## What is Authentication

Authentication is about verifying your credentials, such as username/email and password, to verify the identity of the visitor. The system determines whether you are using the credentials you are talking about. In public and private networks, the system authenticates users through login passwords. Identity authentication is usually done through a username and password. Sometimes the authentication can be done in the form of a password, and also through other factors such as a mobile phone verification code or biometrics.

In order to pursue higher security, multiple authentication factors are often required to be used together. This is what we often call a multi-factor authentication.

Common authentication methods:

- Username password authentication
- Mobile phone and SMS verification code authentication
- E-mail and mail verification code authentication
- Biometric authentication of face recognition/fingerprint recognition
- OTP certification
- Radius network authentication


## What is Authorization

Authorization occurs after the system completes the identity authentication, and will eventually grant you full access to resources (such as information, files, databases, funds, locations, and almost any content). 
Authorization is the process of determining whether an authenticated user can access a specific resource. It verifies whether you have the right to grant access to information, databases, files and other resources. Authorization usually confirms your permissions after verification. A simple way to up it, it's like granting someone permission to do a task or anything.

Visualize it as a process of verifying and confirming the mailbox and password in the organization. It is to determine which employee can access which floor. For example, suppose you are traveling and you are about to board a plane. You first will have to show your ticket and some proof of identification before registration. After that, you will receive a boarding pass that proves that the airport authority has verified your identity. But the flight attendant must also authorize you to board the flight that you need to take, when you enter the aircraft and its resources.

## Authentication vs Authorization 

| Authentication                                                             | Authorization                                                      |
|----------------------------------------------------------------------------------|------------------------------------------------------------|
| Verify the identity to grant access to the system.                                                | Authorization determines whether you have permission to access resources.                           |
| This is the process of verifying user credentials to gain user access.        | This is the process of verifying whether access is allowed.         |
| It determines whether the user is who he claims to be.                         | It determines what the user can and does not access.             |
| Authentication usually requires a username and password.                                  | The authentication factors required for authorization may vary, depending on the security level. |
| Authentication is the first step in authorization, so it is always the first step.                              | Authorization is completed after successful verification.        |
| For example, students from a specific university need to be authenticated before accessing the student link on the university’s official website. | For example, authorization determines what information the student has access to on the university website after successful authentication. |