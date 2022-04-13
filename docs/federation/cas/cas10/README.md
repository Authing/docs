---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: '使用 CAS 1.0 认证',
  bannerTitle: '使用 CAS 1.0 认证',
  steps:
    [
      { title: '拼接认证链接', subTitle: '拼接认证链接并引导用户点击' },
      { title: '跳转到 {{$localeConfig.brandName}} 进行认证', subTitle: '引导用户点击登录链接，跳转到 {{$localeConfig.brandName}} 进行认证' },
      { title: '处理回调', subTitle: '在后端验证 Ticket 合法性' },
      { title: '完成认证', subTitle: '服务端认证用户身份，执行后续流程' },
    ],
}
---

<IntegrationDetail/>
