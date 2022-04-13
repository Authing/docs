---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 CAS 2.0 认证',
  bannerTitle: '使用 CAS 2.0 认证',
  steps:
    [
      { title: '启用并配置 CAS 身份源', subTitle: '在 {{$localeConfig.brandName}} 控制台中启用并配置 CAS 身份源' },
      { title: '发起 CAS 2.0 认证', subTitle: '引导用户点击登录链接，发起 CAS 2.0 认证' },
      { title: '跳转到 {{$localeConfig.brandName}} 进行认证', subTitle: '用户在 {{$localeConfig.brandName}} 提供的登录页面进行认证' },
      { title: '验证 Ticket 合法性', subTitle: '在回调地址处验证 Ticket 合法性并获取用户身份信息' },
    ],
}
---

<IntegrationDetail/>
