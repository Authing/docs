# Error Code List

<LastUpdated/>

API Error coce list：[Error Code](https://docs.authing.cn/v2/en/reference/error-code.html)

The following error codes are unique to the iOS SDK：

| apiCode | message | Description |
| :----: | :---- | :---- |
|10001|Network error| Network request error. This error is returned when the mobile phone has no network connection or the network request is abnormal. |
|10002|Config not found| Failed to get the configuration file, this error is returned when the Authing console application configuration cannot be found. |
|10003|Login failed| Login failed, this error is returned when the user cannot be found. |
|10004|JSON parse failed| JSON parsing failed, this error is returned when the JSON is empty or the JSON format is incorrect when calling a network request. |
|10005|Social login failed| This error is returned when Netease one auth login authorization fails. |