# Basic concepts

This document will introduce some core concepts of Authing identity automation, helping you quickly understand the whole picture. Identity automation essentially helps you quickly implement some functions that originally needed to be implemented through coding in a low code or even no code way, eliminating the complex processes of development, debugging, and deployment.

Similar to programming, to implement a complete process, the following essential elements are necessary:

- How to execute/trigger the workflow you wrote: manually? Timed? API calls? Or is it triggered through events?
- Data processing ability: Set flexible conversion and filtering rules for data.
- Application pre integration: For example, the pre integration of common IM applications in China, such as Feishu, Enterprise WeChat, and DingTalk interfaces.
- rocess control ability: such as the ability to branch, sub process, IF, SWITCH, and loop.

The core concepts that will be introduced below include several core concepts that you need to understand when writing a complete process in Authing identity automation.

## trigger

How to execute your workflow. Authing   Support the following ways to trigger workflow:

1. Manual execution
2. Timed tasks: such as executing every two hours, every day at 6:00 am, and on the first day of each month.
3. Application event: Triggered through the Authing event, such as when the Authing user logs in or when the Authing user account is disabled; Triggered through third-party application events, such as when a Feishu user is created or when an enterprise WeChat approval process is created.
4. Triggering through Webhook: Trigger workflow execution using the webhook address exposed by the HTTP request workflow.
5. API call method: Use HTTP to request the public service address exposed by the workflow, just like you usually request API interfaces. After the workflow execution is completed, the execution result of the workflow can be obtained through HTTP response.



## Controller

When we write programs, we often use flow control methods such as loops, IF, SWITCH, function calls, waiting, and concurrent requests. We also provide flow control nodes for workflows, such as:

- Loop
- IF
- SWITCH
- Subprocess
- Waiting
- Termination process
- ...

## Actuator

The executor refers to the pre integrated application of Authing identity automation, which allows you to complete it without having to worry too much about the underlying calling details of the other party's interface through simple configuration.

Authing identity automation pre integrates hundreds of common domestic and foreign applications, such as:

1. IM applications: such as Feishu, Enterprise WeChat, DingTalk, Welink, Slack, Discord, etc;
2. HR applications: such as Beisen, Kingdee Cloud, Moka, etc;
3. Cloud services: such as AWS, Alibaba Cloud, Tencent Cloud, etc;
4. Development tools: such as HTTP, custom code MySQL、PostgreSQL、MongoDB、 Damang Database, SSH, Jenkins, etc;
5. ....

In addition, in Authing identity automation, you can also call [all open APIs of Authing]（ https://api-explorer.authing.cn/ ）.


### Data processing nodes

The Data Processing (ETL) node is a special type of executor that allows you to flexibly transform data through visualization.

Authoring identity automation provides developers with many flexible and simple data processing (ETL) nodes, such as:

- Data conversion: flexible conversion rules for visual configuration
- Data filtering
- XML parsing
- Array operation
- Date operation
- Numeric operations
- Data encryption/decryption
- ...


## Template

In addition to building a process from scratch like building blocks, we also provide you with a large pre integrated template:

- Feishu upstream synchronization template: You only need to configure a Feishu application key to complete the configuration.
- Enterprise WeChat identity supply/downstream synchronization template: You only need to configure a key for the enterprise WeChat application to complete the configuration.
- ....

After understanding the basic concepts of these core concepts, let's connect them together and start writing your first workflow!
