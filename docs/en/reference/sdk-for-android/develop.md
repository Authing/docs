

# Get started

<LastUpdated/>

## Step 1: Create an Android project

![](./images/create_project1.png)

![image-20220327173229220](./images/create_project2.png)

> Note: Minimum OS version is Android 7.0

## Step 2: Add dependency for Guard

make sure mavenCentral is present in project-level build.gradle

 ```groovy
 buildscript {
    repositories {
        mavenCentral()

        // other repositories
    }
 }
 ```

```groovy
implementation 'cn.authing:guard:+'
```

## Step 3: Initialization

at app startup, call:

```java
// “context” is application or initial activity
// ”your_authing_app_id“ is obtained from the Authing console
Authing.init(appContext, "your_authing_app_id");
```

Next, embed authentication flow and UI in 1 minute.

<span style="background-color: #396aff;a:link:color:#FFF;padding:8px;border-radius: 4px;"><a href="./quick.html" style="color:#FFF;">Quick start →</a>
</span>

