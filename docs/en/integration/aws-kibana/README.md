---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 SAML2 登录 AWS Kibana',
  bannerTitle: 'Log in to AWS Kibana using Saml2',
  steps:
    [
      {
        title: 'Configure AWS ES',
        subTitle: 'Modify AWS ElasticSeach authentication method',
      },
      {
        title: 'Configure {{$localeConfig.brandName}} SAML2 IdP',
        subTitle: '{{$localeConfig.brandName}} Apply to open SAML2 Provider and configure',
      },
      {
        title: 'Upload metadata documentation AWS ES',
        subTitle: 'Modify the metadata document content, then upload to AWS ES',
      },
      {
        title: 'Add users in {{$localeConfig.brandName}}',
        subTitle: 'Create a user in {{$localeConfig.brandName}} with SAML master user name',
      },
      {
        title: 'Configure completion',
        subTitle: 'Use {{$localeConfig.brandName}} IdP login AWS Kibana',
      },
    ],
}
---

<IntegrationDetail backLink="/en/integration/"/>
