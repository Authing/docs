!!!include(common/init-java-auth-sdk.md)!!!

首先在调用 SDK 登录成功后返回的对象中获取 [AccessToken](https://docs.authing.cn/v2/concepts/access-token.html) 并赋予 AuthenticationClient：

```java
authenticationClient.setAccessToken("AUTHING_ACCESSTOKEN");
```

在一个实体类中设置自定义字段：

CustomData 类：

```java
public class CustomData {
    private String school;
    public CustomData() {}
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
}
```

updateProfile 方法：

```java
UpdateUserProfileDto updateUserProfileDto = new UpdateUserProfileDto();
CustomData customData = new CustomData();
customData.setSchool("YOUR_SCHOOL");
updateUserProfileDto.setCustomData(customData);
authenticationClient.updateProfile(updateUserProfileDto);
```

获取该用户最新的自定义数据：

```java
GetProfileDto getProfileDto = new GetProfileDto();
// 设置获取用户自定义数据
getProfileDto.setWithCustomData(true);
UserSingleRespDto userSingleRespDto = authenticationClient.getProfile(getProfileDto);
CustomData res = (CustomData)userSingleRespDto.getData().getCustomData();
```