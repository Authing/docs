---
meta:
  - name: description
    content: Management log statistics
---

# Management log statistics

<LastUpdated/>

> Mainly used to manage log statistics

## Audit log list query

> Audit log list query

```python
def list_audit_logs(self, client_ip=None, operation_names=None, user_ids=None, app_ids=None, page=None, limit=None)
```

#### parameter

- `app_ids` \<list\> Apply ID collection
- `client_ip` \<str\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `operation_names` \<list\> A collection of operating names
- `user_ids` \<list\> User unique logo collection
- `page` \<int\> Page, get the first few pages, the default starts from 1
- `limit` \<int\> The number of entries per page, the default is 10

#### Example

```python
management.auditLog.list_audit_logs(app_ids=["appid"])
```

#### Sample data

```json
{
  "message": "",
  "code": 200,
  "data": {
    "totalCount": 1,
    "list": [
      {
        "photoUrl": "https://files.authing.co/authing-console/default-user-avatar.png",
        "eventType": " Create a user",
        "@timestamp": "2021-09-22T07:47:21.897Z",
        "userId": "61384cf9628539c0f839",
        "logId": "c72c118e-c1a9-4fbd-bafe-c45d00da17",
        "userAgent": "python-requests/2.26.0",
        "resourceName": "用户",
        "message": "[2021-09-22T07:47:21.559-0000] logId=c72c118e-c1a9-4fbd-bafe-c45d00da173b appId=null userName=lishaodong@authing.cn userPoolId=61384d3e302f1f75e69ce95a userId=61384cf9628539c0f83943e7 requestId=6939cb03-9013-4c08-8954-2920babeed35 roleName=admin roleCode=null roleId=null userAgent=python-requests/2.26.0 clientIp=111.202.167.58 eventType=createUser eventDetails=null resourceType=DATA resourceName=user resourceDetails=shxbxpbodj operationType=create operationMode=sdk originValue=null targetValue=null eventResultCode=success operationParam=null eventResultMsg=null",
        "operationParam": "null",
        "eventResultMsg": "null",
        "userPoolId": "61384d3e302f1f75e69c",
        "roleId": "null",
        "requestId": "6939cb03-9013-4c08-8954-2920babe5",
        "operationType": "create",
        "targetValue": "null",
        "operationMode": "SDK",
        "eventResultCode": "success",
        "timestamp": "2021-09-22T07:47:21.559-0000",
        "host": "logstash-ds-q4xg9",
        "appId": "null",
        "path": "/var/log/authing-server/audit.2021-09-22.log",
        "resourceDetails": "shxbxpbodj",
        "roleCode": "null",
        "userName": "lis",
        "userPoolName": "newSDK",
        "resourceType": "data",
        "@version": "1",
        "originValue": "null",
        "eventDetails": "创建「 shxbxpbodj 」共 1 个用户",
        "geoip": {
          "region_code": "BJ",
          "region_name": "Beijing",
          "country_code2": "CN",
          "continent_code": "AS",
          "ip": "111.202.167.58",
          "longitude": 116.3889,
          "country_code3": "CN",
          "latitude": 39.9288,
          "location": {
            "lat": 39.9288,
            "lon": 116.3889
          },
          "country_name": "China",
          "city_name": "Beijing",
          "timezone": "Asia/Shanghai"
        },
        "roleName": "管理员",
        "clientIp": "111.202.167.58",
        "ua": {
          "major": "2",
          "os_name": "Other",
          "name": "Python Requests",
          "build": "",
          "device": "Other",
          "os": "Other",
          "minor": "26"
        },
        "filedate": "2021.09.22"
      }
    ]
  }
}
```
