# Create or import an organization

<LastUpdated/>

If you have not created your own organization, we recommend that you use {{$localeConfig.brandName}} as the main identity source to store user and organization data. If you store your own organization data elsewhere, we also support importing third-party organization data into {{$localeConfig.brandName}}.

## Create an organization

You can choose to use the console or API & SDK to create an organization.

<StackSelector snippet="create-org" selectLabel="Type" :order="['dashboard', 'java', 'javascript']"/>

## Import organization

{{$localeConfig.brandName}} organization supports importing organizations and users from the following channels:

- [Windows local Active Directory](https://en.wikipedia.org/wiki/Active_Directory)
- [Excel](?import-org=excel#导入组织机构)
- You can also use API & SDK to [write user import scripts](/guides/migrations/use-api.md).

Please read the corresponding documents separately:

<StackSelector snippet="import-org" selectLabel="Type" :order="['wechat-work', 'dingtalk', 'excel', 'ldap', 'active-directory']"/>

After configuration, you can select the corresponding import method to import to the organization.

![](~@imagesZhCn/guides/org/import-org.jpg)
