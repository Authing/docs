# Dataset comparison

# Node Introduction

The "Dataset Comparison" node is mainly used to split the source array into fixed sizes. After the split is completed, multiple fixed size array data will be returned.

The nodes mainly include the following configurations:

- List of matching fields, fill in fields 1 and 2 to be compared.
- When there are differences, you can choose to use version 1, use version 2, and use a mixture of different versions, including two versions.
- ption: Supports disabling dot symbols and multiple matches.

# Quick Start

## Add node

On the Add Node page, find the "Dataset Comparison" application node in the "Data Processing" category.

![](../static/IIUfb0VDxo83RMxECbzcsao1nXd.png)

Or apply filtering by entering the keyword "dataset comparison".

![](../static/CsjcbR97AoHFJXxrhpKcoGRUnYb.png)

Clicking on a node will automatically add it to the workflow.

![](../static/KfqjbGnX9otrpKxUIlbcUnxTnOb.png)

## Node configuration

Click on the node in the workflow canvas or click the "Edit" button below to enter the node's configuration page.

![](../static/ZHSMbEbnRo6l5YxFHdtc44lJn0l.png)

Configure the various configuration items of the node as follows:

- Select the "Data" attribute under "Output" in the "Incoming JSON Data" section on the left to assemble the "Matching Field Values";
- Choose to use Input 2 version when there are differences.

![](../static/Tw9db1VLCowUkmxyVogcvS79ngf.png)

## Test Run

Click the "Execute the previous link of this node" button on the node to execute it.

![](../static/IlIqblMvRoVgcSx6KMJce2WFnxd.png)

After reconfirmation, all previous processes of this node will be executed.

![](../static/Eg4nbd7SvofPMkxjI3wcwtELnDf.png)

After clicking the "Confirm Execution" button, you will see the message prompt "Node in Progress".

![](../static/YnChb0rKaoedPox98sJcKH2rnnf.png)

Click on the "Run Log" column, then click on the expand button on the left side of the latest "Execution Batch" and "Dataset Comparison" nodes to view the node execution results.

![](../static/FJGFbz9wtoSt5ExaQ0EcjAUxnSg.png)
