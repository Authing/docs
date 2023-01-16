


 PayPal
 [#](#paypal "Permanent link")
=======================================



[PayPal](https://paypal.com) 
 is a digital payment service that supports online funds transfers and that customers can use when shopping online.
 




 Credentials
 



 You can find authentication information for this node
 [here](/integrations/builtin/credentials/paypal/) 
 .
 




 Basic Operations
 [#](#basic-operations "Permanent link")
-----------------------------------------------------------


* Payout
	+ Create a batch payout
	+ Show batch payout details
* Payout Item
	+ Cancels an unclaimed payout item
	+ Show payout item details



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow shows you how to create a PayPal batch payout. You can also find the
 [workflow](https://n8n.io/workflows/438) 
 on this website. This example usage workflow uses the following two nodes.
-
 [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/) 
 -
 PayPal




 The final workflow should look like the following image.
 



![A workflow with the PayPal node](https://d33wubrfki0l68.cloudfront.net/db4252a6abcbd8ef30b74840eac825004ae6a888/751c5/_images/integrations/builtin/app-nodes/paypal/workflow.png)



### 
 1. Start node
 [#](#1-start-node "Permanent link")



 The Start node exists by default when you create a new workflow.
 


### 
 2. PayPal node
 [#](#2-paypal-node "Permanent link")


1. First of all, you'll have to enter credentials for the PayPal node. You can find out how to do that
 [here](/integrations/builtin/credentials/paypal/) 
 .
2. Enter an ID in the
 *Sender Batch ID* 
 field.
3. Click on
 *Execute Node* 
 to run the workflow.




