---
{
  title: 'aws国际区对接 - 单点登录配置 - 应用身份服务 - Authing 身份云',
  description: 'aws国际区-saml应用主要实现支撑单点登录流程的功能。Authing合作网络提供 aws国际区对接，单点登录，SSO，实现应用的快捷登录、免密登录，提升员工办公体验、增强用户体验，增强企业数字化服务水平。',
  meta:
    [
      {
        name: 'keywords',
        content: 'aws国际区,aws国际区软件, aws国际区SaaS, SSO,应用身份服务,单点登录配置,Authing身份云',
      },
    ],
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  bannerTitle: '使用 SAML2 登录 AWS 控制台（国际区）',
  steps:
    [
      {
        title: '配置 {{$localeConfig.brandName}} SAML2 IDP',
        subTitle: '{{$localeConfig.brandName}} 应用开启 SAML2 Provider 并配置.',
      },
      { title: '配置 AWS', subTitle: '在 AWS 创建身份提供商和角色' },
      {
        title: '使用 {{$localeConfig.brandName}} IdP 登录 AWS',
        subTitle: '使用 {{$localeConfig.brandName}} IdP 登录 AWS 控制台',
      },
    ],
}
---

<IntegrationDetail/>
