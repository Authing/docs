---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 OIDC Client Credentials 模式',
  bannerTitle: '使用 OIDC Client Credentials 模式',
  steps:
    [
      { title: '创建应用', subTitle: '本例创建一个「大屏展示应用」' },
      { title: '创建资源', subTitle: '在 {{$localeConfig.brandName}} 定义资源' },
      { title: '创建编程访问账号', subTitle: '创建编程访问账号，获得 AK、SK 密钥，交给调用方' },
      { title: '将资源授权给编程访问账号', subTitle: '将资源授权给编程访问账号' },
      { title: '获取具备权限的 AccessToken', subTitle: '将编程访问账号的 AK、SK 以及权限 scope 发送到 {{$localeConfig.brandName}} 进行认证授权' },
    ],
}
---

<IntegrationDetail backLink="/guides/federation/oidc.html"/>
