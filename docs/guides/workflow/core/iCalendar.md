


 iCalendar
 [#](#icalendar "Permanent link")
=============================================



 The iCalendar node allows you to create event files that can be shared as an attachment.
 



 Basic Operations
 [#](#basic-operations "Permanent link")
-----------------------------------------------------------


* Create Event File



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow allows you to create an event file and send it as an attachment via email. You can also find the
 [workflow](https://n8n.io/workflows/1083) 
 on n8n.io. This example usage workflow would use the following nodes.
-
 [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/) 
 -
 [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail/) 




 The final workflow should look like the following image.
 



![A workflow with the Gmail node](https://d33wubrfki0l68.cloudfront.net/19216395cd8454b06801391b036772ba782a750a/1afc8/_images/integrations/builtin/core-nodes/icalendar/workflow.png)



### 
 1. Start node
 [#](#1-start-node "Permanent link")



 The start node exists by default when you create a new workflow.
 


### 
 2. iCalendar node (createEventFile)
 [#](#2-icalendar-node-createeventfile "Permanent link")



 This node will create an event file. We use this file as an attachment in the next node.
 


1. Enter the event title in the
 ***Event Title***
 field.
2. Select the event start date and time in the
 ***Start***
 field.
3. Select the event end date and time in the
 ***End***
 field.
4. Select 'Get All' from the
 ***Operation***
 dropdown list.
5. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node creates the event file.
 



![Using the iCalendar node to create an event file](https://d33wubrfki0l68.cloudfront.net/a16cb00590889c3bcf310a2ad882b251f1cf8761/6c5f6/_images/integrations/builtin/core-nodes/icalendar/icalendar_node.png)



### 
 3. Send Email node
 [#](#3-send-email-node "Permanent link")



 This node will send the event file as an attachment.
 


1. First of all, you'll have to enter credentials for the Send Email node. You can find out how to do that
 [here](/integrations/builtin/credentials/sendemail/) 
 .
2. Enter the sender's email address in the
 ***From Email***
 field.
3. Enter the receiver's email address in the
 ***To Email***
 field.
4. Enter a subject in the
 ***Subject***
 field.
5. Enter the email content in the
 ***Text***
 field.
6. Enter
 `data` 
 in the
 ***Attachments***
 field. If you used a different name for the Binary Property, use that name instead. We add the name of the Binary Property and not the file name in the
 ***Attachments***
 field.
7. Click on
 ***Execute Node***
 to run the node.



 In the screenshot below, you will notice that the node sends an email with the event file as an attachment.
 



![Using the Send Email node to send an email with an attachemnt](https://d33wubrfki0l68.cloudfront.net/a4e5024384077450d5cd39349862cbc3d4ab5837/416d6/_images/integrations/builtin/core-nodes/icalendar/sendemail_node.png)





