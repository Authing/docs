---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 OIDC 隐式模式',
  bannerTitle: '使用 OIDC 隐式模式',
  steps:
    [
      { title: '拼接登录授权链接', subTitle: '拼接登录授权链接并引导用户点击' },
      { title: '跳转到 {{$localeConfig.brandName}} 进行认证', subTitle: '引导用户点击登录链接，跳转到 {{$localeConfig.brandName}} 进行认证' },
      { title: '处理回调', subTitle: '在前端直接获取 AccessToken 与 IdToken' },
      { title: '完成认证', subTitle: '存储 AccessToken 和 IdToken 以便后续使用' },
    ],
}
---

<IntegrationDetail backLink="/guides/federation/oidc.html"/>
