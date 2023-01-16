


 AWS
 [#](#aws "Permanent link")
=================================



 You can use these credentials to authenticate the following nodes with AWS.
 


* [AWS Certificate Manager](/integrations/builtin/app-nodes/n8n-nodes-base.awscertificatemanager/)
* [AWS DynamoDB](/integrations/builtin/app-nodes/n8n-nodes-base.awsdynamodb/)
* [AWS Elastic Load Balancing](/integrations/builtin/app-nodes/n8n-nodes-base.awselb/)
* [AWS Lambda](/integrations/builtin/app-nodes/n8n-nodes-base.awslambda/)
* [AWS Rekognition](/integrations/builtin/app-nodes/n8n-nodes-base.awsrekognition/)
* [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awsS3/)
* [AWS SES](/integrations/builtin/app-nodes/n8n-nodes-base.awsses/)
* [AWS SNS](/integrations/builtin/app-nodes/n8n-nodes-base.awssns/)
* [AWS SNS Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.awssnstrigger/)
* [AWS SQS](/integrations/builtin/app-nodes/n8n-nodes-base.awssqs/)
* [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awstextract/)
* [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create an
 [AWS](https://aws.amazon.com/) 
 account.
 



 Using Access Token
 [#](#using-access-token "Permanent link")
---------------------------------------------------------------


1. Open your
 [AWS Management Console](https://console.aws.amazon.com) 
 .
2. Click on your name on the top right and select 'My Security Credentials' from the dropdown.
3. Click on the
 **Create New Access Key** 
 button, under the
 **Access keys (access key ID and secret access key)** 
 section
4. Click on the
 **Show Access Key** 
 button.
5. Copy the displayed Access Key ID.
6. Enter the name for your credentials in the
 **Credentials Name** 
 field in the 'AWS' credentials in n8n.
7. Paste the Access Key ID in the
 **Access Key ID** 
 field in the 'AWS' credentials in n8n.
8. Copy the secret access key from your AWS console.
9. Paste the secret access key in the
 **Secret Access Key** 
 field in the 'AWS' credentials in n8n.
10. Click the
 **Create** 
 button to save your credentials in n8n.



**Note:** 
 If you're running your AWS instance in a different region, please update the
 **Region** 
 field accordingly.
 



 The following video demonstrates the steps mentioned above.
 








