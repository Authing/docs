# On-premise deployment

<LastUpdated/>

We have to set up *domain* and *public key* for on-premise deployment. So **before** calling Authing.init(), you must first call:

```swift
Authing.setOnPremiseInfo(String host, String publicKey)
```

- *host* your on-premmise deployment domain. For example: authing.mycompany.com
- *publicKey* your on-premmise deployment public key

If you have any question, please contact our sales.

