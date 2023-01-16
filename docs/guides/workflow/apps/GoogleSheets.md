


 谷歌工作表
 [#](#google sheets "永久链接")
=====================================================



[谷歌表单](https://www.google.com/sheets) 
 是一个基于网络的电子表格程序，是谷歌办公软件套件的一部分，属于谷歌硬盘服务。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/在里面tegrations/builtin/credentials/google/）
 .
 




 操作
 [#](#操作 "永久链接")
-----------------------------------------------


*文件
	+创建
	+删除
*文档中的工作表
	+附加：将数据附加到图纸
	+追加或更新：追加新行，或更新当前行（如果已存在）。
	+清除：清除工作表中的所有数据
	+创建：创建新图纸
	+删除：从工作表中删除列和行
	+读取行：读取工作表中的所有行。
	+移除：移除图纸
	+更新：更新工作表中的行



 相关资源
 [#](#相关资源 "永久链接")
-------------------------------------------------------------



 提到
 [Google Sheet的API文档](https://developers.google.com/sheets/api) 
 有关服务的详细信息。
 



 看法
 [示例工作流和相关内容](https://n8n.io/integrations/google-sheets/) 
 在n8n的网站上。
 



 更新操作
 [#](#更新操作 "永久链接")
-------------------------------------------------------------



 要更新图纸中的数据，请执行以下操作：
 


1. 选择您的
 **身份验证**
 方法和凭证。提到
 [Google凭据]（/integrations/builtin/credentials/Google/）
 了解更多信息。
2. 输入
 **资源**
 选择
 **文档内的工作表**
 .
3. 输入
 **操作**
 ，选择一个追加操作。
4. 选择
 **文件**
 和
 **表**
 您想要编辑。
5. 选择您的
 **数据模式**
 :
 


	***自动将输入数据映射到列**
	 ：当节点输入视图中的表列名（或JSON参数名）与电子表格中的列名匹配时，使用此选项。在
	 **要匹配的列**
	 ，在Google Sheets中选择要映射到的列名称。
	***将每个列映射到下面**
	 ：当节点输入数据中的列名和数据结构与Google Sheets中的名称和结构不匹配时，使用此选项。
	 
	
	
		1. 输入
		 **要匹配的列**
		 ，在Google Sheets中选择或输入列名。
		2. 输入
		 **要匹配的列的值**
		 ，拖动要搜索其值的表列（或JSON参数）。
		3. 输入
		 **要发送的值**
		 选择
		 **添加字段**
		 .
		4. 输入
		 **列**
		 以及要添加到该列的节点输入数据的值
		 **值**
		 .
		 
		
		
		
		
		 查看示例和屏幕截图
		 
		
		 此示例使用Cus到mer Datastore节点提供要加载到Google Sheets中的示例数据。它假设您已经设置了
		 [凭据]（/integrations/builtin/credentials/google/）
		 .
		 
		
		
		
			1. 设置具有两列的Google Sheet，
			 `测试1`
			 和
			 `测试`
			 在里面
			 `测试1`
			 ，从Customer Datastore节点输入名称：
			   
			
			![为测试设置的电子表格](https://d33wubrfki0l68.cloudfront.net/59a7dac71457ea97f05fcffc2e2d863e77c31af6/0fffc/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-before.png)
			2. 创建工作流：使用手动触发器、Customer Datastore和Google Sheets节点。
			   
			
			![为测试设置的电子表格](https://d33wubrfki0l68.cloudfront.net/02363e15685e39c6aa93356d31c686db1e9b4ec9/418c4/_images/integrations/builtin/app-nodes/googlesheets/workflow.png)
			3. 打开Customer Datastore（客户数据存储）节点，启用
			 **全部返回**
			 ，然后选择
			 **执行节点**
			 .
			4. 在Google Sheets节点中，使用以下设置完成以上步骤：
				+选择
				 **更新**
				 作为
				 **操作**
				 .
				+在
				 **要匹配的列**
				 ，选择
				 `测试1`
				 .
				+对于
				 **要匹配的列的值**
				 ，在
				 **名称**
				 列。
				+然后设置
				 **要发送的值**
				 ：输入
				 `测试2`
				 in
				 **列**
				 ，然后拖动
				 **电子邮件**
				 输入视图中的列
				 **值**
				 .
			5. 选择
			 **执行节点**
			 .
			6. 查看电子表格。
			 **测试2**
			 现在应该包含与输入数据中的名称匹配的电子邮件地址。
			   
			
			![为测试设置的电子表格](https://d33wubrfki0l68.cloudfront.net/08ef1c47a2e4b02f947e9e9aca02fab1d512f6c8/6aa45/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-after.png)
	***什么都没有**
	 ：不映射任何数据。



 读取操作
 [#](#读取操作 "永久链接")
---------------------------------------------------------



 要从工作表中读取：
 


1. 选择您的
 **身份验证**
 方法和凭证。提到
 [Google凭据]（/integrations/builtin/credentials/Google/）
 了解更多信息。
2. 输入
 **资源**
 选择
 **文档内的工作表**
 .
3. 输入
 **操作**
 选择
 **读取行**
 .
4. 选择
 **文件**
 和
 **表**
 你想从中阅读。


### 
 过滤器
 [#](#过滤器 "永久链接")



 默认情况下，Google Sheets节点读取并返回工作表中的所有行。要返回有限的结果集：
 


1. 选择
 **添加筛选器**
 .
2. 输入
 **列**
 ，选择工作表中要搜索的列。
3. 输入
 **值**
 ，输入要搜索的单元格值。您可以在此处拖动输入数据参数。



 如果筛选器匹配多行，n8n将返回第一个结果。如果希望所有匹配的行：
 


1. 低于
 **选项**
 ，选择
 **添加选项**
 >
 **当筛选器具有多个匹配项**
 .
2. 变更
 **当筛选器具有多个匹配项**
 to
 **返回所有匹配项**
 .


### 
 输出格式设置
 [#](#输出格式 "永久链接")



 您可以选择n8n如何格式化Google Sheets返回的数据：
 


1. 秒后etting up the node to read rows, select
 **Add Option** 
 >
 **Output Formatting** 
 .
2. In
 **General Formatting** 
 , choose one of:
	* **Values (unformatted)** 
	 : numbers stay as numbers, but n8n removes currency signs and other special formatting.
	* **Values (formatted)** 
	 : n8n displays the values as they appear in Google Sheets (for example, retaining commas or currency signs) To do this, n8n converts the data type from number to string.
	* **Formulas** 
	 : n8n returns the formula. It doesn't calculate the formula output. For example, if a cell B2 has the formula
	 `=A2` 
	 , n8n returns B2's value as
	 `=A2` 
	 (in text).
3. Choose your preferred
 **Date Formatting** 
 .



 Append an array
 [#](#append-an-array "Permanent link")
---------------------------------------------------------



 To insert an array of data into Google Sheets, you must convert the data into a valid JSON (key, value) format. You can use the
 [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/) 
 to convert the array into JSON format.
 



 Cell formatting for update and append
 [#](#cell-formatting-for-update-and-append "Permanent link")
-----------------------------------------------------------------------------------------------------



 You can choose how to format the data in cells:
 


1. After setting up the node to append data, select
 **Add Option** 
 >
 **Cell Format** 
 .
2. In
 **Cell Format** 
 , select one of:
	* **Let n8n format** 
	 : the new cells in your sheet keep the data type of the data in n8n.
	* **Let Google Sheets format** 
	 : allow Google Sheets to style the cells as if you typed the data directly into the cells.




