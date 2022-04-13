---
meta:
  - name: description
    content: 移动应用 SSO
---

# Implement Single Sign-on on Mobile

<LastUpdated/>

Mobile application single sign-on (SSO) is similar to traditional[Web application SSO](../sso/README.md), which means that in multiple application systems, users only need to log in once to access all trusted application systems.

Approw currently supports two forms of mobile SSO:

1. Automatically detect the login status of associated apps on the same device.
2. Invoke associated apps to exchange user information.

## Automatic detection method

The automatic detection method is similar to the Meituan App. As long as one of the mutual trust systems on the same device is logged in, it can detect the relevant user and prompt the user whether to log in with this account, thereby achieving single sign-on.

As shown below:

<img src="https://cdn.authing.cn/blog/image%20%28595%29.png" height=500 style="display:block;margin: 0 auto;">

You can view the demo of this video：

<video controls>
  <source src="./Authing-App-SSO-Demo.mp4" type="video/mp4">
</video>

[Learn more](./track-session.md)

## The way of invoking App

The method of awakening the App refers to awakening application B in application A, the user agrees to log in in application B, and then redirect to application A, and the application A obtains user information in some way. This model is under development.

