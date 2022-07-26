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
  # 在目录重构时重点关注 https://docs.authing.cn/v2/reference/ 开头的旧文档链接
  # 修改完成后可以用相对路径， 如 /v2/reference/
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
              doc: "https://docs.authing.cn/v2/reference/guard/v2/native-javascript.html",
            },
            {
              #
              title: "React",
              icon: "React-Native",
              github: "https://github.com/Authing/authing-ui-components",
              doc: "https://docs.authing.cn/v2/reference/guard/v2/react.html",
            },
          ],
      },
      {
        title: "单页应用",
        desc: "在浏览器运行的 Web 应用中快速接入认证服务并实现单点登录",
        list: [
            {
              #
              title: "Javascript",
              icon: "JavaScript",
              doc: "https://docs.authing.cn/v2/reference/guard/v2/native-javascript.html",
            },
            {
              #
              title: "React",
              icon: "React-Native",
              doc: "./single-page-application/react.html",
            },
            {
              #
              title: "Vue",
              icon: "Vue",
              doc: "./single-page-application/vue.html",
            },
            {
              #
              title: "Angular",
              icon: "Angular",
              doc: "./single-page-application/angular.html",
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
              doc: "./mobile/sdk-for-ios/",
            },
            {
              #
              title: "Android",
              icon: "Android",
              github: "https://github.com/Authing/guard-android",
              doc: "./mobile/sdk-for-android/",
            },
            {
              #
              title: "Flutter",
              icon: "Flutter",
              github: "https://github.com/Authing/sdk-flutter",
              doc: "./mobile/sdk-for-flutter/",
            },
            {
              #
              title: "React Native",
              icon: "React-Native",
              github: "https://github.com/Authing/authing-rn-sdk",
              doc: "./mobile/sdk-for-react-native.html",
            },
            {
              #
              title: "C#",
              icon: "csharp",
              github: "https://github.com/Authing/authing-api-client-net",
              doc: "./mobile/sdk-for-csharp/",
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
              doc: "./sdk-v5/node/install.html",
            },
            {
              #
              title: "Python",
              icon: "Python",
              github: "https://github.com/Authing/authing-py-sdk",
              doc: "./sdk-v5/python/install.html",
            },
            {
              #
              title: "C#",
              icon: "csharp",
              github: "https://github.com/Authing/authing-api-client-net",
              doc: "./sdk-v5/csharp/install.html",
            },
            {
              #
              title: "Node.js",
              icon: "Nodejs",
              github: "https://github.com/Authing/authing.js",
              doc: "./sdk-v5/node/install.html",
            },
            {
              #
              title: "Ruby",
              icon: "Ruby",
              github: "https://github.com/Authing/authing-ruby",
              doc: "./web/sdk-for-ruby.html",
            },
            {
              #
              title: "Java",
              icon: "Java",
              github: "https://github.com/Authing/authing-java-sdk",
              doc: "./sdk-v5/java/install.html",
            },
            {
              #
              title: "Golang",
              icon: "Go",
              github: "https://github.com/Authing/authing-go-sdk",
              doc: "./sdk-v5/go/install.html",
            },
            {
              #
              title: "PHP",
              icon: "php",
              github: "https://github.com/Authing/authing-php-sdk",
              doc: "./sdk-v5/php/install.html",
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
              icon: "Spring",
              title: "Spring CAS",
              doc: "./frameworks/spring-security-cas/",
            },
            {
              #
              icon: "Spring",
              title: "Spring OAuth",
              doc: "./frameworks/spring-security-oauth/",
            },
            {
              #
              icon: "Spring",
              title: "Spring OIDC",
              doc: "./frameworks/spring-security-oidc/",
            },
            {
              #
              icon: "Express",
              title: "Express OIDC",
              doc: "./frameworks/express-oidc-client/",
            },
            {
              #
              icon: "Express",
              title: "Express Passport",
              doc: "./frameworks/express-passport-openidconnect/",
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
              icon: "SDK",
              api: "https://core.authing.cn/openapi/",
            },
          ],
      },
      #     {
      #
      #       title: "SDK 库",
      #       desc: "丰富的 SDK 帮助你快速接入 Authing 能力",
      #       list: [
      #           {
      #
      #            title: "SDK",
      #            icon: "SDK",
      #            doc: "https://authing-open-api.readme.io/reference",
      #          },
      #        ],
      #    },
      {
        #
        title: "其他",
        desc: " ",
        list: [
            {
              #
              title: "单点登录（SSO）",
              doc: "./other/sdk-for-sso.html",
            },
            {
              #
              title: "微信小程序",
              github: "https://github.com/authing/authing-wxapp-sdk",
              doc: "./other/sdk-for-wxapp.html",
            },
            {
              #
              title: "微信网页登录",
              doc: "./other/sdk-for-wxmp.html",
            },
            {
              #
              title: "Radius",
              doc: "./other/radius/",
            },
            {
              #
              title: "错误代码",
              doc: "./other/error-code.html
                ",
            },
          ],
      },
    ],
}
---
