# Add user defined fields

<LastUpdated/>

User defined fields are fields that can be added to user objects in addition to the [basci user fields](/guides/user/user-profile.md). Developers can store a small amount of business-related data by setting user defined fields.
You can define the following types of user defined fields:

- String
- Number
- Date
- Boolean
- Object

You can configure user defined fields on the **Configuration** - **Extend Fields** page:

![](~@imagesZhCn/guides/authentication/Xnip2021-02-24_15-43-23.png)


After configuring the user defined fields, you can open the registration information completion page of the application to allow users to complete the information in these user defined fields.

In the **Application Details** - **Login and Registration Configuration** page, click **Enable registration information completion ** switch, and then select the user defined field just added:

![](~@imagesZhCn/guides/authentication/Xnip2021-02-24_15-41-20.png)

The input type can choose text, password, number, date, color, Email and picture, which will determine the final display style of the page.

Click Save, and then go to the login page of the app.

After the user clicks registration, it will be redirected to the following registration information completion page:

![](~@imagesZhCn/guides/authentication/Xnip2021-02-24_15-46-26.png)

After the user successfully registers, you can see the user defined field value that the user just entered on the user details page:

![](~@imagesZhCn/guides/authentication/Xnip2021-02-24_15-48-29.png)
