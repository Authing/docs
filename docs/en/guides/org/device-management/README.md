# Manage devices

<LastUpdated/>

### Devices Management

The Devices Management function is designed to manage all web, mobile and PC devices that log in to the user pool application; by logging in to the user pool application, the device actively reports
the device information to the user pool, and removes, suspends, and deactivates the device. And other operations to achieve the ultimate management capability of the device.

### Administrator Side Devices Management

1. Click on the "Organization" - "Devices Management" module to enter the device list, where you can see the basic and usage information of all devices, and you can remove/suspend/deactivate the
   device. Enabled actions;

<img src="~@imagesEnUs/guides/org/device-list.png" alt="drawing" style="display: block; margin: 0 auto;" />

2. In the Devices Management list, click on a certain device information to enter the information details page of the device, and you can see all the account information, device security information
   and active information of the device;

<img src="~@imagesEnUs/guides/org/device-detail.png" alt="drawing" style="display: block; margin: 0 auto;" />

3. Click on the "Organization" - "Member Management" - "Member Details" page, the user can see all devices information logged in with the account, and can remove, suspend, and deactivate operations;

<img src="~@imagesEnUs/guides/org/user-device-list.png" alt="drawing" style="display: block; margin: 0 auto;" />

### User Side Devices Management

1. Web-side application personal center: In the personal center of the Web-side application, you can see all devices logged in to the application under the user;

<img src="~@imagesEnUs/guides/org/web-profile-device.png" alt="drawing" style="display: block; margin: 0 auto;" />

2. Authing Token mobile end App: Open the Authing Token APP, enter the corresponding mobile end application of the user pool, and log in. After logging in, you can see the "Facility Management" module
   in the personal center. After clicking to enter, you can The device logged in under the application performs management operations:

<img src="~@imagesEnUs/guides/org/mobile-profile-device.png" alt="drawing" style="display: block; margin: 0 auto;" />

### Manage devices through "Manage Data Objects"

1. First, in a user pool with the "Manage Data Objects" function enabled, open the "Settings" - "Manage Data Objects" page, click the "Device Management" module, and enter the Device Management
   module:

<img src="~@imagesEnUs/guides/org/model-list.png" alt="drawing" style="display: block; margin: 0 auto;" />

2. In the basic information of the "Device Management" function, the defined function name, function identifier, function description and parent menu are displayed, and cannot be modified:

<img src="~@imagesEnUs/guides/org/model-device-basic-setting.png" alt="drawing" style="display: block; margin: 0 auto;" />

3. Field management: Display all fields related to the Devices Management function, you can choose whether to display or edit:

<img src="~@imagesEnUs/guides/org/model-device-fields-setting.png" alt="drawing" style="display: block; margin: 0 auto;" />

4. Operation Management: It shows the general form operation capabilities for Devices Management, including the capabilities of "Create", "Edit", "Delete", "Import", and "Export";

<img src="~@imagesEnUs/guides/org/model-device-operation-setting.png" alt="drawing" style="display: block; margin: 0 auto;" />

5. Details page configuration: It shows the configuration of a certain device details page, and can configure the Tab and corresponding fields of the details page;

<img src="~@imagesEnUs/guides/org/model-device-detail-setting.png" alt="drawing" style="display: block; margin: 0 auto;" />

### Devices Management API calls

Devices Management API call, you need to use the API provided by the business side. The specific API location
is: [Management Devices API](https://console.authing.cn/openapi/v3/management/#tag/%E7%AE%A1%E7%90%86%E7%BB%88%E7%AB%AF%E8%AE%BE%E5%A4%87/API%20%E5%88%97%E8%A1%A8)