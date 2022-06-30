# Windows AD

<LastUpdated/>

## Introduction

- **Overview**: Windows AD is a localized user directory management service provided by Microsoft. You can configure and enable the enterprise login of Windows AD service provider application sweep code in {{$localeConfig.brandName}} to quickly get the basic open information of Windows AD and help users to achieve the password-free login function through {{$localeConfig.brandName}}.
- **Application scenario**: Enterprise PC no-login scenario
- **End-user preview image**.

<img src="./images/windowsAD00.png" >

## Caution.

- To use Windows AD you need a Windows server.
- A server with Active Directory installed.
- A machine running the Authing AD Connector that is able to connect to Active Directory.
- A user account with read access to Active Directory.
- If you do not have a {{$localeConfig.brandName}} console account, go to [ {{$localeConfig.brandName}}Console console](https://authing.cn/) to register for a developer account first.

## This article contains the following sections.

- **Windows Active Directory** Installation under Windows Server
- Installing **AD LDS**
- Configuring **AD Domain Services**
- Checking **Active Directory** Service Connections
- Installing **AD CS**
- Configure **AD CS**
- Test pass **`ldaps`** to connect to Active Directory
- **`AD Related Policies`** `Modification` and `Testing`
- Related **`services`** and **`configuration`** purposes

## Windows Active Directory installation under Windows Server

### Installing **AD Domain Services** 1.

1. Open the `Service Manager` in Windows Server

<img src="./images/1-server-manager.png" class="md-img-padding" /> 2.

2. Select `Add Roles and Features`

<img src="./images/2-add-roles-and-features.png" class="md-img-padding" />

3. Select `installation type`

<img src="./images/3-installation-type.png" class="md-img-padding" />

4. `Server selection

<img src="./images/4-server-selection.png" class="md-img-padding" />

5. select `server-role`

<img src="./images/2-server-role-AD-domain-services.png" class="md-img-padding" />

6. Select `featured`

<img src="./images/6.功能.png" class="md-img-padding" />

7. Confirm

<img src="./images/7.确认.png" class="md-img-padding" />

8. AD LDS

<img src="./images/7.ADLDS.png" class="md-img-padding" />

9. Installation in progress

<img src="./images/9.结果.png" class="md-img-padding" />

10. Installing successfully

<img src="./images/10.运行安装向导.png" class="md-img-padding" />

### Installing **AD LDS**

> You can also choose not to do the installation and go directly to the **`Configure AD Domain Services`** installation, this is just to provide the installation process and points to note.

1. Run the `Installation Wizard

<img src="./images/10.运行安装向导.png" class="md-img-padding" />

2. Installation Wizard

<img src="./images/11.安装向导.png" class="md-img-padding" />

3. Create the AD LDS instance

<img src="./images/12.创建实例.png" class="md-img-padding" />

4. Set the `instance name

<img src="./images/13.实例名称.png" class="md-img-padding" />

5. Set the `default port

> If this default port conflicts with the `AD default port`, it will cause the `AD domain service` `prerequisite check` to fail

<img src="./images/14.默认端口.png" class="md-img-padding" />

6. Create the application directory partition

<img src="./images/15.创建应用程序目录分区.png" class="md-img-padding" />

7. Choose a storage location

<img src="./images/16.选择存储位置.png" class="md-img-padding" />

8. Select account association

<img src="./images/17.选择账户关联.png" class="md-img-padding" />

9. Assign administrative privileges

<img src="./images/18.分配管理权限.png" class="md-img-padding" />

10. Pour in the corresponding `LDIF`

<img src="./images/19.导入对应的LDIF.png" class="md-img-padding" />

11. Installation confirmation

<img src="./images/20.安装确认.png" class="md-img-padding" />

12. Installation in progress

<img src="./images/21.安装中.png" class="md-img-padding" />

13. Installation complete

<img src="./images/22.安装完成.png" class="md-img-padding" />

### Configuring **AD Domain Services** 1.

On `Service Manager`, elevate this service to `Domain Controller`

<img src="./images/2-将此服务提升为域控制器.png" class="md-img-padding" />

2. Deployment configuration

<img src="./images/2-部署配置.png" class="md-img-padding" />

3. `Domain Controller` Options

<img src="./images/2-域控制器选项.png" class="md-img-padding" />

4. `DNS` Options

<img src="./images/2-DNS选型.png" class="md-img-padding" />

5. Other options

<img src="./images/2-其他选项.png" class="md-img-padding" />

6. Paths

<img src="./images/2-路径.png" class="md-img-padding" />

7. View options

<img src="./images/2-查看选项.png" class="md-img-padding" />

8. prerequisites check

<img src="./images/2-先决条件检查.png" class="md-img-padding" />

9. Just execute the installation

### Checking **Active Directory** service connections

> Here you can use `ldp` for connection testing and get a response without entering more information about the `ldap` connection, or you can use some client (e.g. Apache Ldap Studio) for connection testing. Of course, the fact that `AD Admin Center` is open means that `currently` your connection test is OK.

1. `Win + r` opens the `CMD execution window`, type `ldp`

<img src="./images/2-打开ldp.png" class="md-img-padding" />

2. Select the link to open a link

<img src="./images/2-打开连接.png" class="md-img-padding" />

#### Connecting to Active Directory via **ldap**

1. Select the `ldap` protocol and test it
   <img src="./images/2-检查AD连接.png" class="md-img-padding" />

2. View `connection test` results

<img src="./images/2-AD-连接测试结果.png" class="md-img-padding" />

#### Connecting to Active Directory via **ldaps**

> For the `ldaps` protocol to work, you need to `install` and `configure` **Active Directory Certificate Service**, but there is no installation and configuration, the `connection result` should be `failed`.

1. Select the `ldaps` protocol and test

<img src="./images/2-AD-ldaps-测试连接.png" class="md-img-padding" />

2. View `connection test` results

<img src="./images/2-AD-ldaps-连接不能打开.png" class="md-img-padding" />

### Install **AD CS**

1. still open `Server Manager`

<img src="./images/1-server-manager.png" class="md-img-padding" />

2. Select `Add Roles and Features`

<img src="./images/3-添加角色和功能.png" class="md-img-padding" />

3. Select `installation type`

<img src="./images/3-安装类型.png" class="md-img-padding" />

4. Make `server selection

<img src="./images/3-服务器选择.png" class="md-img-padding" />

5. Add the corresponding `server role

<img src="./images/3-AD-证书服务选择.png" class="md-img-padding" />

6. Select `Add Functionality`

<img src="./images/3-添加证书功能.png" class="md-img-padding" />
7. Select the corresponding function
<img src="./images/3-功能下一步.png" class="md-img-padding" />

8. **AD CS**
   <img src="./images/3-AD-CS服务.png" class="md-img-padding" />

9. Select the corresponding `Role Service

<img src="./images/3-角色服务证书颁发机构.png" class="md-img-padding" />

10. Confirm the installation

<img src="./images/3-确认安装.png" class="md-img-padding" />

11. Installation in progress

<img src="./images/3-安装中.png" class="md-img-padding" />

12. Installation complete

<img src="./images/3-1-安装完成.png" class="md-img-padding" />

### Configure **AD CS**

1. Go to the interface for configuring the target server `AD CS`

<img src="./images/3-1-安装完成.png" class="md-img-padding" />

2. Specify the `credentials`

<img src="./images/3-1-制定凭据.png" class="md-img-padding" />

3. Select `Role Service`

<img src="./images/3-1-角色服务.png" class="md-img-padding" />

4. Specify the `CA setting type`

<img src="./images/3-1-设置-CA-类型.png" class="md-img-padding" />

5. specify `CA's type`

<img src="./images/3-1-CA类型.png" class="md-img-padding" />

6. Configure the `private key

<img src="./images/3-1-私钥.png" class="md-img-padding" />

7. Specify `encryption options

<img src="./images/3-1-指定加密选项.png" class="md-img-padding" />

8. specify `CA name`

<img src="./images/3-1-CA名称.png" class="md-img-padding" />

9. Specify the `CA expiration date

<img src="./images/3-1-选择-CA-有效期.png" class="md-img-padding" />

10. specify `CA database`

<img src="./images/3-1-证书数据库.png" class="md-img-padding" />

11. Confirm the current options

<img src="./images/3-1-CA确认.png" class="md-img-padding" />

12. View configuration results

<img src="./images/3-1-配置成功.png" class="md-img-padding" />

### Test `ldaps` connection to Active Directory

1. `Win + r` open `CMD execution window`, type `ldp`

<img src="./images/2-打开ldp.png" class="md-img-padding" />

2. Select the link to open a link

<img src="./images/2-打开连接.png" class="md-img-padding" />

3. Open the test application

<img src="./images/3-1-ldaps测试连接.png" class="md-img-padding" />

4. View the test results

<img src="./images/3-1-ldaps-测试连接成功.png" class="md-img-padding" />

### **`AD related policies`** modification and testing

1. open `AD Admin Center`

<img src="./images/打开AD管理中心-1.png" class="md-img-padding" />

or
<img src="./images/打开AD管理中心-2.png" class="md-img-padding" />

2. Add a new user via `AD Admin Center`

<img src="./images/4-在AD编辑器中增加一个用户.png" class="md-img-padding" />

3. `Add` a user

<img src="./images/4-新增一个authing-user用户.png" class="md-img-padding" />

4. View `Added results`

<img src="./images/4-新增authing-test密码不符合域长度而报错.png" class="md-img-padding" />

5. open `AD Policy Modifier`

<img src="./images/4-AD密码策略修改器.png" class="md-img-padding" />

6. Edit the `AD Policy

<img src="./images/4-编辑AD策略.png" class="md-img-padding" />

7. Go to `Computer Configuration

<img src="./images/4-组策略管理编辑器-计算机配置.png" class="md-img-padding" />

8. Go to `Policy`

<img src="./images/4-组策略管理编辑器-策略.png" class="md-img-padding" />

9. go to `windows settings`

<img src="./images/4-组策略管理编辑器-windows设置.png" class="md-img-padding" />

10. go to `security settings`

<img src="./images/4-组策略管理编辑器-安全设置.png" class="md-img-padding" />

11. Go to `Account Policies`

<img src="./images/4-组策略管理编辑器-账户策略.png" class="md-img-padding" />

12. Go to `Password Policy`

<img src="./images/4-组策略管理编辑器-密码策略.png" class="md-img-padding" />

13. modify `password-length-minimum

<img src="./images/4-组策略管理编辑器-密码长度最小值.png" class="md-img-padding" />

14. Click `Apply`, click `Confirm` 15.

15. Try again to add a user with `not strong enough` password

<img src="./images/4-再次尝试创建密码强度不够的用户.png" class="md-img-padding" />

16. View added results

<img src="./images/4-添加弱密码用户成功.png" class="md-img-padding" />

### Purpose of related **`services`** and **`configuration`**

This section focuses on the installation of the above services and the related configuration for the following purposes.

- **Windows Active Directory** installation under Windows Server

  > For AD related operations, the prerequisite is to build an AD service, and the installation of AD domain services is building an AD service.

- Installing **AD LDS**
  > **AD LDS** installation is not required

As described in the documentation: AD LDS provides storage for application-specific data as well as for directory-enabled applications (which do not require an AD Domain Services infrastructure). Multiple instances of AD LDS can exist on a single server, each of which can have its own architecture

- Configuring **AD Domain Services**

  > The **AD Domain Services** are configured to initialize the AD Domain Services for subsequent core functionality building

- Checking **Active Directory** service connectivity

  > Check if the **Active Directory** service is available and can be connected via ldap, which means that AD administration can be mapped to ldap-related operations

- Install **AD CS**

  **AD CS** provides a secure encryption suite for AD transmissions, supporting the ldaps protocol, both for secure transmissions and for non-tampering, etc. Some operations that are extremely sensitive to information data need to be done under ldsps, such as adding a new user and setting a password, adjusting a user's status to enabled, etc. The absence of this feature will result in the status of the {{$localeConfig.brandName}} data synchronization of the user information is not available

- Configure **AD CS**

  > Configure **AD CS** to complete the initialization of AD CS to build the subsequent functionality.

- Test connecting to Active Directory via **`ldaps`**

  > Test if the configuration of **AD CS** is faulty and available.

- **`AD-related policy`** `modification` and `testing`
  > This action is intended to direct the user's attention to the password-related policies in the AD service, as it may cause problems with users added in {{$localeConfig.brandName}} during synchronization to AD.

The scenario is as follows.

- The current password strength level in {{$localeConfig.brandName}} is low, the user adds a new weak password account, and the current password setting state in AD requires a certain complexity, when the user syncs over, the sync state will be abnormal due to these issues (the user can sync, but the state is always disabled because the password This will not match the AD policy and will cause the user to be unsuccessful in enabling it).
- The username in {{$localeConfig.brandName}} does not now have special rules for authentication filtering, i.e. by default the username in {{$localeConfig.brandName}} can be any string. However, the username in AD is not, and the sAMAccountName property in AD has certain restrictions, so that the data from {{$localeConfig.brandName}} to AD needs to deal with these differences, and it is reasonably common for these differences to come from different systems. {{$localeConfig.brandName}} user username as `authing@gmail.com`, when synchronizing, `username` and `sAMAccountName` have the same meaning in the normal sense, and these two fields should be used as mapping sides, but `authing@ gmail.com` is illegal to assign to `sAMAccountName` and will cause an error.

## Install AD Connector on Windows server

### Configure Windows AD in {{$localeConfig.brandName}} console

On the "Enterprise Identity Source" page of {{$localeConfig.brandName}}Console, click the "Create Enterprise Identity Source" button to enter the "Select Enterprise Identity Source" page, then click "Windows AD" to enter the "Windows AD Login Mode" page.

<img src="./images/windowsAD01.png" >

Please configure the relevant field information in the {{$localeConfig.brandName}}Console console on the "Enterprise Identity Source" - "Windows AD" page.

<img src="./images/windowsAD02.png" >


 | Field                    | Description                                                                                                                          
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unique identifier            | a. The unique identifier consists of lowercase letters, numbers, and -, and the length is less than 32 digits. b. This is the unique identifier of this connection and cannot be modified after setting.                                                                                                 |
| display name                 | This name will be displayed on the button on the end user's login screen.                                                                                                                                                                                                                                |
| Synchronize AD domain password | If set, when AD authentication succeeds, the user's password in the AD domain will be synchronized to their password in {{$localeConfig.brandName}} |
| Synchronize the user's password in {{$localeConfig.brandName}} to AD after the user's password is changed | If set, when a user's password in {{$localeConfig.brandName}} is changed (both when the administrator changes the password and when the user resets the password manually), the user's password in AD will be changed as well.
| Login Mode | When "Login Only Mode" is enabled, only existing accounts can be logged in, and no new accounts can be created, please choose carefully. |Please choose carefully.|
| Account identity association | When 「Account Identity Association」is not enabled, a new user is created by default when a user logs in through an identity source. After enabling 「Account Identity Association」, you can allow users to log in to existing accounts directly through 「Field Matching」 or 「Asking for Binding」. |

After the configuration is completed, click the "Create" button to complete the creation.

After successful creation, you will be automatically redirected to the application details page, and you will get a **Provisioning Ticket Url**, which will be used in the following steps.

! [](./images/windowsAD02.png)

After that you need to enable this AD connection for your application: !

! [](./images/windowsAD04.png)

#### Running {{$localeConfig.brandName}} AD Connector on Windows

Before installing the {{$localeConfig.brandName}} AD Connector, make sure the following conditions are met.

- A Windows server.
- The server has Active Directory installed.
- The machine running {{$localeConfig.brandName}} AD Connector is able to connect to Active Directory.
- A user account with read access to Active Directory.

First you need to [download](https://files.authing.co/packages/authing-ad-connector-latest.exe) the {{$localeConfig.brandName}} AD Connector, which is an exe file that needs to run on Your Windows AD server, which is responsible for communicating with {{$localeConfig.brandName}}. The {{$localeConfig.brandName}} AD Connector needs to be **installed in the LAN AD domain environment**, but not necessarily on the server running the AD service, as long as the {{$localeConfig.brandName}} AD Connector has access to the AD user directory .

##### Install {{$localeConfig.brandName}} AD Connector

Click [here](https://files.authing.co/packages/authing-ad-connector-latest.exe) to download the latest {{$localeConfig.brandName}} AD Connector.

Upload the downloaded file to the AD domain environment machine, double click on the application and install it.

! [](https://cdn.authing.cn/docs/20200414213654.png)

The system may raise a warning, click "Still running".

! [](https://cdn.authing.cn/blog/image%20%28521%29.png)

Select the language and click "OK".

! [](https://cdn.authing.cn/docs/20200414213931.png)

Click on "Next".

! [](https://cdn.authing.cn/blog/20201109213415.png)

Accept the license agreement and click on "Next".

! [](https://cdn.authing.cn/blog/20201109213443.png)

Select the software installation directory and click "Install".

! [](https://cdn.authing.cn/blog/20201109213500.png)

Wait for the installation to complete.

! [](https://cdn.authing.cn/blog/20201109213517.png)

Click "Finish", a command line window will pop up and wait for the installation to complete.

! [](https://cdn.authing.cn/docs/20200414214751.png)

There may be an error message about missing optional dependencies, you can ignore it. When you see the following screen, the installation is successful and you can exit by pressing any key.

! [](https://cdn.authing.cn/docs/20200414214912.png)

Afterwards you can see the AuthingADConnector service in the Windows service management page: !

! [](https://cdn.authing.cn/blog/20201109214605.png)

Next, open your browser and go to http://127.0.0.1:9743 and you will see the following screen.

! ! [](./images/adconnector01.png)

Fill in your Provisioning Ticket Url, AD Server Link Address, Base DN, Domain Username, Password, and click the "**Save**" button.

! [](./images/adconnector02.png)

::: hint-info
If you encounter a problem with the Connector linking to {{$localeConfig.brandName}} and the test fails, please wait for a while as the Connector handshake with {{$localeConfig.brandName}} has not yet completed due to network latency.
:::

::: hint-info
If you encounter AD-related errors, please check if the AD server link and hint information are correct.
:::

## Optional Action: Windows Active Directory User Directory Bi-directional Synchronization"

This section contains the following sections.

- **`AD Two-Way Synchronization`** for the on time
- Function points for **`AD Two-Way Synchronization`**
- **`AD Synchronization to Authing`**
- **`{{$localeConfig.brandName}} sync to AD`**
- **`User authentication related sync`**
- **`A complete two-way sync process`**

### **`AD two-way sync`** for the on time

Once configured, you can select the corresponding import method to import the organization.

> By default, after you import an organization using AD and you have completed the previous steps, AD's two-way synchronization is turned on

! [](~@imagesZhCn/guides/org/import-org.jpg)

### Function point of **`AD two-way synchronization`**

1. Sync from AD to Authing

- Add user information
- Change user information
- Delete user information
- Add organization node
- Change organization node information
- Add organization members
- Delete organization members
- Deleting organization nodes

2. Sync from {{$localeConfig.brandName}} to AD

- User add (add organization member)
- User change
- User Deletion
- Add organization member
- Deleting organization members
- Organization node deletion
- Organization node information change
- Organization node addition

3. User Authentication

- AD user import
- {{$localeConfig.brandName}} user synchronization to AD

### Initialize the test environment

1. Go to the `AD root node` and create a new **organizational unit**

<img src="./images/5-1-在根节点新建一个组织单位.png" class="md-img-padding" />

2. create `authing-test` **organizational unit**

<img src="./images/5-2-创建authing-test组织单位.png" class="md-img-padding" />

3. View the `properties` of this `organizational unit`

<img src="./images/5-3-查看该组织单位的属性.png" class="md-img-padding" />

4. Go to the `attribute editor`

<img src="./images/5-4-打开属性编辑器.png" class="md-img-padding" />

5. Copy the `DN` of `this organizational unit`

<img src="./images/5-4-复制该组织单位的dn.png" class="md-img-padding" />

6. In the {{$localeConfig.brandName}} console, go to Sync Center, create a sync task, select **Create Windows AD Sync Task**, fill in the unique identifier and save.
   <img src="./images/adconnector04.png" class="md-img-padding" />

Fill in the `AD-Connector` related configuration and save it. Note: Only after `AD-Connector` and `{{$localeConfig.brandName}} console` are **saved**, the **test connection** for the console's sync task is available

<img src="./images/adconnector02.png" class="md-img-padding" />

### **`AD Sync to Authing`**

#### Add user information

#### Change user information

#### Delete user information

#### Add organization node

#### Change organization node information

#### Add organization members

#### Delete organization members

#### Delete organization node

### **`{{$localeConfig.brandName}} sync to AD`**

#### User addition (add organization members)

1. Add a new `user` in {{$localeConfig.brandName}}

<img src="./images/6-Authing2AD-新建用户.png" class="md-img-padding" />

2. add `user information`

<img src="./images/6-Authing2AD-创建用户.png" class="md-img-padding" />

3. Ensure the existence of `Organization` imported from `AD`

<img src="./images/6-Authing2AD-确保拥有 AD 同步组织机构.png" class="md-img-padding" />

4. Import the new `user` to the corresponding `organization`

<img src="./images/6-Authing2AD-添加成员.png" class="md-img-padding" />

5. `AD data state` before `user import`

<img src="./images/6-Authing2AD-增加用户之前的AD 状态.png" class="md-img-padding" />

6. `AD data state` after `user import`

<img src="./images/6-Authing2AD-新增用户成功后的 AD 状态.png" class="md-img-padding" />

#### User Changes

1. `Modify` the user's information

<!-- <img src="./images/6-Authing2AD-新增用户成功后的 AD 状态.png" class="md-img-padding" /> -->

2. `Modify` the previous `AD data state`

<!-- <img src="./images/" class="md-img-padding" /> -->

3. `AD data state` after `modification`

<!-- <img src="./images/" class="md-img-padding" /> -->

#### User Deletion

1. `Delete` the user's information

<!-- <img src="./images/6-Authing2AD-新增用户成功后的 AD 状态.png" class="md-img-padding" /> -->

2. `Delete` the previous `AD data state`

<!-- <img src="./images/" class="md-img-padding" /> -->

3. `AD data state` after `deletion`

<!-- <img src="./images/" class="md-img-padding" /> -->

#### Add organization members

> `Equivalent to` User add (add organization member)

#### Deleting organization members

1. `Remove` an **member** of an `organization node`

2. `Delete the`AD data state`before the`Delete Organization Member`

3. `AD data state` after `deleting organization members`

#### Organization Node Additions

1. `Add` an organization node

2. `AD data state` before `Added organization node` 3.

3. `AD Data Status` after `Added Organization Node`

#### Organization node information change

1. `Change` organization node `information` 2.

2. `AD data status` before `Change` 3.

3. `AD data state` after `change`

#### Organization node deletion

1. `Delete` organization node

2. `Delete` the previous `AD data state` 3.

3. `AD data state` after `deletion`

### **User Authentication**

#### AD user import

#### {{$localeConfig.brandName}} user sync to AD
