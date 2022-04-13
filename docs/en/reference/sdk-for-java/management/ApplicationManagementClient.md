---
meta:
  - name: description
    content: ApplicationManagementClient
---

# ApplicationManagementClient

<LastUpdated/>

> A {{$localeConfig.brandName}} user pool can create multiple applications. This client is used to manage {{$localeConfig.brandName}} applications. It can obtain application lists, view application details and perform other operations.

## Get application list

ApplicationManagementClient().listApplications()

> Get the application list of user pool.

#### Sample

```java
List<Application> result = applicationManagementClient.listApplications().execute();
```

## Get application details

ApplicationManagementClient().detail(appId)

> Get application details

#### Parameter:

- `appId` \<string\> Application ID

#### Sample

```java
Application application = applicationManagementClient.detail(appId).execute();
```
