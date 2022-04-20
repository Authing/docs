# 什么是 LDAP

<LastUpdated/>

LDAP（轻型目录访问协议）是一种软件协议 ，使任何人都可以在公共互联网或公司内网上查找网络中的组织，个人和其他资源（例如文件和设备）的数据 。LDAP 是目录访问协议（DAP）的“轻量级”版本，它是 X.500（ 网络中目录服务的标准 ）的一部分。

目录告诉用户某些内容在网络中的位置。在 TCP / IP 网络上，域名系统（DNS）是用于将域名与特定网络地址（网络上的唯一位置）相关联的目录系统。但是，用户可能不知道域名。LDAP 允许用户搜索个人，而无需知道他们的位置（尽管其他信息将对搜索有所帮助）。

## LDAP 的用途

LDAP 的常见用途是为身份验证提供中心位置 —— 意味着它存储用户名和密码。然后，可以将 LDAP 用于不同的应用程序或服务中，以通过插件验证用户。例如，LDAP 可用于 `Docker`，`Jenkins`，`Kubernetes`，`Open VPN` 和 `Linux Samba` 服务器验证用户名和密码。系统管理员还可以使用 LDAP 单一登录来控制对 LDAP 数据库的访问。

LDAP 还可以用于将操作添加到目录服务器数据库中，对会话进行身份验证或绑定，删除 LDAP 条目，使用不同的命令搜索和比较条目，修改现有条目，扩展条目，放弃请求或取消绑定操作。

LDAP 用于 Microsoft 的 Active Directory 中，但也可以用于其他工具中，例如 Open LDAP，Red Hat Directory Server 和 IBM Tivoli Directory Server。Open LDAP 是一个开源 LDAP 应用程序。它是为 LDAP 数据库控制开发的 Windows LDAP 客户端和管理工具。该工具应允许用户浏览，查找，删除，创建和更改 LDAP 服务器上显示的数据。Open LDAP 还允许用户管理密码和按架构浏览。

Red Hat Directory Servers 是用于在 UNIX 环境中通过 Red Hat Directory Server 管理多个系统的工具。红帽目录服务器允许用户将用户详细信息存储在 LDAP 服务器中。该工具为用户提供对目录数据，组成员身份和远程访问以及通过验证过程的访问的安全且受限制的访问。

IBM Tivoli Directory Server 是基于 IBM 的 LDAP 实现。基于 LDAP 框架。该工具专注于更快地开发和分发身份控制，安全性和 Web 应用程序。Tivoli Directory Server 包括不同的验证方法，例如通过数字证书，简单认证和安全层（SASL）和 CRAM-MD5 进行的验证。

如果组织在决定何时使用 LDAP 时遇到麻烦，则应在一些用例中考虑使用 LDAP。他们应考虑以下情况：

- 需要定期查找和访问单个数据；
- 该组织有很多较小的数据条目；
- 组织希望将所有较小的数据块集中在一个集中的位置，并且在数据之间不需要过多的组织。

## LDAP 目录级别

LDAP 配置以简单的“树”层次结构组织，该层次结构由以下级别组成：

- 在**根目录**出发，到：
- 国家/地区
- 机构
- 部门
- 人员、文件和共享资源

LDAP 目录可以分布在许多服务器之间。每个服务器可以具有总目录的复制版本，该版本会定期同步。LDAP 服务器称为目录系统代理（DSA）。接收到来自用户的请求的 LDAP 服务器负责该请求，并根据需要将其传递给其他 DSA，但要确保为用户提供一个统一的响应。

## LDAP 和 Active Directory

轻型目录访问协议是 Exchange Server 与 Active Directory 通信所使用的协议 。要真正了解 LDAP 是什么以及它的作用，重要的是要了解 Active Directory 背后与 Exchange 相关的基本概念。

Active Directory 是一种目录服务，用于管理域，用户和分布式资源（例如 Windows 操作系统的对象）。目录服务背后的意义是它在管理域和对象的同时控制哪些用户可以访问每个资源。Active Directory 在 Windows Server 10 上可用，并且由多种服务组成。Active Directory 中包括的服务包括域，轻型目录，证书，联合身份和权限管理服务。每个服务都包含在 Active Directory 名称下，以扩展目录管理功能。

Active Directory 包含有关整个网络上每个用户帐户的信息。它将每个用户帐户视为一个对象。每个用户对象还具有多个属性。属性的示例是用户的名字，姓氏或电子邮件地址。所有这些信息都存在于域控制器（Active Directory）上的大型加密数据库中。挑战在于以可用格式提取信息。这是 LDAP 的主要工作。

LDAP 使用相对简单的基于字符串的查询从 Active Directory 中提取信息。LDAP 可以在 Active Directory 中存储和提取诸如用户名和密码之类的对象，并在整个网络中共享该对象数据。令人高兴的是，这一切都在幕后发生。普通的最终用户将永远不必手动执行 LDAP 查询，因为 Outlook 已启用 LDAP ，并且知道如何自行执行所有必要的查询。

## 使用 {{$localeConfig.brandName}} 提供的 LDAP 用户目录

详细使用文档请见[使用 {{$localeConfig.brandName}} 的 LDAP 用户目录](/guides/users/ldap-user-directory.md)，了解如何使用 LDAP 协议对外输出组织机构数据，请见 [使用 LDAP 协议对外开放组织机构数据](/guides/org/ldap-user-directory/)。
