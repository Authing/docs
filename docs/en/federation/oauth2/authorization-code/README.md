---
{
  noSidebar: true,
  noToc: true,
  noFeedback: true,
  fullWidthPage: true,
  title: 'Use OAuth2.0 Authorization Code Mode',
  bannerTitle: 'Use OAuth2.0 Authorization Code Mode',
  steps:
    [
      {
        title: 'Splicing The Login Authorization Link',
        subTitle: 'Splicing the login authorization link and guide the user to click',
      },
      {
        title: 'Redirect To {{$localeConfig.brandName}} For Authentication',
        subTitle: 'Guide the user to click the login link and redirect to {{$localeConfig.brandName}} for authentication',
      },
      {
        title: 'Handle Callback',
        subTitle: 'Use the authorization code in the backend to exchange the AccessToken',
      },
      {
        title: 'Complete Authentication',
        subTitle: "The server authenticates the user's identity and executes the subsequent process",
      },
    ],
}
---

<IntegrationDetail/>
