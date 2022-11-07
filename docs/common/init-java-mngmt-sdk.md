使用[用户池 ID（`userPoolId`）和用户池密钥（`secret`）](/guides/faqs/get-userpool-id-and-secret.md)初始化 [Java SDK](/reference/sdk-for-java/) 的 `ManagementClient`:

```java
import cn.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
        ManagementClientOptions options = new ManagementClientOptions();
        options.setAccessKeyId(AUTHING_USERPOOL_ID);
        options.setAccessKeySecret(AUTHING_USERPOOL_SECRET);
        ManagementClient client = new ManagementClient(options);
    }
}
```