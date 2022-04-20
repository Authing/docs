---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 SAML2 登录 AWS Kibana',
  bannerTitle: '使用 SAML2 登录 AWS Kibana',
  steps:
    [
      { title: '配置 AWS ES', subTitle: '修改 AWS ElasticSeach 身份验证方式' },
      {
        title: '配置 {{$localeConfig.brandName}} SAML2 IdP',
        subTitle: '{{$localeConfig.brandName}} 应用开启 SAML2 Provider 并配置',
      },
      { title: '上传元数据文档到 AWS ES', subTitle: '修改元数据文档内容，然后上传到 AWS ES' },
      { title: '在 {{$localeConfig.brandName}} 添加用户', subTitle: '以 SAML 主用户名在 {{$localeConfig.brandName}} 创建用户' },
      { title: '配置完成', subTitle: '使用 {{$localeConfig.brandName}} IdP 登录 AWS Kibana' },
    ],
}
---

<IntegrationDetail/>
