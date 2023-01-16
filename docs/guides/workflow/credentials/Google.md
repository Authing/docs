


 Google
 [#](#google "Permanent link")
=======================================



 This section contains:
 


* [OAuth2 single service](/integrations/builtin/credentials/google/oauth-single-service/) 
 : create an OAuth2 credential for a specific service node, such as the Gmail node.
* [OAuth2 generic](/integrations/builtin/credentials/google/oauth-generic/) 
 : create an OAuth2 credential for use with
 [custom operations](/integrations/custom-operations/) 
 .
* [Service Account](/integrations/builtin/credentials/google/service-account/) 
 : create a Service Account credential.



 OAuth2 and Service Account
 [#](#oauth2-and-service-account "Permanent link")
-------------------------------------------------------------------------------



 There are two authentication methods available for Google services nodes,
 [OAuth2](https://developers.google.com/identity/protocols/oauth2) 
 and
 [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts) 
 . n8n recommends using OAuth. It's more widely available, and easier to set up. Refer to the
 [Google documentation: Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts) 
 for guidance on when you need service account.
 



 Compatible nodes
 [#](#compatible-nodes "Permanent link")
-----------------------------------------------------------



 Once configured, you can use your credentials to authenticate the following nodes. Most nodes are compatible with OAuth2 authentication. Support for Service Account authentication is limited.
 




 Compatibility
 


| 
 Node
  | 
 OAuth
  | 
 Service Account
  |
| --- | --- | --- |
| [G Suite Admin](/integrations/builtin/app-nodes/n8n-nodes-base.gsuiteadmin/)  | ✅ | ❌ |
| [Google Ads](/integrations/builtin/app-nodes/n8n-nodes-base.googleads/)  | ✅ | ❌ |
| [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/)  | ✅ | ✅ |
| [Google Analytics](/integrations/builtin/app-nodes/n8n-nodes-base.googleanalytics/)  | ✅ | ❌ |
| [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googlebigquery/)  | ✅ | ❌ |
| [Google Books](/integrations/builtin/app-nodes/n8n-nodes-base.googlebooks/)  | ✅ | ✅ |
| [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)  | ✅ | ❌ |
| [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googlechat/)  | ❌ | ✅ |
| [Google Cloud Storage](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudstorage/)  | ✅ | ❌ |
| [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googlecontacts/)  | ✅ | ❌ |
| [Google Cloud Firestore](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudfirestore/)  | ✅ | ❌ |
| [Google Cloud Natural Language](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudnaturallanguage/)  | ✅ | ❌ |
| [Google Cloud Realtime Database](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudrealtimedatabase/)  | ✅ | ❌ |
| [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googledocs/)  | ✅ | ✅ |
| [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/)  | ✅ | ✅ |
| [Google Drive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/)  | ✅ | ✅ |
| [Google Perspective](/integrations/builtin/app-nodes/n8n-nodes-base.googleperspective/)  | ✅ | ❌ |
| [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)  | ✅ | ✅ |
| [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleslides/)  | ✅ | ✅ |
| [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googletasks/)  | ✅ | ❌ |
| [Google Translate](/integrations/builtin/app-nodes/n8n-nodes-base.googletranslate/)  | ✅ | ✅ |
| [YouTube](/integrations/builtin/app-nodes/n8n-nodes-base.youtube/)  | ✅ | ❌ |





 Note for n8n Cloud users
 



 For the following nodes, you can authenticate by entering the
 **Credentials Name** 
 and selecting
 **Sign in with Google** 
 in the OAuth section to connect your Google account to n8n:
 


* [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)
* [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googlecontacts/)
* [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
* [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googletasks/)





