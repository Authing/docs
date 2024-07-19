# Flying Book

### Prepare for the migration

1. Create a new enterprise self-built application in the background of Feishu developer, click <strong> application name </strong> to enter the application details page
2. Click <strong> Credentials and Basic Information </strong> to switch pages and get the App ID and App Secret values.
3. Click the <strong> Permission </strong><strong> Management </strong> switch page, </strong> in the <strong> permission configuration </strong> module to apply for application permissions
4. Reference [get fly book configuration items and authority](https://docs.authing.cn/v2/guides/sync/create-sync/get-config/lark.html)

### Configure the migration template

#### Full upstream

- It is recommended to use the <strong> upstream full synchronization </strong> template in the <strong> template library </strong>, which has configured the entire process and basic node information. Users only need to adjust the configuration in the node [Select trigger, pull user directory data, pull organization directory data, data conversion (1), data conversion (2), compare user data, compare department data] to achieve the <strong> upstream full synchronization </strong> function.

![](../../static/Mb7MbDyn8oVFQcxK7VKcAyPPn9E.png)

![](../../static/KlNGbXnPgosVemxWlgtc7jIinZf.png)

##### Configures the template for full synchronization upstream of the flying book

1. Create a workflow, select the "Flybook - Flybook upstream Full synchronization" template, and use the template.

![](../../static/P3oNbmZ2RoWd81xir02cb472nRh.png)

1. Adjust the template. First, click [Select Trigger] to open its panel. After selecting [Trigger by manual execution], the node becomes [process control], click [Save], the node becomes [manual execution], and [Select trigger], that is, the configuration is complete.

![](../../static/NMWBbx0D2oo8elxOGzecxq9Tnrf.png)

![](../../static/XTYLbqWYOoalFCxGpH4ccFPvnIe.png)

![](../../static/WgEMbte1soUDQAxg8RdcfUFZnWd.png)

1. Next, adjust [Pull user directory data] and [Pull organization directory data]. First click Pull User Directory Data to open its panel. Here, click on [Select Account connection] of [Feishu] to select an account connection that has already been created in the drop-down list. If you use it for the first time, click on [Add account connection] to create a new account connection. Create account access the required data can refer to [get fly book configuration items and authority](https://docs.authing.cn/v2/guides/sync/create-sync/get-config/lark.html) from flying developer background, After the connection test is successful, click [Save] to successfully create an account connection. Back in the Pull User Directory Data panel, the newly created account connection will be automatically selected. Then, since the department ID of the flying root department is 0, [root department ID] is filled with 0. Click "Save" and "pull user directory data" to complete the configuration. The configuration adjustment of Pull Organization Directory data is the same as that of Pull user directory data.


![](../../static/OqTcbq8Y0on5NXx5i0EcPLbCncf.png)

![](../../static/RbbXbN5YgoUe5nxfZtbcQFfmnuf.png)

![](../../static/LQpfbgfXWo96yCxMFOQcV9PAnPf.png)

1. Then adjust [Data conversion (1)], first click [Data conversion (1)] to open its panel, [Data conversion (1)] is the conversion of user data, you can configure the user data conversion rules from Feishu to Authing, click [Add conversion rules] to add new conversion rules. Click "Save" and "Data conversion (1)" will complete the configuration.

![](../../static/BF4QbUfZQoPXkHxRGXOcdPE7nsd.png)

1. Next, adjust [Data conversion (2)], first click [Data conversion (2)] to open its panel. [Data conversion (2)] is the conversion of organizational data, which can be configured from Feishu to Authing, and click [Add conversion rule] to add new conversion rules. Here you need to add two new field mappings, from open_department_id of the flying book to the department number and department description of Authing. Then click [Save], [Data conversion (2)] the configuration is complete.

![](../../static/DoI8bhrzGobxdnxmDF6cPs2xnWg.png)

![](../../static/KOXqbO5fPopjI9xjxFcc8jQgnQb.png)

1. Then adjust [compare user data] and [compare department data]. First click Compare User Data to open its panel. Here you need to select the organization that fully synchronizes to Authing. Click "Save" and "Compare user data" to complete the configuration. The configuration adjustment of [Compare Department data] is the same as that of [Compare user data].

![](../../static/Sb6MbEVSEo6rFMxINwzcdpeFncg.png)

1. Finally open [Activate workflow] and click [Execute Now] to start the full synchronization <strong> upstream of the </strong> flight book.

![](../../static/GDBzbPEBNoyPn2xh8b6cgVDvned.png)

#### upstream increment

#### Full downstream

- It is recommended to use the <strong> full synchronization </strong> template in the <strong> template library </strong>, which basically completes the entire process and node information configuration. Users only need to configure the <strong> link </strong> in the [Create User, Update User, Create Department, Update Department] node to synchronize the use.

![](../../static/QQSNbHxOdorwNKxDMVJcs6NknDf.png)

##### Starts to configure the synchronization template

1. Create a workflow, select the "Flybook - Flybook downstream Full synchronization" template, and use the template.

![](../../static/IHs2b4iu5oBtElxzkUicz8V4nek.png)

![](../../static/Z7GBbNIMKouKVixBfhgccFd5nkg.png)

1. To create a template, select the "Trigger" mode. After saving the template, you can see that the node information of "Flow control" has been updated.

![](../../static/Nnz1bIdBbow3qBxWnDrch5icnVh.png)

![](../../static/PEQnb39nlonXGYxxTfScQZPFnd5.png)

1. Then, check whether information about other nodes in the template needs to be modified.
2. Edit the "Create a User" node, first of all "Create a flying book account connection"
3. Account name: It can be filled in arbitrarily, or it can be the name of the application
4. Application type: Select fixed value [self-built application] or expression custom as needed.
5. Application Id/Secret: View on the open platform of Feishu; See the "Preparing for Migration - Downstream" section above
6. After filling in the relevant information, click the "Connection Test" button to check the configuration. If the configuration is normal, the status is <strong> successful check; </strong> Save the configuration.
7. After the account connection is created, select the connection and save it.

![](../../static/RF2pbKTDboTxU8xXYwXcB7NFntf.png)

![](../../static/AR8ibNY2HoEXXtxPgEXcmBlJncg.png)

![](../../static/GyfAbkoPAoicVuxGczjciHminUd.png)

![](../../static/IBxzbO5YoowQU7xlL7McOsuBn9d.png)

1. Edit the account connection of [Update user, create department, update department] in sequence.
2. Next, you need to click the "<strong> activate workflow" switch to </strong> make the template take effect.
3. After the preparatory work is completed, click the "Execute now" button to manually synchronize user and organization data downstream.

![](../../static/QpgDbmOYuoJselxrz8HcqwTmnqg.png)

1. After the synchronization is complete, click [Run Log] to view the running record.

![](../../static/JMtAbx6RrownMuxzQC9cnPXDnSf.png)

#### downstream increment

- It is recommended to use the <strong> downstream incremental synchronization </strong> template in the <strong> template library </strong>, which basically completes the entire process and node information configuration. Users only need to configure the <strong> link </strong> in the [Create User, Update User, Create Department, Update Department] node to synchronize the use.

![](../../static/K1inbjNWUoofCMxNnFucQBY5n9b.png)

##### Starts to configure the synchronization template

1. Create a workflow, select the "Flybook - Flybook Downstream Incremental Synchronization" template, and use the template.

![](../../static/Jue0bvtMXoNU5PxXQqFcAhC9nhc.png)

![](../../static/LsrlbxRsco3g3PxO5Tbcir2Cnfg.png)

1. After the template is created, the basic process and node configuration are complete. You only need to edit nodes such as Create Department, Update Department, Update User, Create User, and configure account connection.

![](../../static/NrcAbpxtsonfzgxA1R5cTeAtn1e.png)

1. After the configuration, activate the workflow for the configuration to take effect.

![](../../static/WYrHbEuV2olYRKxudfJcBx51nLf.png)

1. In this case, you can create a user or modify user information on the Authing workbench to trigger the task. Click [Run Log] to switch to the page, and view the <strong> execution result in the </strong> execution status column. If the <strong> execution succeeds </strong>, data has been successfully synchronized to the downstream flight book.

![](../../static/DvoNbV45loJHRBxnmwGcQqIhnkh.png)

### Verify the migration result

#### All downstream synchronization

1. The organization and the user are synchronized to the Flybook, and the user is under the corresponding organization.

![](../../static/ZzlTb1S0kofD6vxuCi7cacGtnRY.png)
