# Split array

# Node Introduction

The "Split Array" node is mainly used to split the source array into fixed sizes. After the split is completed, multiple fixed size array data will be returned.

The nodes mainly include the following configurations:

- Data source, the raw data to be split, can be inputted by oneself or assembled through data assembly to assemble the data source before the current node.
- The number of batches is set by the user to split the source array based on the number of batches.

# Quick Start

## Add node

On the Add Node page, find the "Split Array" application node in the "Data Processing" category.

![](../static/A72cb2encoJWc6xzEY6cbh67n2e.png)

Or apply filtering by entering the keyword "split array".

![](../static/WQJubCmQzoU4u0x1DZNcOBRnndg.png)

Clicking on a node will automatically add it to the workflow.

![](../static/HdFbbZqo4ogZfNx5y92crLIRn4d.png)

## Node configuration

Click on the node in the workflow canvas or click the "Edit" button below to enter the node's configuration page.

![](../static/WHvDbugvnoxpcNxabyOcq3T8n4f.png)

Configure the various configuration items of the node as follows:

- Select the "Data Source" attribute under "Output" in the "Incoming JSON Data" section on the left for assembly;
- Fill in 1 for each batch, indicating that each batch will contain 1 piece of data.

![](../static/MBR6botKHotqz1x1pPbc561BnOb.png)

## Test Run

Click the "Execute the previous link of this node" button on the node to execute it.

![](../static/E32ebgbA6o21zzxWAP1cZqh3nce.png)

After reconfirmation, all previous processes of this node will be executed.

![](../static/BBtYbjxJ2o1BTHxdB0Kcxftvnxd.png)

After clicking the "Confirm Execution" button, you will see the message prompt "Node in Progress".

![](../static/GARAbWd3yoWuGCxzu2scN8aNnhd.png)

Click on the "Run Log" column, then click on the expand button on the left side of the latest "Execution Batch" and "Split Array" nodes to view the node execution results.

![](../static/B76hbMAjAobnQVxJ6xRcMhhfnmb.png)
