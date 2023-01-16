


 执行命令
 [#](#执行命令 "永久链接")
=========================================================



 Execute Command节点在运行n8n的主机上运行shell命令。
 




 哪个shell运行该命令？
 



 此节点在主机的默认shell中执行命令。例如，Windows上的cmd和macOS上的zsh。
 



 如果使用Docker运行n8n，则命令将在n8n容器中运行，而不是在Docker主机中运行。
 





 云上不可用
 



 此节点在n8n云上不可用。
 




 节点参考
 [#](#节点引用 "永久链接")
-------------------------------------------------------



 “执行命令”节点有两个属性：
 


1. **执行一次**
 toggle：这是一个布尔字段，指定您希望节点只执行一次，还是对它接收到的每个项目执行一次。
2. **命令**
 field：这是一个文本字段，用于指定要在主机上执行的命令。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您使用“执行命令”节点执行返回已满硬盘百分比的命令。工作流每天触发两次，如果内存使用率超过80%，它将使用Twilio节点发送一条短信。您还可以找到
 [工作流](https://n8n.io/workflows/716) 
 此示例使用工作流将使用以下节点。
 


*[调度触发器]（/integrations/builtin/core nodes/n8n nodes base.schedumetrigger/）
*执行命令
*[IF]（/integrations/builtin/core nodes/n8n nodes base.IF/）
*[Twilio]（/integrations/builtin/app nodes/n8n nodes-base.Twilio/）
*[无操作，不执行任何操作]（/integrations/builtin/core-nodes/n8n-nodes-base.noop/）



 最终的工作流应如下图所示。
 



![具有“执行命令”节点的工作流](https://d33wubrfki0l68.cloudfront.net/a98f4ee53324f3db5b9f46535f9c16e7e41ba568/6523b/_images/integrations/builtin/core-nodes/executecommand/workflow.png)



### 
 1. 铬on节点
 [#](#1-cron-node "永久链接")



 Cron节点将在每天上午9点和下午4点触发工作流两次。
 


1. 单击
 **添加Cron时间**
 .
2. 从
 **模式**
 下拉列表。
3. 输入
 `9` 
 在
 **小时**
 领域
4. 单击
 **添加Cron时间**
 .
5. 从
 **模式**
 下拉列表。
6. 输入
 `16` 
 在
 **小时**
 领域
7. 单击
 **执行节点**
 以运行节点。



![使用Cron节点每天触发两次工作流](https://d33wubrfki0l68.cloudfront.net/b31371e1ce3fed28957200d3c85f7baa4ad86a22/c0d94/_images/integrations/builtin/core-nodes/executecommand/cron_node.png)



### 
 2. 执行命令节点
 [#](#2-执行命令节点 "永久链接")



 “执行命令”节点执行命令并返回主机上使用的硬盘空间百分比。
 


1. 输入
 `df-k/|tail-1|awk“｛print$5｝”`
 在
 **命令**
 字段。
2. 单击
 **执行节点**
 以运行节点。



 在下面的屏幕截图中，注意节点执行命令并返回硬盘已满的百分比。
 



![使用“执行命令”节点获取主机上使用的硬盘百分比](https://d33wubrfki0l68.cloudfront.net/94fec885d8aaba00ad67d870e208038f5516d64c/99d18/_images/integrations/builtin/core-nodes/executecommand/executecommand_node.png)



### 
 3. IF节点
 [#](#3-if-node "永久链接")



 此节点将比较我们从Execute Command节点获得的硬盘空间使用百分比。如果内存使用率超过80%，则返回true，否则返回false。
 


1. 单击
 **添加条件**
 并从下拉列表中选择“数字”。
2. 单击
 **值1**
 字段并单击
 **添加表达式**
 .
3. 输入
 `｛｛parseInt（$node[“Execute Command”].json[“stdout”]）｝｝`
 在
 **表达式**
 领域“执行命令”节点的输出是一个字符串。这个
 `parseInt（）`
 方法将字符串转换为整数。
4. 从
 **操作**
 下拉列表。
5. 设置
 **值2**
 至80。
6. 单击
 **执行节点**
 以运行节点。



 在下面的屏幕截图中，您会注意到当使用的硬盘空间百分比超过80%时，节点会返回一个输出。
 



![使用IF节点检查所用硬盘空间的百分比是否大于80%](https://d33wubrfki0l68.cloudfront.net/99a809c1f34bf6e15119b687f0c785adc709ccf5/bfced/_images/integrations/builtin/core-nodes/executecommand/if_node.png)



### 
 4. Twilio节点（发送：sms）
 [#](#4-twilio-node-sensited sms "永久链接")



 当硬盘空间使用率超过80%时，此节点会向指定的电话号码发送SMS。
 


1. 创建一个连接到IF节点“true”输出的Twilio节点。
2. 您必须输入Twilio节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/twilio/）
 .
3. 在
 **发件人**
 领域
4. 在
 **至**
 字段。
5. 单击
 **消息**
 字段并单击
 **添加表达式**
 .
6. 输入
 `您的硬盘空间正在快速填满！您的硬盘已｛｛$node[“Execute Command”].json[“stdout”]}｝满。`
 在
 **表达式**
 字段。
7. 单击
 **执行节点**
 以运行节点。



 在下面的屏幕截图中，请注意，该节点发送一条SMS，其中包含您从Execute Command节点获得的硬盘空间使用百分比。
 



![使用Twilio节点发送短信](https://d33wubrfki0l68.cloudfront.net/d33485131595a9e28f758f90cbfe4e7ac43c4499/56455/_images/integrations/builtin/core-nodes/executecommand/twilio_node.png)



### 
 5. NoOp节点
 [#](#5-noop-node "永久链接")



 在此处添加此节点是可选的，因为缺少此节点不会对工作流的功能产生影响。
 


1. Create a
 **NoOp** 
 node connected to the 'false' output of the IF node.
2. Click on
 **Execute Node** 
 to run the node.



![Using the NoOp node](https://d33wubrfki0l68.cloudfront.net/5a59d41353bf8540418daff3ecb1c66c09e7b500/05202/_images/integrations/builtin/core-nodes/executecommand/noop_node.png)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to run multiple commands in the Execute Command node?
 [#](#how-to-run-multiple-commands-in-the-execute-command-node "Permanent link")



 You can combine multiple commands using
 `&&` 
 . For example, you can combine the change directory (cd) command with the list (ls) command using
 `&&` 
 .
 





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
cd bin && ls

```

 |




 To run multiple commands, you can also write the commands on separate lines. For example, you can write the list (ls) command on a new line after the change directory (cd) command.
 





|  |  |
| --- | --- |
| 

```
1
2
```

 | 

```
cd bin
ls

```

 |



### 
 How to run the curl command in the Execute Command node?
 [#](#how-to-run-the-curl-command-in-the-execute-command-node "Permanent link")



 You can also use the
 [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) 
 node to make a cURL request.
 



 If you want to run the curl command in the Execute Command node, you will have to build a Docker image based on the existing n8n image. The default n8n Docker image uses Alpine Linux. You will have to install the curl package.
 


1. Create a file named Dockerfile.
2. Add the below code snippet to the Dockerfile.
 


|  |  |
| --- | --- |
| 

```
1
2
```

 | 

```
FROM n8nio/n8n
RUN apk --update add curl

```

 |
3. In the same folder, execute the command below command to build the Docker image.
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
docker build -t n8n-curl

```

 |
4. Replace the Docker image you used before. For example, replace
 `n8nio/n8n` 
 with
 `n8n-curl` 
 .
5. Run the newly created Docker image, and you will now be able to execute ssh via the Execute Command-Node.




