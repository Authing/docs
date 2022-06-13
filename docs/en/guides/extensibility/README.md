# Overview of Expansion Capabilities

<LastUpdated/>

Authing has always been committed to improving the openness and scalability of the platform to meet the various personalized needs of different customers for identity authentication and authority management. Authing g's extensibility system includes the following forms:

- [WebHook](/guides/webhook/README.md) allows you to monitor user registration, login, password reset, email verification, user information update, etc. The system will send the event to the custom callback address you configured after triggering a specific event, so as to do some custom processing on it.
- [Pipeline](/guides/pipeline/README.md) is a set of user-defined JavaScript code running in the cloud, which allows developers to execute custom code in the authentication process, adding custom id_token, and very flexible access control.
- [The custom database](/guides/database-connection/overview.md) allows Authing to interact with your custom database, and it can also realize non-stop user data migration to the cloud.
