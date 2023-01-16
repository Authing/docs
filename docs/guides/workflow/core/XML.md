


 XML
 [#](#xml "Permanent link")
=================================



 The XML node is useful to convert data from and to XML.
 



 Node Reference
 [#](#node-reference "Permanent link")
-------------------------------------------------------


* **Mode:** 
 The format the data should be converted from and to.
	+ ***JSON to XML:***
	 Converts data from JSON to XML
	+ ***XML to JSON:***
	 Converts data from XML to JSON
* ***Property Name:***
 The name of the property which contains the data to convert.
* ***Options***
	+ ***Allow Surrogate Chars:***
	 Allows using characters from the Unicode surrogate blocks. This field is displayed when 'JSON to XML' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***cdata:***
	 Wrap text nodes instead of escaping when necessary. This field is displayed when 'JSON to XML' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Headless:***
	 Omit the XML header. This field is displayed when 'JSON to XML' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Root Name:***
	 Root element name to be used. This field is displayed when 'JSON to XML' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Explicit Array:***
	 Always put child nodes in an array if true; otherwise an array is created. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Explicit Root:***
	 Set this if you want to get the root node in the resulting object. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Ignore Attributes:***
	 Ignore all XML attributes and only create text nodes. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Merge Attributes:***
	 Merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object. This option is ignored if 'Ignore Attribute' is true. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Normalize:***
	 Trim whitespaces inside the text nodes. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Normalize Tags:***
	 Normalize all tag names to lowercase. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Trim:***
	 Trim the whitespace at the beginning and end of text nodes. This field is displayed when 'XML to JSON' is selected from the
	 ***Mode***
	 dropdown list.
	+ ***Attribute Key:***
	 Prefix that is used to access the attributes.
	+ ***Character Key:***
	 Prefix that is used to access the character content.



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow allows you to convert the JSON data received from the
 [CocktailDB API](https://www.thecocktaildb.com/) 
 to XML. You can also find the
 [workflow](https://n8n.io/workflows/661) 
 on n8n.io. This example usage workflow uses the following nodes.
-
 [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/) 
 -
 [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) 
 -
 XML




 The final workflow should look like the following image.
 



![A workflow with the XML node](https://d33wubrfki0l68.cloudfront.net/8623bd7861a13545c1f8590dc4f0ac041b392559/ae138/_images/integrations/builtin/core-nodes/xml/workflow.png)



### 
 1. Start node
 [#](#1-start-node "Permanent link")



 The start node exists by default when you create a new workflow.
 


### 
 2. HTTP Request node (GET)
 [#](#2-http-request-node-get "Permanent link")


1. Enter
 `https://www.thecocktaildb.com/api/json/v1/1/random.php` 
 in the
 ***URL***
 field.
2. Click on
 ***Execute Node***
 to run the node.



![Get random cocktail data from CocktailDB API using the HTTP Request node](https://d33wubrfki0l68.cloudfront.net/85def9924e9c7621f0434731f6a160b772cda7ab/ecfc8/_images/integrations/builtin/core-nodes/xml/httprequest_node.png)



### 
 3. XML node (JSON to XML)
 [#](#3-xml-node-json-to-xml "Permanent link")


1. Select 'JSON to XML' from the
 ***Mode***
 dropdown list.
2. Click on
 ***Execute Node***
 to run the node.



![Convert JSON to XML using the XML node](https://d33wubrfki0l68.cloudfront.net/6c1d5aa37c14b17ddad14ad0dd80c205c692d13b/447a5/_images/integrations/builtin/core-nodes/xml/xml_node.png)





