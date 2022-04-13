# What is LDAP?

<LastUpdated/>

LDAP (Lightweight Directory Access Protocol) is a software protocol that enables anyone to find data on organizations, individuals, and other resources (such as files and devices) in the network on the public Internet or company intranet. LDAP is a "lightweight" version of the Directory Access Protocol (DAP), which is part of X.500 (the standard for directory services on the web).

The directory tells the user the location of certain content on the network. On TCP/IP networks, the Domain Name System (DNS) is a directory system used to associate domain names with specific network addresses (the only locations on the network). However, the user may not know the domain name. LDAP allows users to search for individuals without knowing their location (although other information will help with the search).

## The Application of LDAP

A common use of LDAP is to provide a central location for authentication, which means it stores usernames and passwords. Then, LDAP can be used in different applications or services to authenticate users through plug-ins. For example, LDAP can be used in `Docker`, `Jenkins`, `Kubernetes`, `Open VPN` and `Linux Samba` servers to verify usernames and passwords.System administrators can also use LDAP Single Sign-On to control access to LDAP databases.

LDAP can also be used to add operations to the directory server database, authenticate or bind sessions, delete LDAP entries, search and compare entries using different commands, modify existing entries, extend entries, abandon requests or cancel binding.

LDAP is used in Microsoft's Active Directory, but it can also be used in other tools such as Open LDAP, Red Hat Directory Server and IBM Tivoli Directory Server. Open LDAP is an open source LDAP application, which is a Windows LDAP client and management tool developed for LDAP database control. The tool should allow users to browse, find, delete, create and change the data displayed on the LDAP server. Open LDAP also allows users to manage passwords and browse by schema.

Red Hat Directory Servers are tools for managing multiple systems through Red Hat Directory Server in a UNIX environment. Red Hat Directory Server allows users to store user details in an LDAP server. The tool provides users with secure and restricted access to directory data, group membership, remote access, and access through the verification process.

IBM Tivoli Directory Server is based on IBM's LDAP implementation. Based on the LDAP framework, the tool focuses on faster development and distribution of identity control, security and web applications. Tivoli Directory Server includes different verification methods, such as verification through digital certificates,Simple Authentication and Security Layer(SASL), and CRAM-MD5.

If an organization has trouble deciding when to use LDAP, it should be considered in some cases. The situations where should be considered as follows:

- The organization has the requirement to find and access individual data on a regular basis.
- The organization has many smaller data entries.
- The organization wants to concentrate all the smaller data blocks in a centralized location, and does not require too much organization between the data.

## LDAP Directory Level

The LDAP configuration is organized in a simple "tree" hierarchy, which consists of the following levels:

- Starting from the **root directory**, go to:
- Country / region
- Institution
- Department
- People, files and shared resources

The LDAP directory can be distributed among many servers. Each server can have a replicated version of the general directory, which will be synchronized regularly. The LDAP server is called the Directory System Agent (DSA). The LDAP server that receives the request from the user is responsible for the request and passes it to other DSAs as needed, but it must ensure that a unified response is provided to the user.

## LDAP and Active Directory

The Lightweight Directory Access Protocol is the protocol used by Exchange Server to communicate with Active Directory. To truly understand what LDAP is and what it does, it is important to understand the basic concepts behind Active Directory related to Exchange.

Active Directory is a directory service used to manage domains, users, and distributed resources (such as Windows operating system objects). The meaning behind the directory service is that it controls which users can access which resource while managing domains and objects. Active Directory is available on Windows Server 10 and consists of multiple services. The services of Active Directory include domains, lightweight directories, certificates, federated identity and access management services. Each service is included under the Active Directory to extend directory management capabilities.

Active Directory contains information about every user account on the entire network, which treats each user account as an object. Each user object also has multiple attributes. The examples of attributes are such as first name, last name, or email address. All this information exists in a large encrypted database on the domain controller (Active Directory). The main job of LDAP is to extract the information in a usable format, which is a challenge.

LDAP uses relatively simple string-based queries to extract information from Active Directory. LDAP can store and retrieve objects such as usernames and passwords in Active Directory, and share the object data throughout the network. Happily, all this happens behind the scenes. End users will never have to perform LDAP queries manually, because Outlook has LDAP enabled and knows how to perform all necessary queries on its own.

## Use the LDAP user directory provided by {{$localeConfig.brandName}} 

For more details, please refer to the [LDAP user directory using {{$localeConfig.brandName}}](/guides/users/ldap-user-directory.md). To learn how to use the LDAP protocol to export organization data, please refer to [Use LDAP protocol to open organization data](/guides/org/ldap-user-directory/).
