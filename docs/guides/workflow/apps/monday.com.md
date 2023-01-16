


 monday.com
 [#](#mondaycom "Permanent link")
==============================================



[monday.com](https://monday.com/) 
 is a work operating system that enables organizations to manage tasks, projects, and team work.
 




 Credentials
 



 You can find authentication information for this node
 [here](/integrations/builtin/credentials/mondaycom/) 
 .
 




 Basic Operations
 [#](#basic-operations "Permanent link")
-----------------------------------------------------------


* Board
	+ Archive a board
	+ Create a new board
	+ Get a board
	+ Get all boards
* Board Column
	+ Create a new column
	+ Get all columns
* Board Group
	+ Delete a group in a board
	+ Create a group in a board
	+ Get list of groups in a board
* Board Item
	+ Add an update to an item.
	+ Change a column value for a board item
	+ Change multiple column values for a board item
	+ Create an item in a board's group
	+ Delete an item
	+ Get an item
	+ Get all items
	+ Get items by column value
	+ Move item to group



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow allows you to get a board from monday.com. You can also find the
 [workflow](https://n8n.io/workflows/556) 
 on the website. This example usage workflow would use the following two nodes.
-
 [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/) 
 -
 monday.com




 The final workflow should look like the following image.
 



![A workflow with the monday.com node](https://d33wubrfki0l68.cloudfront.net/34798f9e71ea1c3ffd57cd8718dca58772de09de/6e612/_images/integrations/builtin/app-nodes/mondaycom/workflow.png)



### 
 1. Start node
 [#](#1-start-node "Permanent link")



 The start node exists by default when you create a new workflow.
 


### 
 2. monday.com node
 [#](#2-mondaycom-node "Permanent link")


1. First of all, you'll have to enter credentials for the monday.com node. You can find out how to do that
 [here](/integrations/builtin/credentials/mondaycom/) 
 .
2. Select the 'Get' option from the
 *Operation* 
 dropdown list.
3. Select the board you want to get from the
 *Board ID* 
 dropdown list.
4. Click on
 *Execute Node* 
 to run the workflow.




