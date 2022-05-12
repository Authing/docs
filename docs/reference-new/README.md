---
{
  title: "开发集成",
  reference: true,
  noSidebar: true,
  subtitle: "Authing  提供 RESTful 形式的 HTTP API，以及十余种不同语言和框架的 SDK。你可以基于这些 API & SDK 资源，灵活的组合出你需要的认证流程。",
  info: "新版 SDK 已于 2022 年 4 月 26 日正式上线，若你仍希望使用旧版 SDK，",
  link: "/v2/reference/",
  linkLabel: "可点击此处跳转",
  # 编辑类型数据
  data: [
      # 大类别
      {
        title: "登录组件（Guard）",
        desc: "5分钟为你的应用接入 Authing 提供的认证服务",
        # 链接元素
        list: [
            {
              # 图标目录位于：docs/.vuepress/theme/assets/images/reference/
              # 保存 svg 格式
              title: "Javascript",
              icon: "JavaScript",
              github: "https://github.com/Authing/authing-ui-components",
              doc: "https://docs.authing.cn/v2/reference/guard/native-javascript.html",
            },
            {
              #
              title: "React",
              icon: "React-Native",
              github: "https://github.com/Authing/authing-ui-components",
              doc: "https://docs.authing.cn/v2/reference/guard/react.html",
            },
            {
              #
              title: "Vue",
              icon: "Vue",
              github: "https://github.com/Authing/authing-ui-components",
              doc: "https://docs.authing.cn/v2/reference/guard/vue.html",
            },
            {
              #
              title: "Angular",
              icon: "Angular",
              github: "https://github.com/Authing/authing-ui-components",
              doc: "https://docs.authing.cn/v2/reference/guard/angular.html",
            },
          ],
      },
      {
        title: "移动、客户端应用",
        desc: "在移动 / 客户端应用中快速接入认证服务",
        list: [
            {
              #
              title: "iOS Swift",
              icon: "iOS",
              github: "https://github.com/Authing/guard-ios",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-ios/",
            },
            {
              #
              title: "Android",
              icon: "Android",
              github: "https://github.com/Authing/guard-android",
              doc: "/v2/android/",
            },
            {
              #
              title: "Flutter",
              icon: "Flutter",
              github: "https://github.com/Authing/sdk-flutter",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-flutter.html",
            },
            {
              #
              title: "React Native",
              icon: "React-Native",
              github: "https://github.com/Authing/authing-rn-sdk",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-react-native.html",
            },
            {
              #
              title: "C#",
              icon: "csharp",
              github: "https://github.com/Authing/authing-api-client-net",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-csharp/",
            },
          ],
      },
      {
        title: "标准 Web 应用",
        desc: "在标准 Web 应用中快速接入 Authing 能力",
        list: [
            {
              #
              title: "Javascript",
              icon: "JavaScript",
              github: "https://github.com/Authing/authing.js",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "Python",
              icon: "Python",
              github: "https://github.com/Authing/authing-py-sdk",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "C#",
              icon: "csharp",
              github: "https://github.com/Authing/authing-api-client-net",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "Node.js",
              icon: "Nodejs",
              github: "https://github.com/Authing/authing.js",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "Ruby",
              icon: "Ruby",
              github: "https://github.com/Authing/authing-ruby",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "Java",
              icon: "Java",
              github: "https://github.com/Authing/authing-java-sdk",
              doc: "https://authing-open-api.readme.io",
            },
            {
              #
              title: "Golang",
              icon: "Go",
              github: "https://github.com/Authing/authing-go-sdk",
              doc: "https://authing-open-api.readme.io",
            },
          ],
      },

      {
        #
        title: "框架集成",
        # desc: "更新文案",
        list: [
            {
              #
              title: "Spring CAS",
              doc: "https://docs.authing.cn/v2/frameworks/spring-security-cas/",
            },
            {
              #
              title: "Spring OAuth",
              doc: "https://docs.authing.cn/v2/frameworks/spring-security-oauth/",
            },
            {
              #
              title: "Spring OIDC",
              doc: "https://docs.authing.cn/v2/frameworks/spring-security-oidc/",
            },
            {
              #
              title: "Express OIDC",
              doc: "https://docs.authing.cn/v2/frameworks/express-oidc-client/",
            },
            {
              #
              title: "Express Passport",
              doc: "https://docs.authing.cn/v2/frameworks/express-passport-openidconnect/",
            },
          ],
      },
      {
        #
        title: "API 接口",
        desc: "提供 RESTful 形式的 HTTP API，帮助快速获取认证能力",
        list: [
            {
              #
              title: "API",
              icon: "Swagger",
              api: "https://core.authing.cn/openapi/",
            },
          ],
      },
      {
        #
        title: "其他",
        desc: " ",
        list: [
            {
              #
              title: "单点登录（SSO）",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-sso.html",
            },
            {
              #
              title: "微信小程序",
              github: "https://github.com/authing/authing-wxapp-sdk",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-wxapp.html",
            },
            {
              #
              title: "微信网页登录",
              doc: "https://docs.authing.cn/v2/reference/sdk-for-wxmp.html",
            },
            {
              #
              title: "Radius",
              doc: "https://docs.authing.cn/v2/reference/radius/",
            },
            {
              #
              title: "错误代码",
              doc: "https://docs.authing.cn/v2/reference/error-code.html
                ",
            },
          ],
      },
    ],
}
---
