


 Merge
 [#](#merge "Permanent link")
=====================================



 Use the Merge node to combine data from two streams, once data of both streams is available.
 




 Major changes in 0.194.0
 
 This node was overhauled in n8n 0.194.0. This document reflects the latest version of the node. If you're using an older version of n8n, you can find the previous version of this document
 [here](https://github.com/n8n-io/n8n-docs/blob/4ff688642cc9ee7ca7d00987847bf4e4515da59d/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) 
 .
 







 Merge mode
 [#](#merge-mode "Permanent link")
-----------------------------------------------



 You can specify how the Merge node should combine data from different branches. The following options are available:
 


### 
 Append
 [#](#append "Permanent link")



 Keep data from both inputs. The output contains items from Input 1, followed by all items from Input 2.
 



![Diagram](https://d33wubrfki0l68.cloudfront.net/bade888b6509a026765cae7849e935248c3e4878/a37c5/_images/integrations/builtin/core-nodes/merge/append-diagram.png)



### 
 Combine
 [#](#combine "Permanent link")



 Combine data from both inputs. Choose a
 **Combination Mode** 
 to control how n8n merges the data.
 


#### 
 Merge by fields
 [#](#merge-by-fields "Permanent link")



 Compare items by field values. Enter the fields you want to compare in
 **Fields to Match** 
 .
 



 n8n's default behavior is to keep matching items. You can change this using the
 **Output Type** 
 setting:
 


* Keep matches: merge items that match.
* Keep non-matches: merge items that don't match.
* Enrich Input 1: keep all data from Input 1, and add matching data from Input 2.
* Enrich Input 2: keep all data from Input 2, and add matching data from Input 1.



![Diagram](https://d33wubrfki0l68.cloudfront.net/9fb94cc898881c4b08a33ade6683fafad6b2a09d/41b4b/_images/integrations/builtin/core-nodes/merge/merge-by-field-diagram.png)



##### 
 Field value clashes
 [#](#field-value-clashes "Permanent link")



 If both items at an index have a field with the same name, this is a clash. For example, if all items in both Input 1 and Input 2 have a field named
 `language` 
 , these fields clash. By default, n8n prioritizes Input 2, meaning if
 `language` 
 has a value in Input 2, n8n uses that value when merging the items.
 



 You can change this behavior:
 


1. Select
 **Add Option** 
 >
 **Clash Handling** 
 .
2. Choose which input to prioritize, or choose
 **Always Add Input Number to Field Names** 
 to keep all fields and values, with the input number appended to the field name to show which input it came from.


##### 
 Multiple matches
 [#](#multiple-matches "Permanent link")



 Matching by field can generate multiple matches if the inputs contain duplicate data. To handle this, select
 **Add Option > Multiple Matches** 
 . Then choose:
 


* **Include All Matches** 
 : output multiple items (one for each match).
* **Include First Match Only** 
 : keep the first item, discard subsequent items.


#### 
 Merge by position
 [#](#merge-by-position "Permanent link")



 Combine items based on their order. The item at index 0 in Input 1 merges with the item at index 0 in Input 2, and so on.
 



![Diagram](https://d33wubrfki0l68.cloudfront.net/5881e63b5fc315f1bfc62727fa754bfeda093a54/bbd87/_images/integrations/builtin/core-nodes/merge/merge-by-position-diagram.png)



##### 
 Inputs with different numbers of items
 [#](#inputs-with-different-numbers-of-items "Permanent link")



 If there are more items in one input than the other, the default behavior is to leave out the items without a match. Choose
 **Add Option** 
 >
 **Include Any Unpaired Items** 
 to keep the unmatched items.
 


##### 
 Field value clashes
 [#](#field-value-clashes_1 "Permanent link")



 If both items at an index have a field with the same name, this is a clash. For example, if all items in both Input 1 and Input 2 have a field named
 `language` 
 , these fields clash. By default, n8n prioritizes Input 2, meaning if
 `language` 
 has a value in Input 2, n8n uses that value when merging the items.
 



 You can change this behavior:
 


1. Select
 **Add Option** 
 >
 **Clash Handling** 
 .
2. Choose which input to prioritize, or choose
 **Always Add Input Number to Field Names** 
 to keep all fields and values, with the input number appended to the field name to show which input it came from.


#### 
 Multiplex
 [#](#multiplex "Permanent link")



 Output all possible item combinations, while merging fields with the same name.
 



![Diagram](https://d33wubrfki0l68.cloudfront.net/c700891d79b3db2deb6f5b4d42ecd6468d380e46/dcefc/_images/integrations/builtin/core-nodes/merge/multiplex-diagram.png)



##### 
 Field value clashes
 [#](#field-value-clashes_2 "Permanent link")



 If both items at an index have a field with the same name, this is a clash. For example, if all items in both Input 1 and Input 2 have a field named
 `language` 
 , these fields clash. By default, n8n prioritizes Input 2, meaning if
 `language` 
 has a value in Input 2, n8n uses that value when merging the items.
 



 You can change this behavior:
 


1. Select
 **Add Option** 
 >
 **Clash Handling** 
 .
2. Choose which input to prioritize, or choose
 **Always Add Input Number to Field Names** 
 to keep all fields and values, with the input number appended to the field name to show which input it came from.


### 
 Choose branch
 [#](#choose-branch "Permanent link")



 Choose which input to keep. This option always waits until the data from both inputs is available. You can keep the data from Input 1 or Input 2, or you can output a single empty item. The node outputs the data from the chosen input, without changing it.
 



 Merging branches with uneven numbers of items
 [#](#merging-branches-with-uneven-numbers-of-items "Permanent link")
---------------------------------------------------------------------------------------------------------------------



 The items passed into Input 1 of the Merge node will take precedence. For example, if the Merge node receives five items in Input 1 and 10 items in Input 2, it only processes five items. The remaining five items from Input 2 aren't processed.
 



 Branch execution with If and Merge nodes
 [#](#branch-execution-with-if-and-merge-nodes "Permanent link")
-----------------------------------------------------------------------------------------------------------



 If you add a Merge node to a workflow containing an If node, it can result in both output branches of the If node executing.
 



 The Merge node is triggered by one branch, then goes and executes the other branch.
 



 For example, in the screenshot below there's a workflow containing a Set node, If node, and Merge node. The standard If node behavior is to execute one branch (in the screenshot, this is the
 **true** 
 output). However, due to the Merge node, both branches execute, despite the If node not sending any data down the
 **false** 
 branch.
 



![Screenshot of a simple workflow. The workflow has a Set node, followed by an If node. It ends with a Merge node.](https://d33wubrfki0l68.cloudfront.net/4699c216f5ea86a21c95d46fe4c05aea95aef7ad/45a8d/_images/integrations/builtin/core-nodes/merge/if-merge-node.png)




 Try it out: a step by step example
 [#](#try-it-out-a-step-by-step-example "Permanent link")
----------------------------------------------------------------------------------------------



 Create a simple workflow with some example input data to try out the Merge node.
 


### 
 Set up sample data using the Code nodes
 [#](#set-up-sample-data-using-the-code-nodes "Permanent link")


1. Add a Code node to the canvas and connect it to the Start node.
2. Paste the following JavaScript code snippet in the
 **JavaScript Code** 
 field:
 


|  |  |
| --- | --- |
| 

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
```

 | 

```
return [
 {
 json: {
 name: 'Stefan',
 language: 'de',
 }
 },
 {
 json: {
 name: 'Jim',
 language: 'en',
 }
 },
 {
 json: {
 name: 'Hans',
 language: 'de',
 }
 }
];

```

 |
3. Add a second Code node, and connect it to the Start node.
4. Paste the following JavaScript code snippet in the
 **JavaScript Code** 
 field:
 


|  |  |
| --- | --- |
| 

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
```

 | 

```
return [
 {
 json: {
 greeting: 'Hello',
 language: 'en',
 }
 },
 {
 json: {
 greeting: 'Hallo',
 language: 'de',
 }
 }
];

```

 |


### 
 Try out different merge modes
 [#](#try-out-different-merge-modes "Permanent link")



 Add the Merge node. Connect the first Code node to
 **Input 1** 
 , and the second Code node to
 **Input 2** 
 . Run the workflow to load data into the Merge node.
 



 The final workflow should look like the following image.
 



![Simple merge workflow with two Code nodes](https://d33wubrfki0l68.cloudfront.net/0ab38acf5bf96fa948c78e599f3ca1601268f812/ec80d/_images/integrations/builtin/core-nodes/merge/workflow.png)




 Now try different options in
 **Mode** 
 to see how it affects the output data.
 


#### 
 Append
 [#](#append_1 "Permanent link")



 Select
 **Mode** 
 >
 **Append** 
 , then select
 **Execute node** 
 .
 



 Output data in table view:
 



![Append mode output](https://d33wubrfki0l68.cloudfront.net/f04e0ec626399bdd44140134ecd4eceda525d01f/cc8be/_images/integrations/builtin/core-nodes/merge/append-mode.png)



#### 
 Merge by fields
 [#](#merge-by-fields_1 "Permanent link")



 You can merge these two data inputs so that each person gets the correct greeting for their language.
 


1. Select
 **Mode** 
 >
 **Merge By Fields** 
 .
2. In both
 **Input 1 Field** 
 and
 **Input 2 Field** 
 , enter
 `language` 
 . This tells n8n to combine the data by matching the values in the
 `language` 
 field in each data set.
3. Select
 **Execute node** 
 .



 Output in table view:
 



![Merge by Fields mode output](https://d33wubrfki0l68.cloudfront.net/9428d2b1267916df33391f78376cf27e90ed5da4/d1b2e/_images/integrations/builtin/core-nodes/merge/merge-by-fields-mode.png)



#### 
 Merge by position
 [#](#merge-by-position_1 "Permanent link")



 Select
 **Mode** 
 >
 **Merge By Position** 
 , then select
 **Execute node** 
 .
 



 Default output in table view:
 



![Merge by Position mode output](https://d33wubrfki0l68.cloudfront.net/0eb69030e4888740597de9ac4636009d42d275a5/a52b6/_images/integrations/builtin/core-nodes/merge/merge-by-position-mode-default.png)



##### 
 Keep unpaired items
 [#](#keep-unpaired-items "Permanent link")



 If you want to keep all items, select
 **Add Option** 
 >
 **Include Any Unpaired Items** 
 , then enable
 **Include Any Unpaired Items** 
 .
 



 Output with unpaired items in table view:
 



![Merge by Position mode with unpaired items output](https://d33wubrfki0l68.cloudfront.net/4dbe1e186b52889d8e28f48a34679c2e9fd7ecc1/015e3/_images/integrations/builtin/core-nodes/merge/merge-by-position-include-unpaired.png)



#### 
 Multiplex
 [#](#multiplex_1 "Permanent link")



 Select
 **Mode** 
 >
 **Multiplex** 
 , then select
 **Execute node** 
 .
 



 Output in table view:
 



![Merge by Multiplex mode output](https://d33wubrfki0l68.cloudfront.net/758cebedfb65dd8773f3a36315805f229f8cb17d/5d6d7/_images/integrations/builtin/core-nodes/merge/multiplex-mode.png)




 Try it out: load a workflow
 [#](#try-it-out-load-a-workflow "Permanent link")
--------------------------------------------------------------------------------



 n8n provides an example workflow that demonstrates key Merge node concepts.
 



 Go to
 [Joining different datasets](https://n8n.io/workflows/1747-joining-different-datasets/) 
 and select
 **Use workflow** 
 to copy the example workflow. You can then paste it into your n8n instance.
 




