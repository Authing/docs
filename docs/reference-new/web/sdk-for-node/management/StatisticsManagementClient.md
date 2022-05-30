---
meta:
  - name: description
    content: 管理日志统计信息
---

# 管理日志统计信息

<LastUpdated/>


> 主要用于管理日志统计信息


## 审计日志列表查询
> 审计日志列表查询
```js
StatisticsManagementClient().listAuditLogs(options)
```
#### 参数

- `options` \<object\>  
- `options.appIds` \<[]string\> 应用 ID 集合
- `options.clientIp` \<string\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP
- `options.operationNames` \<[]string\> 操作名称的集合
- `options.userIds` \<[]string\> 用户唯一标识的集合
- `options.page` \<int\> 分页，获取第几页，默认从 1 开始
- `options.limit` \<int\> 每页条目数量，默认为 10 个

#### 示例

```js
    const auditLogs = await managementClient.statistics.listAuditLogs({
        operationNames: [SupportedAdminActionEnum.CREATE_USER]
      });
    console.log(auditLogs);
```

#### 示例数据
```json
{
	"message": "",
	"code": 200,
	"data": {
		"totalCount": 1,
		"list": [{
			"photoUrl": "https://files.authing.co/authing-console/default-user-avatar.png",
			"eventType": " 创建用户",
			"@timestamp": "2021-09-22T07:47:21.897Z",
			"userId": "61384cf9628539c0f839",
			"logId": "c72c118e-c1a9-4fbd-bafe-c45d00da17",
			"userAgent": "python-requests/2.26.0",
			"resourceName": "用户",
			"message": "[2021-09-22T07:47:21.559-0000] logId=c72c118e-c1a9-4fbd-bafe-c45d00da173b appId=null userName=@authing.cn userPoolId=61384d3e302f1f75e69ce95a userId=61384cf9628539c0f83943e7 requestId=6939cb03-9013-4c08-8954-2920babeed35 roleName=admin roleCode=null roleId=null userAgent=python-requests/2.26.0 clientIp=111.202.167.58 eventType=createUser eventDetails=null resourceType=DATA resourceName=user resourceDetails=shxbxpbodj operationType=create operationMode=sdk originValue=null targetValue=null eventResultCode=success operationParam=null eventResultMsg=null",
			"operationParam": "null",
			"eventResultMsg": "null",
			"userPoolId": "61384d3e302f1f75e69c",
			"roleId": "null",
			"requestId": "6939cb03-9013-4c08-8954-2920babe5",
			"operationType": "创建",
			"targetValue": "null",
			"operationMode": "SDK",
			"eventResultCode": "成功",
			"timestamp": "2021-09-22T07:47:21.559-0000",
			"host": "logstash-ds-q4xg9",
			"appId": "null",
			"path": "/var/log/authing-server/audit.2021-09-22.log",
			"resourceDetails": "shxbxpbodj",
			"roleCode": "null",
			"userName": "lis",
			"userPoolName": "newSDK",
			"resourceType": "数据",
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
		}]
	}
}
```

## 查看用户操作日志
> 查看用户操作日志

```js
StatisticsManagementClient().listUserActions(options)
```

#### 参数
- `options` \<object\> 
- `options.page` \<int\> 页码数, 从 1 开始 默认值为 : `1`, 可选值
- `options.limit` \<int\> 每页包含的用户数 默认值为 : `10`, 可选值
- `options.clientIp` \<string\> 客户端 IP 地址，可选值
- `options.operationNames` \<string[]\> 操作类型，可选值
- `options.userIds` \<string[]\> 用户 id ，可选值
- `options.excludeNonAppRecords` \<boolean\> 是否排除空记录， 可选值
- `options.appIds` \<string[]\> 应用 id ， 可选值
- `options.start` \<number\> 起始时间， 可选值
- `options.end` \<number\> 结束时间，可选值
#### 示例

```js
const data = await managementClient.statistics.listUserActions( );
console.log(data);
```
