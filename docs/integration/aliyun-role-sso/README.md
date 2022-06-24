---
{
  title: '阿里云（角色 SSO）对接 - 单点登录配置 - 应用身份服务 - Authing 身份云',
  description: '阿里云-saml应用主要实现支撑单点登录流程的功能。Authing合作网络提供 阿里云对接，单点登录，SSO，实现应用的快捷登录、免密登录，提升员工办公体验、增强用户体验，增强企业数字化服务水平。',
  meta:
    [
      {
        name: 'keywords',
        content: '阿里云, 阿里云软件, 阿里云SaaS, SSO,应用身份服务,单点登录配置,Authing身份云',
      },
    ],
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  bannerTitle: '使用 SAML2 登录阿里云控制台',
  steps:
    [
      {
        title: '在 {{$localeConfig.brandName}} 中创建应用',
        subTitle: '从 {{$localeConfig.brandName}} 应用市场中获取并创建应用',
      },
      { title: '配置阿里云', subTitle: '在阿里云创建身份提供商，并开启角色 SSO' },
      {
        title: '配置 {{$localeConfig.brandName}} 用户',
        subTitle: '创建 {{$localeConfig.brandName}} 用户并关联阿里云角色，并体验登录',
      },
    ],
}
---

<IntegrationDetail/>
