const sidebar = require("./sidebar");
const path = require("path");
const webpack = require("webpack");
const { basePath } = require("vuepress-theme-authing/env");
const baseConf = require("vuepress-theme-authing/baseConf");

module.exports = {
  ...baseConf,
  theme: "authing",
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
      githubFeedback: "在 Github 上反馈",
      githubEdit: "编辑",
      brandName: sidebar.BRAND_NAME_ZH_CN,
      brandNameLowerCase: sidebar.BRAND_NAME_ZH_CN_LOWER_CASE,
      back: "回到列表",
      next: "下一步",
      previous: "上一步",
      lastStep: "我知道了，返回列表",
    },
  },
  base: basePath,
  themeConfig: {
    logo: "https://files.authing.co/authing-console/authing-logo-new-20210924.svg",
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
        search: "搜索标题",
        searchInDoc: "在文档中搜索",
        oldVersion: "旧版",
        nav: [
          { text: "快速开始", link: "/quickstarts/" },
          { text: "概念", link: "/concepts/" },
          { text: "使用指南", link: "/guides/" },
          { text: "开发集成", link: "/reference/" },
          {
            text: "应用集成",
            link: "/integration/",
          },
          {
            text: "加入 APN",
            link: "/apn/",
          },
          {
            link: "/reference-new/",
            text: "开发集成",
            hidden: true,
          },
          {
            link: "/tenant/",
            text: "多租户（内测版）",
            hidden: true,
          },
          {
            link: "/console-using/",
            text: "控制台文档",
            hidden: true,
          },
        ],
        sidebar: sidebar.zhCnNavBar,
        feedback: {
          title: "评价此篇文档",
          useful: "有帮助",
          useless: "无帮助",
          editTip: "有建议或错误，可直接",
          editLink: "有建议或错误，可直接在 Github 上反馈",
          help: `如果遇到其他问题，立即 <a href="https://forum.authing.cn/" target="_blank">联系我们</a>`,
          successTip: `提交成功，感谢您的反馈`,
          uselessConfig: {
            title: "您是否遇到以下问题",
            reasons: [
              {
                value: "内容错误",
                label: "内容错误",
              },
              {
                value: "缺少代码/图片示例",
                label: "缺少代码/图片示例",
              },
              {
                value: "更新不及时",
                label: "更新不及时",
              },
              {
                value: "太简单/步骤待完善",
                label: "太简单/步骤待完善",
              },
              {
                value: "链接错误",
                label: "链接错误",
              },
              {
                value: "其他",
                label: "其他",
              },
            ],
            customReasonPlaceholder:
              "请详细描述在文档使用中遇到的问题或改进建议（选填）",
          },
        },
        footer: {
          sections: [
            {
              title: "用户身份管理",
              links: [
                {
                  text: "集成第三方登录",
                  link: "/guides/connections/",
                },
                {
                  text: "手机号闪验",
                  link: "https://authing.cn/verify",
                },
                {
                  text: "通用登录表单组件",
                  link: "/reference/ui-components/",
                },
                {
                  text: "自定义认证流程",
                  link: "/guides/pipeline/",
                },
              ],
            },
            {
              title: "企业内部管理",
              links: [
                {
                  text: "单点登录",
                  link: "/guides/authentication/sso/",
                },
                {
                  text: "多因素认证",
                  link: "/guides/authentication/mfa/",
                },
                {
                  text: "权限管理",
                  link: "/guides/access-control/",
                },
              ],
            },
            {
              title: "开发者",
              links: [
                {
                  text: "开发文档",
                  link: "/reference/",
                },
                {
                  text: "框架集成",
                  link: "/reference/frameworks",
                },
                {
                  text: "博客",
                  link: "https://authing.cn/blog",
                },
                {
                  text: "GitHub",
                  link: "https://github.com/authing",
                },
                {
                  text: "社区用户中心",
                  link: "https://forum.authing.cn/",
                },
              ],
            },
          ],
          socials: [
            {
              icon: "authing-github",
              link: "https://github.com/Authing",
              title: "GitHub",
            },
            {
              icon: "authing-gitter",
              link: "https://forum.authing.cn/",
              title: "Forum",
            },
            {
              icon: "authing-zhihu",
              link: "https://www.zhihu.com/org/authing",
              title: "知乎",
            },
          ],
          // serviceStatus: "服务状态",
          contactPhone: "400 888 2106",
          contactEmail: "sales@authing.cn",
          contactAddress: "北京市朝阳区北辰世纪中心 B 座 16 层（总）",
          contactChenduAddress:
            "成都市高新区天府五街 200 号 1 号楼 B 区 4 楼 406 室（分）",
          icp: "京ICP备19051205号",
          beian: "京公网安备 11010802035968号",
          companyName: "© 北京蒸汽记忆科技有限公司",
        },
      },
    },
  },
  configureWebpack: (config, isServer) => {
    return {
      output: {
        publicPath: process.env.PUBLIC_URL || basePath,
      },
      resolve: {
        alias: {
          "@imagesZhCn": path.resolve(__dirname, "../images"),
          "@imagesEnUs": path.resolve(__dirname, "../en/images"),
        },
      },
      plugins: [
        process.env.npm_lifecycle_event !== "docs:dev" &&
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 50,
          }),
      ].filter(Boolean),
    };
  },
};
