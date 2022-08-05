

# Hosting page

<LastUpdated/>

It takes only 1 minute if app uses UI provided by us, then call the following method where you want to authenticate user:

```java
// this is the activity context
AuthFlow.start(this);
```

This is how it looks like:

<img src="./images/standard.png" alt="drawing" width="400"/>

Then, we can get authentication result using the following code:

```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == RC_LOGIN && resultCode == OK && data != null) {
      //login success，do next task
    }
  }
```

If authentication success, we can get user info by:

```java
UserInfo userInfo = Authing.getCurrentUser();
```

