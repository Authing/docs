


 HTTP Request
 [#](#http-request "Permanent link")
===================================================



 The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests to query data from any app or service with a REST API.
 



 When using this node, you're creating a REST API call. You need some understanding of basic API terminology and concepts.
 



 Node fields
 [#](#node-fields "Permanent link")
-------------------------------------------------


### 
 Method
 [#](#method "Permanent link")



 Select the method to be used for the request:
 


* DELETE
* GET
* HEAD
* OPTIONS
* PATCH
* POST
* PUT


### 
 URL
 [#](#url "Permanent link")



 Enter the endpoint you want to use.
 


### 
 Authentication
 [#](#authentication "Permanent link")



 There are two options for authentication. n8n recommends using the
 **Predefined credential type** 
 option when it's available. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.
 


#### 
 Predefined credentials
 [#](#predefined-credentials "Permanent link")



 Select
 **Predefined Credential Type** 
 . This allows you to perform custom operations, without additional authentication setup. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to
 [Custom API operations](/integrations/custom-operations/) 
 for more information.
 


#### 
 Generic credentials
 [#](#generic-credentials "Permanent link")



 Select
 **Generic Credential Type** 
 to set up authentication using one of the following methods:
 


* Basic Auth
* Digest Auth
* Header Auth
* OAuth1
* OAuth2
* None



 Refer to
 [HTTP request credentials](/integrations/builtin/credentials/httprequest/) 
 for more information setting up each credential type.
 


### 
 Parameters, headers, and body
 [#](#parameters-headers-and-body "Permanent link")



 You can choose to send additional information with your request. The data you need to send depends on the API you're interacting with, and the type of request you're making. Refer to your service's API documentation for detailed guidance.
 


* **Send Query Parameters** 
 : include query parameters. Query parameters are usually used as filters or searches on your query.
* **Send Headers** 
 : include request headers. Headers contain metadata about your request.
* **Send Body** 
 : send additional information in the body of your request.


### 
 Options
 [#](#options "Permanent link")



 Select
 **Add Option** 
 to view and select these options.
 


* **Batching** 
 : control how to batch large responses.
* **Ignore SSL Issues** 
 : download the response even if SSL validation isn't possible.
* **Redirects** 
 : choose whether to follow redirects. Disabled by default.
* **Response** 
 : provide settings about the expected API response.
* **Proxy** 
 : use this if you need to specify an HTTP proxy.
* **Timeout** 
 : set a timeout for the request.



 Basic example
 [#](#basic-example "Permanent link")
-----------------------------------------------------



 This example uses
 [Reqres](https://reqres.in/) 
 , a service for testing APIs with fake data. It provides a basic usage example.
 


### 
 Setup
 [#](#setup "Permanent link")



 Create a new workflow and add the HTTP Request node.
 



 Enter
 `https://reqres.in/api/users` 
 in the
 **URL** 
 field. All the examples call this endpoint.
 


### 
 Get a list of users
 [#](#get-a-list-of-users "Permanent link")



 Ensure the
 **Method** 
 is set to
 **GET** 
 .
 



 Select
 **Execute node** 
 . n8n calls the
 `users` 
 endpoint of the Reqres API, and outputs the response.
 


### 
 Add a user
 [#](#add-a-user "Permanent link")


1. Select
 **POST** 
 in the
 **Method** 
 dropdown list.
2. Enable
 **Send Body** 
 .
3. Enter
 `name` 
 in the
 **Name** 
 field.
4. Enter
 `Neo` 
 in the
 **Value** 
 field.
5. Select
 **Add Parameter**
6. Enter
 `job` 
 in the
 **Name** 
 field.
7. Enter
 `Programmer` 
 in the
 **Value** 
 field.
8. Select
 **Execute node** 
 to run the workflow. n8n calls the
 `users` 
 endpoint of the Reqres API, and outputs the response.



 More examples
 [#](#more-examples "Permanent link")
-----------------------------------------------------


### 
 Fetch a binary file from a URL
 [#](#fetch-a-binary-file-from-a-url "Permanent link")


1. Enter the URL of the file in the
 **URL** 
 field. For example, you can enter
 `https://docs.n8n.io/_images/n8n-docs-icon.svg` 
 to fetch the n8n logo.
2. Select
 **Add Option > Response** 
 .
3. Set
 **Response Format** 
 to
 **File** 
 .
4. Select
 **Execute node** 
 to run the node.


### 
 Send a binary file to an API endpoint
 [#](#send-a-binary-file-to-an-api-endpoint "Permanent link")


1. Connect the HTTP Request node with a node that has previously fetched the binary file. For example, this could be an HTTP Request node,
 [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) 
 node,
 [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/) 
 node, and so on.
2. Select
 **POST** 
 in the
 **Method** 
 dropdown. Check the API documentation of your API to make sure that you have selected the correct HTTP request method.
3. Enter the URL you want to send the binary file to in the
 **URL** 
 field.
4. Enable
 **Send Body** 
 .
5. In
 **Body Content Type** 
 , select
 **n8n Binary Data** 
 .
6. In
 **Input Data Field Name** 
 , enter the name of the field containing the binary data.
7. Select
 **Execute node** 
 to run the node.



 Refer to this
 [workflow template](https://n8n.io/workflows/1338-update-twitter-banner-using-http-request/) 
 for a full example.
 


### 
 Get the HTTP status code after an execution
 [#](#get-the-http-status-code-after-an-execution "Permanent link")


1. Select
 **Add Option** 
 >
 **Response** 
 .
2. Enable
 **Include Response Headers and Status** 
 .



 When you execute the node, n8n includes the headers, status code, and status message in the output.
 


### 
 Send XML data
 [#](#send-xml-data "Permanent link")


1. Enable
 **Send Body** 
 .
2. In
 **Body Content Type** 
 , select
 **Raw** 
 .
3. In
 **Content Type** 
 , enter
 `application/xml` 
 .
4. Enter the XML data in the
 **Body** 
 field.




