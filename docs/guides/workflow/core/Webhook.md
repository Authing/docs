


 Webhook
 [#](#webhook "Permanent link")
=========================================



 The Webhook node is one of the most powerful nodes in n8n. It allows you to create
 [webhooks](https://en.wikipedia.org/wiki/Webhook) 
 which can be used to receive data from apps and services when an event occurs. It is a Trigger node, which means that it serves as the starting point for an n8n workflow. This allows several different services to connect to n8n and run a workflow when data is received.
 




 Keep in mind
 


1. When using the Webhook node on the localhost, ensure that n8n is running with the tunnel mode:
 [npm with tunnel](/hosting/installation/npm/#n8n-with-tunnel) 
 or
 [Docker with tunnel](/hosting/installation/docker/#n8n-with-tunnel) 
 .
	1. When working with a Production webhook, please ensure that you have saved and activated the workflow. Don't forget that the data flowing through the webhook won't be visible in the Editor UI with the Production webhook.




 Webhook nodes can be used as triggers for workflows when we want to receive data and run a workflow based on the data. The Webhook node also supports returning the data generated at the end of a workflow. This makes it very useful to build a workflow to process data and return the results, like an API endpoint.
 



 While building or testing a workflow, we recommend that you use a test webhook URL. Using a test webhook ensures that you can view the incoming data in the Editor UI, which is useful for debugging. Make sure that you click on the
 *Execute Node* 
 button to register the webhook before sending the data to the test webhook. The test webhook stays active for 120 seconds.
 



 🎥 The following playlist will help you learn how to use the Webhook node in n8n.
 







 Node Reference
 [#](#node-reference "Permanent link")
-------------------------------------------------------



 First of all, in the parameters section, we have the Webhook URLs. Clicking on that will reveal the URLs for the webhook. Here you have two options, let's understand the difference between them.
 


1. **Webhook URLs** 



	* **Production** 
	 : A Production webhook is only registered when a workflow has been activated (via the switch on the top right of the page). You will never see its data in the Editor UI. To save the executions, you can either set that as a global default or you can specify that on a per-workflow basis in the workflow settings. You will then see the data from the workflow under ‘Past Executions'.
	* **Test** 
	 : A Test webhook is only registered in the time between executing a workflow via the UI and until the first call gets made (when it displays “waiting for Webhook call”). After the Test webhook gets called for the first time, it displays the data in the Editor UI, and then gets deactivated.
2. **Authentication:** 
 The Webhook node supports two methods of authenticating a request that it receives.
 


	* [**Basic Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
	 — A method of authentication where the specified username and password must be passed along with the request.
	* [**Header Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
	 — A method of authentication where the specified header parameter must be passed along with the request. This method can be used when you want to authenticate using an API key or an access token, for example.
	 !!! tip Keep in mind
	 The
	 **Credential Data** 
	 required for Header Auth credentials will vary on the type used. For example, if you need to provide an
	 `Authorization: Bearer <token>` 
	 header, the Credential Data
	 `Name` 
	 would be
	 `Authorization` 
	 and the
	 `Value` 
	 would be
	 `Bearer <token>` 
	 .
3. **HTTP Method:** 
 The Webhook node supports receiving two types of
 [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) 
 .
 


	* [**GET Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
	 — GET requests are typically used to request data from a resource. This type of request is typically used to retrieve data from a service.
	* [**POST Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
	 — POST requests are typically used to send data to a resource for a create/update operation. This type of request is typically used to send data to a service.
4. **Path:** 
 By default, this field contains a randomly generated webhook URL path, to avoid conflicts with other webhook nodes. You can also manually specify a URL path if necessary. A good example would be if you were using n8n to prototype an API; and wanted consistent endpoint URLs.
5. **Response Code:** 
 Allows you to customize the
 [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
 that the Webhook node will return upon successful execution.
6. **Response When:** 
 This dropdown list allows you to select between two response modes.
 


	* **Webhook received:** 
	 When this option is selected, the Webhook node will return the specified response code along with the message “Workflow got started.”.
	* **Last node finishes:** 
	 When this option is selected, the Webhook node will return the specified response code along with the data output from the last node executed in the workflow.



**Optional Parameters:** 
 The Webhook node also supports several optional methods that can be used during configuration.
 


* [**Response Headers**](https://developer.mozilla.org/en-US/docs/Glossary/Response_header)
 — This option allows you to specify additional headers in the Webhook response.
* **Raw Body** 
 — This option is used to specify when the Webhook node will receive data in a RAW format, such as JSON or XML.
* **Binary Data** 
 — This option is available only when the Webhook node is set to receive POST requests. Setting this to ‘true' lets the Webhook node know that it will receive binary data (such as an image/audio). You can use this option when you expect to receive a file via your Webhook node.



**Conditional Parameters:** 
 The Webhook node also supports several other parameters, that are used only in certain configurations.
 


* **Response Data:** 
 This option is available only when set to respond when ‘Last node finishes'. It allows you to choose which data to return:
	+ **All Entries** 
	 — Choose this option to return all the data generated by the last node in the workflow, as an array.
	+ **First Entry JSON** 
	 — Choose this option to return the first data entry of the last node in the workflow, as a JSON object.
	+ **First Entry Binary** 
	 — Choose this option to return the binary data of the first entry of the last node in the workflow, as a binary file.



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow allows you to receive the weather information of a city using the Webhook and the OpenWeatherMap nodes. You can also find the
 [workflow](https://n8n.io/workflows/807) 
 on n8n.io. This example usage workflow uses the following nodes.
-
 Webhook
 -
 [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap/) 
 -
 [Set](/integrations/builtin/core-nodes/n8n-nodes-base.set/) 




 The final workflow should look like the following image.
 



![A workflow with the Webhook node](https://d33wubrfki0l68.cloudfront.net/9a161a96d237ba318001c119c848cea8d27b855b/9606d/_images/integrations/builtin/core-nodes/webhook/workflow.png)



### 
 1. Webhook node
 [#](#1-webhook-node "Permanent link")



 This node will trigger the workflow. We will make a GET request to the Test URL and pass on a query parameter
 `city` 
 . We will use the value of this query parameter in the next node in the workflow.
 


1. Click on
 ***Webhook URLs***
 and select the 'Test' tab.
2. Copy the displayed URL. We will make a GET request to this URL later on.
3. Select 'Last Node' from the
 ***Response Mode***
 . This will return the data from the last executed node.
4. Select 'All Entries' from the
 ***Response Data***
 . This will return all the entries of the last executed node.
5. Save the workflow to register the webhook.
6. Click on
 ***Execute Node***
 to run the node.
7. In a new browser tab, paste the URL you copied in the previous step and append it with
 `?city=Berlin` 
 . Your URL should look similar to the following URL:
 `https://your-n8n.url/webhook/path?city=Berlin` 
 . We are passing a query parameter
 `city` 
 and assigning it the value
 `Berlin` 
 .
8. Press Enter (or Return) to make a request to the Test Webhook URL.



 In the screenshot below, you will notice that the node triggers the workflow and receives a query parameter. We will use the value of the query parameter in the next node in the workflow.
 



![Using the Webhook node to trigger the workflow](https://d33wubrfki0l68.cloudfront.net/815d842e68660af288d49aad3c0ecc9bdc41d719/e6848/_images/integrations/builtin/core-nodes/webhook/webhook_node.png)



### 
 2. OpenWeatherMap node (Current Weather)
 [#](#2-openweathermap-node-current-weather "Permanent link")



 This node will return data about the current weather for the city that we received in the previous node.
 


1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that
 [here](/integrations/builtin/credentials/openweathermap/) 
 .
2. Click on the gears icon next to the
 ***City***
 field and click on
 ***Add Expression***
 .
3. Select the following in the
 ***Variable Selector***
 section: Nodes > Webhook > Output Data > JSON > query > city. You can also add the following expression:
 `{{$node["Webhook"].json["query"]["city"]}}` 
 .
4. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node returns data about the current weather in Berlin.
 



![Using the OpenWeatherMap node to get weather updates for Berlin](https://d33wubrfki0l68.cloudfront.net/34b74bbdb9b9339983b9f4464e5ba32333afbc44/1e3d8/_images/integrations/builtin/core-nodes/webhook/openweathermap_node.png)



### 
 3. Set node
 [#](#3-set-node "Permanent link")



 We will use the Set node to ensure that only the data that we set in this node gets returned to the workflow. We will set the value of
 `temp` 
 and
 `description` 
 in this node.
 


1. Click on
 ***Add Value***
 and select 'String' from the dropdown list.
2. Enter
 `temp` 
 in the
 ***Name***
 field.
3. Click on the gears icon next to the
 ***Value***
 field and click on
 ***Add Expression***
 .
4. Select the following in the
 ***Variable Selector***
 section: Nodes > OpenWeatherMap > Output Data > JSON > main > temp. You can also add the following expression:
 `{{$node["OpenWeatherMap"].json["main"]["temp"]}}` 
 .
5. Click on
 ***Add Value***
 and select 'String' from the dropdown list.
6. Enter
 `description` 
 in the
 ***Name***
 field.
7. Click on the gears icon next to the
 ***Value***
 field and click on
 ***Add Expression***
 .
8. Select the following in the
 ***Variable Selector***
 section: Nodes > OpenWeatherMap > Output Data > JSON > weather > [Item: 0] > description. You can also add the following expression:
 `{{$node["OpenWeatherMap"].json["weather"][0]["description"]}}` 
 .
9. Toggle
 ***Keep Only Set***
 to
 `true` 
 . We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
10. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sets the values of
 `temp` 
 and
 `description` 
 .
 



![Using the Set node to set the values for temp and description](https://d33wubrfki0l68.cloudfront.net/515745718a3debf9b6d7194cfcfc53ffaaebb8cd/3d3f9/_images/integrations/builtin/core-nodes/webhook/set_node.png)




 Save the workflow and execute it again by clicking on the
 ***Execute Workflow***
 button in the Editor UI. This time you will receive the temperature and description as the response in the browser.
 




 Activate workflow for production
 



 This example workflow uses the Webhook node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered every time a GET request is sent to the
 ***Production***
 webhook URL.
 




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 Where to find the Webhook URLs?
 [#](#where-to-find-the-webhook-urls "Permanent link")



 The Webhook node has two URLs - Test URL and Production URL.
To get these URLs, follow the steps mentioned below.
1. Click on
 ***Webhook URLs***
 . By default, the node displays the Production URL.
2. If you want the Test URL, click on the
 ***Test***
 tab.
3. To copy the URL, click on the displayed URL.
 



 Here is a GIF demonstrating how to retrieve the test and production webhook URLs in n8n.
 



![Retrieving the Test and Production URLs from the Webhook node](https://d33wubrfki0l68.cloudfront.net/0b763e65336ce234243d195aa74d9ce57765779c/bfc51/_images/integrations/builtin/core-nodes/webhook/webhook-url.gif)



### 
 How to use the HTTP Request node to trigger the Webhook node?
 [#](#how-to-use-the-http-request-node-to-trigger-the-webhook-node "Permanent link")



 The
 [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) 
 node is used to make HTTP requests to the URL you specify. To use the HTTP Request node to trigger the Webhook node, follow the steps mentioned below.
1. Create a new workflow.
2. Add the HTTP Request node to the workflow.
3. Select the appropriate method from the
 ***Request Method***
 dropdown list. For example, if you have selected GET as the HTTP method in your Webhook node, select GET as the request method in the HTTP Request node.
4. Copy the URL from the Webhook node, and paste it in the
 ***URL***
 field in the HTTP Request node.
5. Execute the workflow with the Webhook node if you're using the Test URL.
6. Execute the HTTP Request node.
 



 Here is a video demonstrating how to send a request to a Webhook based workflow using the HTTP Request node:
 






### 
 How to use route parameters?
 [#](#how-to-use-route-parameters "Permanent link")



 You can add route parameters to the webhook URL path. This is useful when you are creating an API. The
 *Path* 
 field can take the following values:
 


* `/:variable`
* `/path/:variable`
* `/:variable/path`
* `/:variable1/path/:variable2`
* `/:variable1/:variable2`


### 
 How to use cURL to trigger the Webhook node?
 [#](#how-to-use-curl-to-trigger-the-webhook-node "Permanent link")



 You can use
 [cURL](https://curl.se/) 
 to make HTTP requests that will trigger the Webhook node. To use cURL, make sure that you have installed it on your machine. You can follow
 [this guide](https://www.booleanworld.com/curl-command-tutorial-examples/) 
 to install cURL on your machine.
Based on your use-case, you can make an HTTP request with or without any parameters. You can also send files with the HTTP request using cURL.
 



**Note:** 
 In the following commands, replace
 `https://your-n8n.url/webhook/path` 
 with your webhook URL.
 


* #### 
 Make an HTTP request without any parameters
 [#](#make-an-http-request-without-any-parameters "Permanent link")


 To make a GET request without any parameters, use the following command in your terminal.





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
curl --request GET https://your-n8n.url/webhook/path

```

 |




 To make a POST request, use the following command.
 





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
curl --request POST https://your-n8n.url/webhook/path

```

 |



* #### 
 Make an HTTP request with body parameter
 [#](#make-an-http-request-with-body-parameter "Permanent link")



 To make an HTTP request with a body parameter, use the following command.
 





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
curl --request GET https://your-n8n.url/webhook/path --data 'key=value'

```

 |



* #### 
 Make an HTTP request with header parameter
 [#](#make-an-http-request-with-header-parameter "Permanent link")



 To make an HTTP request with a header parameter, use the following command.
 





|  |  |
| --- | --- |
| 

```
1
```

 | 

```
curl --request GET https://your-n8n.url/webhook/path --header 'key=value'

```

 |



* #### 
 Make an HTTP request to send a file
 [#](#make-an-http-request-to-send-a-file "Permanent link")



 To send a file with the HTTP request, use the following command.
 






|  |  |
| --- | --- |
| 

```
1
```

 | 

```
curl --request GET https://your-n8n.url/webhook/path --from 'key=@/path/to/file'

```

 |



 Replace
 `/path/to/file` 
 with the path of the file you want to send.
 


### 
 How to send a response of type
 `string` 
 ?
 [#](#how-to-send-a-response-of-type-string "Permanent link")



 To send a response of type string, follow the steps mentioned below.
1. Select 'Last Node' from the
 ***Response Mode***
 dropdown list.
2. Select 'First Entry JSON' from the
 ***Response Data***
 dropdown list.
3. Click on 'Add Option' and select 'Property Name' from the dropdown list.
4. Enter the name of the property that contains the response.
5. Connect a Set node to the Webhook node.
6. In the Set node, click on 'Add Value' and select 'String'.
7. Enter the name of the property in the
 ***Name***
 field. The name should match the property name from step 4.
8. Enter the string value in the
 ***Value***
 field.
9. Toggle
 ***Keep Only Set***
 to
 `true` 
 .
 



 When the Webhook gets called, it will send the string response that was set in the Set node.
 




