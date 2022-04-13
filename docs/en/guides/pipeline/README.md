# Custom authentication process（Pipeline）

<LastUpdated/>

## Introduction

Approw Pipeline is a set of user-defined JavaScript codes running in the cloud, allowing developers to extend and customize Approw capabilities. 

Approw Pipeline functions are all user-definable, and we also provide a rich [function template](https://github.com/authing/pipeline)to help developers get started quickly.

Pipeline is a set of functions. The difference from ordinary Hooks is that the function data in the entire pipeline can be transferred to each other to achieve the same effect as an industrial pipeline. This design pattern can make the developer's custom function more modular and easy to manage.

The back-end of {{$localeConfig.brandName}} Pipeline uses a serverless architecture, and all user-defined codes run in the cloud to ensure isolation between different tenants, and at the same time, it can be elastically scaled, which not only ensures security, but also improves operating efficiency.

![](https://cdn.authing.cn/blog/authing-pipeline.png)


## Application scenarios

With the help of {{$localeConfig.brandName}} Pipeline，developers can achieve the following functions:

* Whitelist mechanism: such as the whitelist of registered mailbox suffixes, the whitelist of registered IPs, etc.
* Event notification: such as sending group notification after user registration, notification of user login IP exception, etc.
* Permission control: such as adding users to a user group based on their mailbox after logging in.
* Extended user fields: add custom metadata to the requesting user.
* Custom token: For example, add custom fields to the token.
* ... and more, the imagination is endless.


Let's [create your first Pipeline function](./write-your-first-pipeline-function.md)！
