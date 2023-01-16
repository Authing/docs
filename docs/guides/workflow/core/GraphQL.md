


 GraphQL
 [#](#graphql "Permanent link")
=========================================



[GraphQL](https://graphql.org/) 
 is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
 



 Basic Operations
 [#](#basic-operations "Permanent link")
-----------------------------------------------------------


* Query a GraphQL endpoint



 Example Usage
 [#](#example-usage "Permanent link")
-----------------------------------------------------



 This workflow allows you to get information about the five most recent SpaceX launches from
 [spacex.land](https://spacex.land/) 
 . You can also find the
 [workflow](https://n8n.io/workflows/558) 
 on the website. This example usage workflow uses the following two nodes.
-
 [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/) 
 -
 GraphQL




 The final workflow should look like the following image.
 



![A workflow with the GraphQL node](https://d33wubrfki0l68.cloudfront.net/8e37e4d1996d1427c10a32f391de1ccae3cb8178/557d6/_images/integrations/builtin/core-nodes/graphql/workflow.png)



### 
 1. Start node
 [#](#1-start-node "Permanent link")



 The start node exists by default when you create a new workflow.
 


### 
 2. GraphQL node
 [#](#2-graphql-node "Permanent link")


1. Enter
 `https://api.spacex.land/graphql/` 
 in the
 *Endpoint* 
 field.
2. Select the 'JSON' option from the
 *Request Format* 
 dropdown list.
3. Enter the GraphQL query shown below in the
 *Query* 
 field.
4. Click on
 *Execute Node* 
 to run the workflow.


#### 
 GraphQL query
 [#](#graphql-query "Permanent link")





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
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
```

 | 

```
{
 launchesPast(limit: 5) {
 mission\_name
 launch\_date\_local
 launch\_site {
 site\_name\_long
 }
 links {
 article\_link
 video\_link
 }
 rocket {
 rocket\_name
 first\_stage {
 cores {
 flight
 core {
 reuse\_count
 status
 }
 }
 }
 second\_stage {
 payloads {
 payload\_type
 payload\_mass\_kg
 payload\_mass\_lbs
 }
 }
 }
 ships {
 name
 home\_port
 image
 }
 }
}

```

 |





