const sidebar = require("./sidebar");
const plugins = require("./plugins");
const { basePath, config } = require("./env");
const path = require("path");
const webpack = require("webpack");

const gaEnabled = config && config.ga && config.ga.enabled;
const gTrackingId = config && config.ga && config.ga.gTrackingId;

const head = [
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "https://authing.cn/favicon.ico"
    }
  ],
  [
    "script",
    {},
    `!function(){var e=window.Cohere=window.Cohere||[];if(e.invoked)console.error("Tried to load Cohere twice");else{e.invoked=!0,e.snippet="0.2",e.methods=["init","identify","stop","showCode","getSessionUrl","makeCall","addCallStatusListener","removeCallStatusListener","widget","addSessionUrlListener","removeSessionUrlListener",],e.methods.forEach(function(o){e[o]=function(){var t=Array.prototype.slice.call(arguments);t.unshift(o),e.push(t)}});var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://static.cohere.so/main.js",o.crossOrigin="anonymous";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(o,t)}}();`
  ],
  [
    "script",
    {},
    `if(window.location.hostname === "docs.authing.cn"){window.Cohere.init("PUkf845sOZgDd59V6aTJCsuJ");}`
  ]
];

if (gaEnabled) {
  head.push([
    "script",
    {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${gTrackingId}`
    }
  ]);
  head.push([
    "script",
    {},
    `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${gTrackingId}');`
  ]);
}

module.exports = {
  base: basePath,
  shouldPreload: () => false,
  shouldPrefetch: () => false,
  title: "文档",
  description: "Authing 文档",
  plugins,
  feedbackUrl: `https://open.feishu.cn/open-apis/bot/v2/hook/f5e7517d-07cb-4519-ab6c-577ad8653ca2`,
  markdown: {
    anchor: {
      permalinkSymbol: "¶"
    },
    toc: {
      includeLevel: [2, 3, 4, 5]
    },
    extractHeaders: ["h2", "h3", "h4", "h5"],
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-include"), "docs");
    }
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "zh-CN", // this will be set as the lang attribute on <html>
      title: "Authing 文档",
      description: "Authing 文档",
      navbarTitle: "文档",
      relatedDocText: "相关文档",
      devDocText: "开发文档",
      apiDocText: "API 文档",
      githubFeedback: "反馈",
      githubEdit: "编辑本文",
      brandName: sidebar.BRAND_NAME_ZH_CN,
      brandNameLowerCase: sidebar.BRAND_NAME_ZH_CN_LOWER_CASE
    },
    "/en/": {
      lang: "en-US",
      title: "Authing Docs",
      description: "Authing Docs",
      navbarTitle: "Documents",
      relatedDocText: "Related documents",
      devDocText: "Development documents",
      apiDocText: "API documents",
      githubFeedback: "Feedback",
      githubEdit: "Edit",
      brandName: sidebar.BRAND_NAME_EN_US,
      brandNameLowerCase: sidebar.BRAND_NAME_EN_US_LOWER_CASE
    }
  },
  head,
  themeConfig: {
    logo:
      "https://files.authing.co/authing-console/authing-logo-new-20210924.svg",
    officeSiteDomain: "authing.cn",
    officeSiteUrl: "https://authing.cn",
    consoleDomain: "https://console.authing.cn",
    sampleAppDomain: "sample-sso.authing.cn",
    apiDomain: "https://core.authing.cn",
    oldDocUrl: "https://old-docs.authing.cn",
    smoothScroll: true,
    activeHeaderLinks: false,
    lastUpdated: "Last Updated",
    sidebarDepth: 0,
    locales: {
      "/": {
        selectText: "中文 / EN",
        label: "简体中文",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "更新时间",
        prevDoc: "上一篇",
        nextDoc: "下一篇",
        submitImmediate: "立即提交",
        knowMore: "了解更多",
        company: "公司",
        sdkAccess: "SDK 接入",
        searchInDoc: "在文档中搜索",
        oldVersion: "旧版",
        nav: [
          // { text: "快速开始", link: "/quickstarts/" },
          { text: "概念", link: "/concepts/" },
          { text: "使用指南", link: "/guides/" },
          { text: "开发集成", link: "/reference-new/" },
          {
            text: "应用集成",
            link: "/integration/"
          },
          // {
          //   text: "加入 APN",
          //   link: "/apn/"
          // },
          {
            link: "/tenant/",
            text: "多租户（内测版）",
            hidden: true
          }
        ],
        sidebar: sidebar.zhCnNavBar,
        feedback: {
          title: "评价此篇文档",
          useful: "有帮助",
          useless: "无帮助",
          help: `如果遇到其他问题，立即 <a href="https://forum.authing.cn/" target="_blank">联系我们</a>`,
          successTip: `提交成功，感谢您的反馈`,
          uselessConfig: {
            title: "您是否遇到以下问题",
            reasons: [
              {
                value: "内容错误",
                label: "内容错误"
              },
              {
                value: "缺少代码/图片示例",
                label: "缺少代码/图片示例"
              },
              {
                value: "更新不及时",
                label: "更新不及时"
              },
              {
                value: "太简单/步骤待完善",
                label: "太简单/步骤待完善"
              },
              {
                value: "链接错误",
                label: "链接错误"
              },
              {
                value: "其他",
                label: "其他"
              }
            ],
            customReasonPlaceholder:
              "请详细描述在文档使用中遇到的问题或改进建议（选填）"
          }
        },
        footer: {
          sections: [
            {
              title: "用户身份管理",
              links: [
                {
                  text: "集成第三方登录",
                  link: "/guides/connections/"
                },
                {
                  text: "手机号闪验",
                  link: "https://authing.cn/verify"
                },
                {
                  text: "通用登录表单组件",
                  link: "/reference/ui-components/"
                },
                {
                  text: "自定义认证流程",
                  link: "/guides/pipeline/"
                }
              ]
            },
            {
              title: "企业内部管理",
              links: [
                {
                  text: "单点登录",
                  link: "/guides/authentication/sso/"
                },
                {
                  text: "多因素认证",
                  link: "/guides/authentication/mfa/"
                },
                {
                  text: "权限管理",
                  link: "/guides/access-control/"
                }
              ]
            },
            {
              title: "开发者",
              links: [
                {
                  text: "开发文档",
                  link: "/reference/"
                },
                {
                  text: "框架集成",
                  link: "/reference/frameworks"
                },
                {
                  text: "博客",
                  link: "https://authing.cn/blog"
                },
                {
                  text: "GitHub",
                  link: "https://github.com/authing"
                },
                {
                  text: "社区用户中心",
                  link: "https://forum.authing.cn/"
                }
              ]
            }
          ],
          socials: [
            {
              icon: "authing-github",
              link: "https://github.com/Authing",
              title: "GitHub"
            },
            {
              icon: "authing-gitter",
              link: "https://forum.authing.cn/",
              title: "Forum"
            },
            {
              icon: "authing-zhihu",
              link: "https://www.zhihu.com/org/authing",
              title: "知乎"
            }
          ],
          // serviceStatus: "服务状态",
          contactPhone: "400 888 2106",
          contactEmail: "sales@authing.cn",
          contactAddress: "北京市朝阳区北辰世纪中心 B 座 16 层（总）",
          contactChenduAddress:
            "成都市高新区天府五街 200 号 1 号楼 B 区 4 楼 406 室（分）",
          icp: "京ICP备19051205号",
          beian: "京公网安备 11010802035968号",
          companyName: "© 北京蒸汽记忆科技有限公司"
        }
      },
      "/en/": {
        // text for the language dropdown
        selectText: "中文 / EN",
        // label for this locale in the language dropdown
        label: "English",
        // Aria Label for locale in the dropdown
        ariaLabel: "中文 / EN",
        // text for the edit-on-github link
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Update Time",
        prevDoc: "Prev",
        nextDoc: "Next",
        submitImmediate: "Submit",
        knowMore: "Know More",
        company: "Company",
        sdkAccess: "SDK Access",
        searchInDoc: "Search in Docs",
        oldVersion: "Old Version",
        nav: [
          { text: "Concept", link: "/en/concepts/" },
          { text: "Guides", link: "/en/guides/" },
          { text: "Development Integration", link: "/en/reference/" },
          {
            text: "Application integration",
            link: "/en/integration/"
          }
        ],
        sidebar: sidebar.enUsNavBar,
        feedback: {
          title: "Does this article solve your problem?",
          useful: "Useful",
          useless: "Useless",
          help: `If you encounter other problems, you can contact us at <a href="https://forum.authing.cn/" target="_blank">authing-chat/community</a>.`,
          successTip: `Submitted successfully! Thank you very much for your feedback, we will continue to work hard to do better!`,
          uselessConfig: {
            title: "Does this article solve your problem?",
            reasons: [
              {
                value: "内容错误",
                label: "Content error"
              },
              {
                value: "缺少代码/图片示例",
                label: "Missing code/image example"
              },
              {
                value: "更新不及时",
                label: "Update is not timely"
              },
              {
                value: "太简单/步骤待完善",
                label: "Too simple/steps to be perfected"
              },
              {
                value: "链接错误",
                label: "Link error"
              },
              {
                value: "其他",
                label: "Other"
              }
            ],
            customReasonPlaceholder:
              "Please describe in detail the problems encountered in the use of the document or suggestions for improvement (optional)"
          }
        },
        footer: {
          sections: [
            {
              title: "User identity management",
              links: [
                {
                  text: "Integrated third-party login",
                  link: "/en/guides/connections/"
                },
                {
                  text: "Mobile phone number flash check",
                  link: "https://authing.cn/verify"
                },
                {
                  text: "Universal login form component",
                  link: "/en/reference/ui-components/"
                },
                {
                  text: "Custom authentication process",
                  link: "/en/guides/pipeline/"
                }
              ]
            },
            {
              title: "Enterprise internal management",
              links: [
                {
                  text: "Single Sign On",
                  link: "/en/guides/authentication/sso/"
                },
                {
                  text: "Multi-factor Authentication",
                  link: "/en/guides/authentication/mfa/"
                },
                {
                  text: "Authority Management",
                  link: "/en/guides/access-control/"
                }
              ]
            },
            {
              title: "Developers",
              links: [
                {
                  text: "Development Document",
                  link: "/en/reference/"
                },
                {
                  text: "Framework Integration",
                  link: "/en/reference/frameworks"
                },
                {
                  text: "Blog",
                  link: "https://authing.cn/blog"
                },
                {
                  text: "GitHub",
                  link: "https://github.com/authing"
                },
                {
                  text: "Community User Center",
                  link: "https://forum.authing.cn/"
                }
              ]
            }
          ],
          socials: [
            {
              icon: "authing-github",
              link: "https://github.com/Authing",
              title: "GitHub"
            },
            {
              icon: "authing-gitter",
              link: "https://forum.authing.cn/",
              title: "Forum"
            },
            {
              icon: "authing-zhihu",
              link: "https://www.zhihu.com/org/authing",
              title: "ZhiHu"
            }
          ],
          // serviceStatus: "Service Status",
          contactPhone: "400 888 2106",
          contactEmail: "sales@authing.cn",
          contactAddress:
            "16 / F, Block B, NORTH STAR CENTURY CENTER, Beijing(Total)",
          contactChenduAddress:
            "room 406, 4th floor, zone B, building 1, No. 200, Tianfu Fifth Street, Chengdu(branch)",
          icp: "Beijing ICP No.19051205-1",
          companyName: "© Beijing Steamory Technology Co."
        }
      }
    }
  },
  configureWebpack: (config, isServer) => {
    return {
      // optimization: {
      //   splitChunks: isServer
      //     ? undefined
      //     : {
      //         minSize: 5000000,
      //         maxSize: 8000000,
      //         maxInitialRequests: 5,
      //       },
      // },
      output: {
        publicPath: process.env.PUBLIC_URL || basePath
      },
      resolve: {
        alias: {
          "@imagesZhCn": path.resolve(__dirname, "../images"),
          "@imagesEnUs": path.resolve(__dirname, "../en/images")
        }
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 50
        })
        // new webpack.optimize.MinChunkSizePlugin({
        //   minChunkSize: 500000, // Minimum number of characters
        // }),
      ]
    };
  },
  extraWatchFiles: [
    ".vuepress/enhanceApp.js",
    ".vuepress/env.js",
    ".vuepress/sidebar.js",
    "README.md"
  ]
};
