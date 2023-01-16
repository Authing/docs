


 谷歌云Fires到re
 [#](#google cloud firestore "永久链接")
=======================================================================



[谷歌云Firestore](https://firebase.google.com/docs/firestore/) 
 是一个灵活、可扩展的数据库，用于Firebase和Google Cloud的移动、web和服务器开发。它通过实时侦听器在客户端应用程序之间保持数据同步，并为移动和网络提供离线支持。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/google/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*文件
	+创建文档
	+创建/更新文档
	+删除文档
	+获取文档
	+从集合中获取所有文档
	+对文档运行查询
*集合
	+获取所有根集合



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在谷歌云Firestore中创建、更新和获取文档。您还可以找到
 [工作流](https://n8n.io/workflows/839) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 Google Cloud Firestore




 最终的工作流应如下图所示。
 



![使用Google Cloud Firestore节点的工作流](https://d33wubrfki0l68.cloudfront.net/4cb960a1b970bb4dec3297b3b83c7027d1e1480c/f7bbf/_images/integrations/builtin/app-nodes/googlecloudfirestore/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")



 我们将使用Set节点来设置名称和id。
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 领域
3. 输入
 `n8n`
 在
 ***价值***
 领域
4. 单击
 ***添加值***
 并从下拉列表中选择“数字”。
5. 输入
 `id `
 在
 ***姓名***
 领域
6. 输入
 `1` 
 在
 ***价值***
 字段。
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到node设置了name和id的值。
 



![使用Set节点设置数据](https://d33wubrfki0l68.cloudfront.net/748f99aa38b78c45a9f0357e6b9740d57752d0be/e3744/_images/integrations/builtin/app-nodes/googlecloudfirestore/set_node.png)



### 
 3. Google Cloud Firestore节点（文档：创建）
 [#](#3-google-cloud-firestore-node-document-create "永久链接")



 此节点将使用上一节点的数据在GoogleCloudFirestore的集合中创建一个新文档。
 


1. 首先，您必须输入Google Cloud Firestore节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/google/）
 .
2. 从
 ***操作***
 下拉列表。
3. 从
 ***项目ID***
 下拉列表。
4. 在
 ***集合***
 领域
5. 输入
 `id，名称`
 在
 ***列/属性***
 领域
6. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点使用上一个节点的数据创建了一个新文档。
 



![使用Google Cloud Firestore节点创建新文档](https://d33wubrfki0l68.cloudfront.net/1b14fcf8624a4499dc754d78afdfde2e3257c87f/1b669/_images/integrations/builtin/app-nodes/googlecloudfirestore/googlecloudfirestore_node.png)



### 
 4. 设置节点
 [#](#4-set-node "永久链接")



 我们将使用Set节点来确保只有在该节点中设置的数据才能传递给工作流中的下一个节点。我们将为
 `名称`
 .
 


1. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
2. 输入
 `名称`
 在
 ***姓名***
 领域
3. 输入
 `节点化`
 在
 ***价值***
 领域
4. 单击
 ***添加值***
 并从下拉列表中选择“字符串”。
5. 输入
 `文档id `
 在
 ***姓名***
 领域
6. 单击
 ***价值***
 字段并单击
 ***添加表达式***
 .
7. 在
 ***变量选择器***
 部分：节点>Google Cloud Firestore>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Google Cloud Firestore”].json[“_id”]｝｝`
 .
8. 切换
 ***仅保留集合***
 to
 `真值`
 。我们将此选项设置为true，以确保只有在此节点中设置的数据才能传递到工作流中的下一个节点。
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到节点设置了
 `名称`
 和
 `文档id `
 。这些值将传递到工作流中的下一个节点。
 



![使用Set节点设置name和document_id的值](https://d33wubrfki0l68.cloudfront.net/3aca5bddd98dadbc237bedf142497f57cc89c729/f6871/_images/integrations/builtin/app-nodes/googlecloudfirestore/set1_node.png)



### 
 5. Google Cloud Firestore1节点（文档：upstart）
 [#](#5-google-cloud-firestore1-node-document-usert "永久链接")



 此节点将更新
 `名称`
 字段。
 


1. 选择您在上一个Google Cloud Firestore节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***项目ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Google Cloud Firestore>参数>projectId。还可以添加以下表达式：
 `｛｛$node[“Google Cloud Firestore”].parameter[“projectId”]｝｝`
 .
5. 单击
 ***科勒ction***
 field and click on
 ***Add Expression***
 .
6. Select the following in the
 ***Variable Selector***
 section: Nodes > Google Cloud Firestore > Parameters > collection. You can also add the following expression:
 `{{$node["Google Cloud Firestore"].parameter["collection"]}}` 
 .
7. Enter
 `document_id` 
 in the
 ***Update Key***
 field.
8. Enter
 `name` 
 in the
 ***Column /Attributes***
 field.
9. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node updates the value of the
 `name` 
 field in the document that we created using the Google Cloud Firestore node.
 



![Using the Google Cloud Firestore node to update a document](https://d33wubrfki0l68.cloudfront.net/1f545411d5198abd774d0d4d232d1347891382cb/0f085/_images/integrations/builtin/app-nodes/googlecloudfirestore/googlecloudfirestore1_node.png)



### 
 6. Google Cloud Firestore node (document: get)
 [#](#6-google-cloud-firestore-node-document-get "Permanent link")



 This node will get the document that we created using the Google Cloud Firestore node.
 


1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the
 ***Project ID***
 field and click on
 ***Add Expression***
 .
3. Select the following in the
 ***Variable Selector***
 section: Nodes > Google Cloud Firestore > Parameters > projectId. You can also add the following expression:
 `{{$node["Google Cloud Firestore"].parameter["projectId"]}}` 
 .
4. Click on the gears icon next to the
 ***Collection***
 field and click on
 ***Add Expression***
 .
5. Select the following in the
 ***Variable Selector***
 section: Nodes > Google Cloud Firestore > Parameters > collection. You can also add the following expression:
 `{{$node["Google Cloud Firestore"].parameter["collection"]}}` 
 .
6. Click on the gears icon next to the
 ***Document ID***
 field and click on
 ***Add Expression***
 .
7. Select the following in the
 ***Variable Selector***
 section: Nodes > Set1 > Output Data > JSON > document\_id. You can also add the following expression:
 `{{$node["Set1"].json["document_id"]}}` 
 .
8. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node returns the document that we created using the Google Cloud Firestore node.
 



![Using the Google Cloud Firestore node to get a document](https://d33wubrfki0l68.cloudfront.net/c5f6de9d7253d62a37e716720e4b2e61b387ebc9/c311a/_images/integrations/builtin/app-nodes/googlecloudfirestore/googlecloudfirestore2_node.png)





