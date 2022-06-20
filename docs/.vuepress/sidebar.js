const BRAND_NAME_ZH_CN = "Authing";
const BRAND_NAME_ZH_CN_LOWER_CASE = "authing";
const BRAND_NAME_EN_US = "Authing";
const BRAND_NAME_EN_US_LOWER_CASE = "authing";

const DATABASE_CONNECTION_MENU = {
  title: "自定义数据库",
  path: "/guides/database-connection/overview",
  children: [
    {
      title: "配置数据库连接和编写脚本",
      path: "/guides/database-connection/configuration/"
    },
    {
      title: `惰性迁移用户到 ${BRAND_NAME_ZH_CN}`,
      path: "/guides/database-connection/lazy-migration"
    },
    {
      title: "完全使用自定义数据库保存用户数据",
      path: "/guides/database-connection/custom-user-store.md"
    },
    {
      title: "最佳实践",
      path: "/guides/database-connection/best-practices.md"
    }
  ]
};

const DATABASE_CONNECTION_MENU_EN = {
  title: "Custom database",
  path: "/guides/database-connection/overview",
  children: [
    {
      title: "Configure database connection and scripting",
      path: "/guides/database-connection/configuration/"
    },
    {
      title: `Lazy migration of users to ${BRAND_NAME_EN_US}`,
      path: "/guides/database-connection/lazy-migration"
    },
    {
      title: "Fully use a custom database to save user data",
      path: "/guides/database-connection/custom-user-store.md"
    },
    {
      title: "Best Practice",
      path: "/guides/database-connection/best-practices.md"
    }
  ]
};

/**
 * 中文菜单
 */
const zhCnNavBar = {
  "/quickstarts/": [
    {
      title: "单页应用",
      path: "/quickstarts/spa/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "React",
          path: "/quickstarts/spa/react"
        }
      ]
    },
    {
      title: "标准 Web 应用",
      path: "/quickstarts/webApp/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "Node.js Express Web App",
          path: "/quickstarts/webApp/nodeJsExpress"
        }
      ]
    },
    {
      title: "后端 / API 服务",
      path: "/quickstarts/apiServer/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "Node.js Express API",
          path: "/quickstarts/apiServer/nodeJsExpress/"
        }
      ]
    }
  ],
  "/guides/": [
    {
      title: "快速开始",
      children: [
        {
          title: "认证你的第一个用户",
          path: "/guides/basics/authenticate-first-user/",
          children: [
            {
              title: `使用托管登录页完成认证`,
              path:
                "/guides/basics/authenticate-first-user/use-hosted-login-page"
            },
            {
              title: "使用内嵌登录组件完成认证",
              path:
                "/guides/basics/authenticate-first-user/use-embeded-login-component/"
            },
            {
              title: "使用 API & SDK 完成认证",
              path: "/guides/basics/authenticate-first-user/use-api-sdk/"
            },
            {
              title: "验证用户身份凭证（token）",
              path:
                "/guides/basics/authenticate-first-user/how-to-validate-user-token"
            },
            {
              title: `对用户进行权限管理`,
              path:
                "/guides/basics/authenticate-first-user/how-to-implement-access-control"
            },
            {
              title: "实现退出登录",
              path: "/guides/basics/authenticate-first-user/how-to-logout-user"
            },
            {
              title: "接下来你可能需要",
              path: "/guides/basics/authenticate-first-user/what-to-do-next"
            }
          ]
        },
        {
          title: "不同类型应用的接入方式",
          children: [
            {
              title: `在传统  Web App 中集成 ${BRAND_NAME_ZH_CN}`,
              path:
                "/guides/basics/platform-guide/integrate-with-regular-web-app"
            },
            {
              title: `在单页应用（SPA）中集成 ${BRAND_NAME_ZH_CN}`,
              path: "/guides/basics/platform-guide/integrate-with-spa"
            },
            {
              title: `在移动端（iOS、Andriod）中集成 ${BRAND_NAME_ZH_CN}`,
              path: "/guides/basics/platform-guide/integrate-with-mobile-app"
            }
            // {
            //   title: `在后端 API 服务中接入 ${BRAND_NAME_ZH_CN}`,
            //   path:
            //     "/guides/basics/platform-guide/integrate-with-backend-app",
            // },
          ]
        },
        {
          title: "控制台概览",
          path: "/guides/basics/console/"
        }
      ]
    },
    {
      title: "对用户进行认证",
      path: "/guides/authentication/",
      children: [
        {
          title: "使用账号密码认证",
          path: "/guides/authentication/basic/password/"
        },
        {
          title: "使用短信验证码认证",
          path: "/guides/authentication/basic/sms/"
        },
        {
          title: "使用社会化登录认证",
          path: "/guides/authentication/social/"
        },
        // {
        //   title: "在移动端使用社会化登录认证",
        //   path: "/guides/authentication/social/mobile/",
        // },
        {
          title: "使用扫码登录认证",
          children: [
            {
              title: "使用自建 App 扫码登录网站",
              path: "/guides/authentication/qrcode/use-self-build-app/",
              children: [
                {
                  title: "完整接口列表",
                  path:
                    "/guides/authentication/qrcode/use-self-build-app/full-api-list"
                },
                {
                  title: "自定义配置项",
                  path:
                    "/guides/authentication/qrcode/use-self-build-app/customize-settings"
                }
              ]
            },
            {
              title: "使用小程序扫码登录网站",
              path: "/guides/authentication/qrcode/use-wechat-miniprogram/"
            }
          ]
        },
        {
          title: "在小程序中进行认证",
          path: "/guides/authentication/wechat-mini-program/"
        },
        {
          title: "手机号一键登录",
          path: "/guides/oneauth/"
        },
        {
          title: "实现单点登录（SSO）",
          path: "/guides/authentication/sso/"
        },
        {
          title: "在移动端实现单点登录",
          path: "/guides/authentication/mobile-sso/"
        },
        {
          title: "多因素认证（MFA）",
          path: "/guides/authentication/mfa/",
          children: [
            {
              title: "基于时间戳算法的一次性密码（TOTP）的 MFA",
              path: "/guides/authentication/mfa/totp"
            },
            {
              title: "基于短信验证码的 MFA",
              path: "/guides/authentication/mfa/sms"
            },
            {
              title: "基于邮件验证码的 MFA",
              path: "/guides/authentication/mfa/email-code"
            },
            {
              title: "通过 SDK 接入 MFA",
              path: "/guides/authentication/mfa/mfa-sdk"
            }
          ]
        },
        {
          title: "对认证流程进行扩展",
          children: [
            {
              title: "添加用户自定义字段",
              path: "/guides/authentication/extensibility/user-defined-field"
            },
            {
              title: "添加部门自定义字段",
              path: "/guides/authentication/extensibility/department-extend"
            },
            {
              title: "IdToken 添加自定义字段",
              path: "/guides/authentication/extensibility/customize-id-token"
            },
            {
              title: "使用自定义数据库对用户进行认证",
              path: "/guides/authentication/extensibility/database-connection"
            },
            {
              title: "使用 Pipeline 对认证流程进行扩展",
              path: "/guides/authentication/extensibility/pipeline"
            },
            {
              title: "使用 Webhook 监听认证事件",
              path: "/guides/authentication/extensibility/webhook"
            }
          ]
        },
        {
          title: "对登录框进行个性化配置",
          path: "/guides/authentication/branding/"
        }
      ]
    },
    {
      title: "对用户进行权限管理",
      path: "/guides/access-control/",
      children: [
        {
          title: "选择合适的权限模型",
          path: "/guides/access-control/choose-the-right-access-control-model"
        },
        {
          title: `集成 RBAC 权限模型到你的应用系统`,
          path: "/guides/access-control/rbac"
        },
        {
          title: `集成 ABAC 权限模型到你的应用系统`,
          path: "/guides/access-control/abac"
        },
        {
          title: `使用权限分组管理权限资源`,
          path: "/guides/access-control/resource-group"
        },
        {
          title: `管理资源权限`,
          path: "/guides/access-control/resource-acl"
        }
      ]
    },
    {
      title: "授权",
      path: "/guides/authorization/",
      children: [
        {
          title: "用户许可的资源授权",
          path: "/guides/authorization/user-consent-authz"
        },
        {
          title: "机器间（M2M）授权",
          path: "/guides/authorization/m2m-authz"
        }
      ]
    },
    {
      title: "管理用户账号",
      path: "/guides/user/",
      children: [
        {
          title: "用户字段释义",
          path: "/guides/user/user-profile"
        },
        {
          title: "管理员创建账号",
          path: "/guides/user/create-user/"
        },
        // {
        //   title: "账号生命周期管理",
        //   path: "/guides/user/life-cycle-management",
        // },
        {
          title: "管理用户账号",
          path: "/guides/user/manage-profile"
        },
        // {
        //   title: '给用户添加角色、分配权限',
        //   path: '/guides/user/role-and-permission'
        // },
        {
          title: "绑定账号",
          path: "/guides/user/bind-social-account"
        },
        {
          title: "管理用户的自定义数据",
          path: "/guides/user/user-defined-field/"
        },
        {
          title: "查看用户的登录历史记录",
          path: "/guides/user/login-history"
        },
        {
          title: "查看用户的地理位置",
          path: "/guides/user/geo"
        },
        {
          title: "增强账号的安全性",
          path: "/guides/user/security"
        },
        {
          title: "管理用户的登录态",
          path: "/guides/user/login-state"
        },
        {
          title: "控制用户能访问哪些应用",
          path: "/guides/user/application-access"
        },
        {
          title: "用户分组",
          path: "/guides/user/user-group"
        }
      ]
    },
    {
      title: "管理用户目录",
      path: "/guides/users/",
      children: [
        {
          title: "用户目录配置项",
          path: "/guides/users/settings"
        },
        {
          title: "添加自定义用户字段",
          path: "/guides/users/user-defined-field/"
        },
        {
          title: "搜索用户",
          path: "/guides/users/search"
        },
        {
          title: "使用 LDAP 用户目录",
          path: "/guides/users/ldap-user-directory"
        }
      ]
    },
    {
      title: "同步中心(BETA)",
      path: "/guides/sync/",
      children: [
        {
          title: "快速开始",
          path: "/guides/sync/quick-start"
        },
        {
          title: "创建同步任务",
          path: "/guides/sync/create-sync/",
          children: [
            {
              path: "/guides/sync/create-sync/get-config/",
              title: "获取应用配置项和权限",
              children: [
                {
                  path: "/guides/sync/create-sync/get-config/lark",
                  title: "获取飞书配置项和权限"
                },
                {
                  path: "/guides/sync/create-sync/get-config/wechatwork",
                  title: "获取企业微信配置项和权限"
                },
                {
                  path: "/guides/sync/create-sync/get-config/dingding",
                  title: "获取钉钉配置项和权限"
                },
                {
                  path: "/guides/sync/create-sync/get-config/fxiaoke",
                  title: "获取纷享销客配置项和权限"
                },
                {
                  path: "/guides/sync/create-sync/get-config/others",
                  title: "获取其他应用配置项和权限"
                }
              ]
            },
            {
              path: "/guides/sync/create-sync/field-mapping",
              title: "自定义字段映射"
            },
            {
              path: "/guides/sync/create-sync/sync-type",
              title: "选择同步方式"
            }
          ]
        },
        {
          title: "执行同步任务",
          path: "/guides/sync/perform-sync"
        },
        {
          title: "风险操作提示",
          path: "/guides/sync/manual-actions"
        },
        {
          title: "常见问题",
          path: "/guides/sync/FQA"
        }
      ]
    },
    {
      title: "自建应用",
      path: "/guides/app/",
      children: [
        {
          title: "创建应用",
          path: "/guides/app/create-app"
        },
        {
          title: "配置登录注册方式",
          path: "/guides/app/config-login-methods"
        },
        {
          title: "添加注册协议",
          path: "/guides/app/agreements"
        },
        {
          title: "自定义登录框样式",
          path: "/guides/app/custom-styles"
        },
        {
          title: "成为联邦认证身份源",
          path: "/guides/app/identity-provider"
        },
        {
          title: "开启多因素认证",
          path: "/guides/app/mfa"
        },
        {
          title: "子账号管理",
          path: "/guides/app/sub-account"
        }
        // {
        //   title: '开启子账号登录',
        //   path: '/guides/app/sub-account'
        // },
        // {
        //   title: '授权管理',
        //   path: '/guides/app/authorization'
        // }
      ]
    },
    {
      title: "单点登录 SSO",
      path: "/guides/sso/",
      children: [
        {
          title: "应用面板",
          path: "/guides/dashboard/"
        },
        {
          title: "飞书工作台 SSO 方案",
          path: "/guides/lark-sso/"
        },
        {
          title: "集成应用 SSO 方案",
          path: "/guides/apn/",
          children: []
        },
        {
          title: "自建应用 SSO 方案",
          path: "/guides/app/sso"
        },
        {
          title: "管理用户登录状态",
          path: "/guides/app/session-management"
        },
        {
          title: "ASA 表单代填",
          path: "/guides/asa/"
        }
      ]
    },
    // {
    //   title: '飞书工作台 SSO 方案',
    //   path: '/guides/lark-sso/',
    // },
    {
      title: "成为联邦认证身份源",
      path: "/guides/federation/",
      children: [
        {
          title: "成为 OpenID Connect 身份源",
          path: "/guides/federation/oidc.md"
        },
        {
          title: "成为 OAuth2.0 身份源",
          path: "/guides/federation/oauth.md"
        },
        {
          title: "成为 SAML2 身份源",
          path: "/guides/federation/saml.md"
        },
        {
          title: "成为 CAS 身份源",
          path: "/guides/federation/cas.md"
        }
      ]
    },
    {
      title: "连接外部身份源（IdP）",
      path: "/guides/connections/",
      children: [
        {
          title: "社会化登录",
          path: "/guides/connections/social"
        },
        {
          title: "企业身份源",
          path: "/guides/connections/enterprise"
        },
        {
          title: "身份源连接的账号关联",
          path: "/guides/connections/account-association"
        },
        {
          title: "身份源连接的账号匹配规则",
          path: "/guides/connections/user-mapping"
        },
        DATABASE_CONNECTION_MENU
      ]
    },
    {
      title: "打通微信生态",
      path: "/guides/wechat-ecosystem/",
      children: [
        {
          title: "关注公众号登录",
          path: "/guides/wechat-ecosystem/wechat-offical-account"
        },
        {
          title: "PC 网站使用微信扫码登录",
          path: "/guides/wechat-ecosystem/wechat-pc/"
        },
        {
          title: "PC 网站使用小程序扫码登录",
          path: "/guides/wechat-ecosystem/wechat-miniprogram-qrcode/"
        },
        {
          title: "微信内网页使用微信授权登录",
          path: "/guides/wechat-ecosystem/wechat-webpage-authorization"
        },
        {
          title: "小程序内使用微信登录",
          path: "/guides/wechat-ecosystem/wechat-miniprogram"
        },
        {
          title: "移动 APP 使用微信登录",
          path: "/guides/wechat-ecosystem/wechat-mobile"
        },
        {
          title: "移动 APP 使用小程序登录",
          path: "/guides/wechat-ecosystem/wechat-miniprogram-applaunch"
        }
      ]
    },
    {
      title: `迁移用户到 ${BRAND_NAME_ZH_CN}`,
      path: "/guides/migrations/",
      children: [
        {
          title: "使用 SDK 导入用户",
          path: "/guides/migrations/use-api"
        },
        {
          title: "配置自定义密码函数",
          path: "/guides/migrations/custom-password-script/"
        },
        {
          title: "从企业微信、钉钉等第三方身份源导入用户",
          path: "/guides/migrations/import-from-third-party-identity-provider/"
        }
      ]
    },
    {
      title: "管理组织机构",
      path: "/guides/org/",
      children: [
        {
          title: "创建或导入组织机构",
          path: "/guides/org/create-or-import-org/"
        },
        {
          title: "管理组织机构",
          path: "/guides/org/manage-org/"
        },
        {
          title: "管理成员生命周期",
          path: "/guides/org/staff-life-cycle-management/"
        },
        {
          title: "使用 LDAP 协议对外开放组织机构数据",
          path: "/guides/org/ldap-user-directory/"
        }
      ]
    },
    {
      title: "自动化",
      path: "/guides/extensibility/",
      children: [
        {
          title: "使用 Webhook 监听用户事件",
          path: "/guides/webhook/"
        },
        {
          title: "自定义认证流程（Pipeline）",
          path: "/guides/pipeline/",
          children: [
            {
              title: "创建你的第一个 Pipeline 函数",
              path: "/guides/pipeline/write-your-first-pipeline-function"
            },
            {
              title: "Pipeline API Reference",
              path: "/guides/pipeline/pipeline-function-api-doc"
            },
            {
              title: "Pipeline 的应用场景",
              path: "/guides/pipeline/usage"
            },
            {
              title: "Pipeline User 对象",
              path: "/guides/pipeline/user-object"
            },
            {
              title: "Pipeline Context 对象",
              path: "/guides/pipeline/context-object"
            },
            {
              title: "在 Pipeline 中使用环境变量",
              path: "/guides/pipeline/env"
            },
            {
              title: "可用的 Node Modules",
              path: "/guides/pipeline/available-node-modules"
            },
            {
              title: "如何调试",
              path: "/guides/pipeline/how-to-debug"
            },
            {
              title: "常见问题",
              path: "/guides/pipeline/faq"
            },
            {
              title: "私有化部署",
              path: "/guides/pipeline/private-cloud"
            }
          ]
        },
        DATABASE_CONNECTION_MENU,
        {
          title: "配置自定义密码函数",
          path: "/guides/migrations/custom-password-script/"
        }
      ]
    },
    {
      title: "审计日志",
      path: "/guides/audit/",
      children: [
        {
          title: "用户行为的审计",
          path: "/guides/audit/user-action"
        },
        {
          title: "管理员行为的审计",
          path: "/guides/audit/administrator-action"
        }
      ]
    },
    {
      title: "配置安全信息",
      children: [
        {
          title: "配置 Web 安全域",
          path: "/guides/security/config-domain"
        },
        {
          title: "配置密码强度",
          path: "/guides/security/config-password"
        },
        {
          title: "配置注册频率限制",
          path: "/guides/security/config-register-limit"
        },
        {
          title: "配置登录失败次数限制",
          path: "/guides/security/config-login-fail-limit"
        }
      ]
    },
    {
      title: "配置用户池信息",
      children: [
        {
          title: "修改用户池基础信息",
          path: "/guides/userpool-config/basic-config"
        },
        {
          title: "配置邮件服务和模版",
          path: "/guides/userpool-config/email/"
        },
        {
          title: "配置短信服务和模版",
          path: "/guides/userpool-config/sms/"
        },
        {
          title: "添加用户池协作管理员",
          path: "/guides/userpool-config/collaboration-adminstrator"
        },
        {
          title: "开发者配置",
          path: "/guides/userpool-config/developer-config"
        }
      ]
    },
    {
      title: "部署方案",
      path: "/guides/deployment/",
      children: [
        {
          title: "基础部署模式",
          path: "/guides/deployment/bare-metal"
        },
        {
          title: "Docker 部署模式",
          path: "/guides/deployment/docker-compose"
        },
        {
          title: "Kubernetes 部署模式",
          path: "/guides/deployment/kubernetes"
        },
        {
          title: "自定义域名配置方案",
          path: "/guides/deployment/custom-domain"
        }
      ]
    },
    {
      title: "常见问题 FAQs",
      children: [
        {
          title: "如何获取用户池 ID",
          path: "/guides/faqs/get-userpool-id-and-secret.md"
        },
        {
          title: "如何获取应用 ID",
          path: "/guides/faqs/get-app-id-and-secret.md"
        },
        {
          title: "如何验证用户身份凭证（token）",
          path: "/guides/faqs/how-to-validate-user-token"
        },
        {
          title: "如何识别用户来源",
          path: "/guides/faqs/how-to-identify-the-source-users"
        },
        {
          title: `在本地联表 ${BRAND_NAME_ZH_CN} 用户与你的业务数据`,
          path: "/guides/faqs/how-to-join-authing-user-with-your-business-data"
        },
        {
          title: `禁用第三方 Cookie 对 Authing 的影响`,
          path: "/guides/faqs/block-third-party-cookie-impact"
        },
        {
          title: "如何部署中转代理服务器",
          path: "/guides/faqs/how-to-build-a-proxy"
        },
        {
          title: `如何获取 ${BRAND_NAME_ZH_CN} 服务器集群 IP`,
          path: "/guides/faqs/public-ips"
        }
      ]
    }
  ],
  "/reference/": [
    {
      title: "登录组件 (Guard)",
      path: "/reference/guard/v2/",
      children: [
        {
          title: "React",
          path: "/reference/guard/v2/react.md"
        },
        {
          title: "原生 JavaScript",
          path: "/reference/guard/v2/native-javascript.md"
        },
        {
          title: "Vue",
          path: "/reference/guard/v2/vue.md"
        },
        {
          title: "Angular",
          path: "/reference/guard/v2/angular.md"
        },
        {
          title: "迁移指南",
          path: "/reference/guard/v2/migration"
        },
        {
          title: "Guard Changelog",
          path: "/reference/guard/v2/guard-changelog"
        }
      ]
    },
    // {
    //   title: "登录组件",
    //   path: "/reference/ui-components/",
    //   hidden: true,
    //   children: [
    //     {
    //       title: "React",
    //       path: "/reference/ui-components/react",
    //       hidden: true,
    //     },
    //     {
    //       title: "Vue",
    //       path: "/reference/ui-components/vue",
    //     },
    //     {
    //       title: "Angular",
    //       path: "/reference/ui-components/angular",
    //     },
    //     {
    //       title: "原生 JavaScript",
    //       path: "/reference/ui-components/native-javascript",
    //     },
    //     {
    //       title: "完整参数列表",
    //       path: "/reference/ui-components/parameters",
    //     },
    //     {
    //       title: "Guard Changelog",
    //       path: "/reference/ui-components/guard-changelog",
    //     },
    //   ],
    // },
    {
      title: "单点登录（SSO）",
      path: "/reference/sdk-for-sso"
    },
    {
      title: "JavaScript / Node.js",
      path: "/reference/sdk-for-node/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-node/authentication",
          children: [
            "/reference/sdk-for-node/authentication/AuthenticationClient",
            "/reference/sdk-for-node/authentication/StandardProtocol",
            "/reference/sdk-for-node/authentication/QrCodeAuthenticationClient",
            "/reference/sdk-for-node/authentication/MfaAuthenticationClient",
            "/reference/sdk-for-node/authentication/SocialAuthenticationClient",
            "/reference/sdk-for-node/authentication/EnterpriseAuthenticationClient",
            "/reference/sdk-for-node/authentication/PrincipalAuthentication"
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-node/management",
          children: [
            "/reference/sdk-for-node/management/UsersManagementClient",
            "/reference/sdk-for-node/management/ApplicationManagementClient",
            "/reference/sdk-for-node/management/PoliciesManagementClient",
            "/reference/sdk-for-node/management/RolesManagementClient",
            "/reference/sdk-for-node/management/AclManagementClient",
            "/reference/sdk-for-node/management/GroupsManagementClient",
            "/reference/sdk-for-node/management/OrgManagementClient",
            "/reference/sdk-for-node/management/UdfManagementClient",
            "/reference/sdk-for-node/management/StatisticsManagementClient",
            "/reference/sdk-for-node/management/WhitelistManagementClient",
            "/reference/sdk-for-node/management/UserpoolManagementClient",
            "/reference/sdk-for-node/management/MFAManagementClient",
            "/reference/sdk-for-node/management/PrincipalManagementClient",
            "/reference/sdk-for-node/management/TenantManagementClient"
          ]
        }
      ]
    },
    {
      title: "Java / Kotlin",
      path: "/reference/sdk-for-java/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-java/authentication/",
          children: [
            "/reference/sdk-for-java/authentication/AuthenticationClient",
            "/reference/sdk-for-java/authentication/StandardProtocol"
            // '/reference/sdk-for-java/authentication/MfaAuthenticationClient',
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-java/management",
          children: [
            "/reference/sdk-for-java/management/UsersManagementClient",
            "/reference/sdk-for-java/management/ApplicationManagementClient",
            "/reference/sdk-for-java/management/RolesManagementClient",
            "/reference/sdk-for-java/management/AclManagementClient",
            "/reference/sdk-for-java/management/GroupsManagementClient",
            "/reference/sdk-for-java/management/OrgManagementClient",
            "/reference/sdk-for-java/management/UdfManagementClient",
            "/reference/sdk-for-java/management/WhitelistManagementClient",
            "/reference/sdk-for-java/management/UserpoolManagementClient",
            "/reference/sdk-for-java/management/StatisticsManagementClient",
            "/reference/sdk-for-java/management/TenantManagementClient"
          ]
        }
      ]
    },
    {
      title: "Python",
      path: "/reference/sdk-for-python/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-python/authentication/",
          children: [
            "/reference/sdk-for-python/authentication/AuthenticationClient",
            "/reference/sdk-for-python/authentication/StandardProtocol",
            "/reference/sdk-for-python/authentication/MfaAuthenticationClient"
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-python/management",
          children: [
            "/reference/sdk-for-python/management/AclManagementClient",
            "/reference/sdk-for-python/management/ApplicationManagementClient",
            "/reference/sdk-for-python/management/GroupsManagementClient",
            "/reference/sdk-for-python/management/OrgManagementClient",
            "/reference/sdk-for-python/management/PoliciesManagementClient",
            "/reference/sdk-for-python/management/PrincipalManagementClient",
            "/reference/sdk-for-python/management/RolesManagementClient",
            "/reference/sdk-for-python/management/StatisticsManagementClient",
            "/reference/sdk-for-python/management/UdfManagementClient",
            "/reference/sdk-for-python/management/UserpoolManagementClient",
            "/reference/sdk-for-python/management/UsersManagementClient",
            "/reference/sdk-for-python/management/WhitelistManagementClient"
          ]
        }
      ]
    },
    {
      title: "C#",
      path: "/reference/sdk-for-csharp/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-csharp/authentication",
          children: [
            "/reference/sdk-for-csharp/authentication/AuthenticationClient",
            "/reference/sdk-for-csharp/authentication/StandardProtocol",
            "/reference/sdk-for-csharp/authentication/MfaAuthenticationClient"
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-csharp/management",
          children: [
            "/reference/sdk-for-csharp/management/UsersManagementClient",
            "/reference/sdk-for-csharp/management/ApplicationManagementClient",
            "/reference/sdk-for-csharp/management/RolesManagementClient",
            "/reference/sdk-for-csharp/management/AclManagementClient",
            "/reference/sdk-for-csharp/management/GroupsManagementClient",
            "/reference/sdk-for-csharp/management/OrgManagementClient",
            "/reference/sdk-for-csharp/management/UdfManagementClient",
            "/reference/sdk-for-csharp/management/WhitelistManagementClient",
            "/reference/sdk-for-csharp/management/UserpoolManagementClient",
            "/reference/sdk-for-csharp/management/StatisticsManagementClient",
            "/reference/sdk-for-csharp/management/TenantManagementClient"
          ]
        }
      ]
    },
    {
      title: "PHP",
      path: "/reference/sdk-for-php/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-php/authentication/",
          children: [
            "/reference/sdk-for-php/authentication/AuthenticationClient",
            "/reference/sdk-for-php/authentication/StandardProtocol",
            "/reference/sdk-for-php/authentication/MfaAuthenticationClient"
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-php/management/",
          children: [
            "/reference/sdk-for-php/management/UsersManagementClient",
            "/reference/sdk-for-php/management/ApplicationManagementClient",
            "/reference/sdk-for-php/management/RolesManagementClient",
            "/reference/sdk-for-php/management/AclManagementClient",
            "/reference/sdk-for-php/management/GroupsManagementClient",
            "/reference/sdk-for-php/management/OrgManagementClient",
            "/reference/sdk-for-php/management/UdfManagementClient",
            "/reference/sdk-for-php/management/WhitelistManagementClient",
            "/reference/sdk-for-php/management/UserpoolManagementClient",
            "/reference/sdk-for-php/management/MFAManagementClient"
          ]
        }
      ]
    },
    {
      title: "Go",
      path: "/reference/sdk-for-go/",
      children: [
        {
          title: "用户认证模块",
          path: "/reference/sdk-for-go/authentication/",
          children: [
            "/reference/sdk-for-go/authentication/AuthenticationClient",
            "/reference/sdk-for-go/authentication/StandardProtocol",
            "/reference/sdk-for-go/authentication/MfaAuthenticationClient"
          ]
        },
        {
          title: "管理模块",
          path: "/reference/sdk-for-go/management/",
          children: [
            "/reference/sdk-for-go/management/AclManagementClient",
            "/reference/sdk-for-go/management/ApplicationManagementClient",
            "/reference/sdk-for-go/management/GroupsManagementClient",
            "/reference/sdk-for-go/management/OrgManagementClient",
            "/reference/sdk-for-go/management/PoliciesManagementClient",
            "/reference/sdk-for-go/management/PrincipalManagementClient",
            "/reference/sdk-for-go/management/RolesManagementClient",
            "/reference/sdk-for-go/management/StatisticsManagementClient",
            "/reference/sdk-for-go/management/UdfManagementClient",
            "/reference/sdk-for-go/management/UserpoolManagementClient",
            "/reference/sdk-for-go/management/UsersManagementClient",
            "/reference/sdk-for-go/management/WhitelistManagementClient",
            "/reference/sdk-for-go/management/TenantManagementClient"
          ]
        }
      ]
    },
    {
      title: "Ruby",
      path: "/reference/sdk-for-ruby"
    },
    {
      title: "Delphi",
      path: "/reference/sdk-for-delphi"
    },
    {
      title: "Android",
      path: "/reference/sdk-for-android/",
      children: [
        {
          title: "开始开发",
          path: "/reference/sdk-for-android/develop"
        },
        {
          title: "快速接入",
          path: "/reference/sdk-for-android/quick"
        },
        {
          title: "超组件",
          path: "/reference/sdk-for-android/component/",
          children: [
            {
              title: "教程",
              children: [
                "/reference/sdk-for-android/component/tutorial/example",
                "/reference/sdk-for-android/component/tutorial/basic-login",
                "/reference/sdk-for-android/component/tutorial/advanced-login",
                "/reference/sdk-for-android/component/tutorial/refine-login",
                "/reference/sdk-for-android/component/tutorial/basic-register",
                "/reference/sdk-for-android/component/tutorial/advanced-register",
                "/reference/sdk-for-android/component/tutorial/login-to-register",
                "/reference/sdk-for-android/component/tutorial/reset-password-by-phone",
                "/reference/sdk-for-android/component/tutorial/reset-password-by-email",
                "/reference/sdk-for-android/component/tutorial/reset-password-all"
              ]
            },
            {
              title: "基础组件",
              children: [
                {
                  title: "应用图标",
                  path: "/reference/sdk-for-android/component/basic/app-logo"
                },
                {
                  title: "应用名称",
                  path: "/reference/sdk-for-android/component/basic/app-name"
                },
                {
                  title: "帐号输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/account-edit-text"
                },
                {
                  title: "密码输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/password-edit-text"
                },
                {
                  title: "密码确认输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/password-confirm-edit-text"
                },
                {
                  title: "电话号码输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/phonenumber-edit-text"
                },
                {
                  title: "验证码输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/verifycode-edit-text"
                },
                {
                  title: "获取短信验证码按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/get-verifycode-button"
                },
                {
                  title: "邮箱输入框",
                  path:
                    "/reference/sdk-for-android/component/basic/email-edit-text"
                },
                {
                  title: "获取邮箱验证码按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/get-emailcode-button"
                },
                {
                  title: "登录按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/login-button"
                },
                {
                  title: "错误文本",
                  path: "/reference/sdk-for-android/component/basic/error-text"
                },
                {
                  title: "登录方式切换栏",
                  path:
                    "/reference/sdk-for-android/component/basic/login-method-tab"
                },
                {
                  title: "登录容器",
                  path:
                    "/reference/sdk-for-android/component/basic/login-container"
                },
                {
                  title: "隐私协议",
                  path:
                    "/reference/sdk-for-android/component/basic/privacy-confirm-box"
                },
                {
                  title: "注册按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/register-button"
                },
                {
                  title: "注册方式切换栏",
                  path:
                    "/reference/sdk-for-android/component/basic/register-method-tab"
                },
                {
                  title: "注册容器",
                  path:
                    "/reference/sdk-for-android/component/basic/register-container"
                },
                {
                  title: "跳转注册按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/go-register-button"
                },
                {
                  title: "跳转登录按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/go-login-button"
                },
                {
                  title: "跳转忘记密码按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/go-forgot-password-button"
                },
                {
                  title: "跳转问题反馈按钮",
                  path:
                    "/reference/sdk-for-android/component/basic/go-feedback-button"
                }
              ]
            },
            {
              title: "社会化组件",
              children: [
                {
                  title: "社会化登录列表",
                  path:
                    "/reference/sdk-for-android/component/social/social-login-listview"
                }
              ]
            }
          ]
        },
        {
          title: "APIs",
          children: [
            "/reference/sdk-for-android/apis/authentication/",
            "/reference/sdk-for-android/apis/protocol/",
            "/reference/sdk-for-android/apis/mfa/",
            "/reference/sdk-for-android/apis/scan/"
          ]
        },
        {
          title: "社会化登录",
          path: "/reference/sdk-for-android/social/",
          children: [
            "/reference/sdk-for-android/social/wechat",
            "/reference/sdk-for-android/social/wecom",
            "/reference/sdk-for-android/social/alipay",
            "/reference/sdk-for-android/social/lark"
          ]
        },
        {
          title: "典型场景",
          children: [
            "/reference/sdk-for-android/scenario/splash",
            "/reference/sdk-for-android/scenario/tokens",
            "/reference/sdk-for-android/scenario/user-profile",
            "/reference/sdk-for-android/scenario/webview"
          ]
        },
        {
          title: "私有化部署",
          path: "/reference/sdk-for-android/onpremise"
        },
        {
          title: "版本历史",
          path: "/reference/sdk-for-android/version"
        }
      ]
    },
    {
      title: "iOS",
      path: "/reference/sdk-for-ios/",
      children: [
        {
          title: "开始开发",
          path: "/reference/sdk-for-ios/develop"
        },
        {
          title: "快速接入",
          path: "/reference/sdk-for-ios/quick"
        },
        {
          title: "超组件",
          path: "/reference/sdk-for-ios/component/",
          children: [
            {
              title: "教程",
              children: [
                "/reference/sdk-for-ios/component/tutorial/example",
                "/reference/sdk-for-ios/component/tutorial/basic-login",
                "/reference/sdk-for-ios/component/tutorial/advanced-login",
                "/reference/sdk-for-ios/component/tutorial/refine-login",
                "/reference/sdk-for-ios/component/tutorial/basic-register",
                "/reference/sdk-for-ios/component/tutorial/advanced-register",
                "/reference/sdk-for-ios/component/tutorial/login-to-register",
                "/reference/sdk-for-ios/component/tutorial/reset-password-by-phone",
                "/reference/sdk-for-ios/component/tutorial/reset-password-by-email",
                "/reference/sdk-for-ios/component/tutorial/reset-password-all"
              ]
            },
            {
              title: "基础组件",
              children: [
                {
                  title: "应用图标",
                  path: "/reference/sdk-for-ios/component/basic/app-logo"
                },
                {
                  title: "应用名称",
                  path: "/reference/sdk-for-ios/component/basic/app-name"
                },
                {
                  title: "帐号输入框",
                  path:
                    "/reference/sdk-for-ios/component/basic/account-textfield"
                },
                {
                  title: "密码输入框",
                  path:
                    "/reference/sdk-for-ios/component/basic/password-textfield"
                },
                {
                  title: "邮箱输入框",
                  path: "/reference/sdk-for-ios/component/basic/email-textfield"
                },
                {
                  title: "电话号码输入框",
                  path:
                    "/reference/sdk-for-ios/component/basic/phonenumber-textfield"
                },
                {
                  title: "验证码输入框",
                  path:
                    "/reference/sdk-for-ios/component/basic/verifycode-textfield"
                },
                {
                  title: "获取验证码按钮",
                  path:
                    "/reference/sdk-for-ios/component/basic/get-verifycode-button"
                },
                {
                  title: "登录按钮",
                  path: "/reference/sdk-for-ios/component/basic/login-button"
                },
                {
                  title: "错误文本",
                  path: "/reference/sdk-for-ios/component/basic/error-label"
                },
                {
                  title: "登录方式切换栏",
                  path:
                    "/reference/sdk-for-ios/component/basic/login-method-tab"
                },
                {
                  title: "登录容器",
                  path: "/reference/sdk-for-ios/component/basic/login-container"
                },
                {
                  title: "隐私协议",
                  path:
                    "/reference/sdk-for-ios/component/basic/privacy-confirm-box"
                },
                {
                  title: "注册按钮",
                  path: "/reference/sdk-for-ios/component/basic/register-button"
                },
                {
                  title: "注册方式切换栏",
                  path:
                    "/reference/sdk-for-ios/component/basic/register-method-tab"
                },
                {
                  title: "注册容器",
                  path:
                    "/reference/sdk-for-ios/component/basic/register-container"
                },
                {
                  title: "跳转注册按钮",
                  path:
                    "/reference/sdk-for-ios/component/basic/go-register-button"
                }
              ]
            },
            {
              title: "社会化组件",
              children: [
                {
                  title: "社会化登录列表",
                  path:
                    "/reference/sdk-for-ios/component/social/social-login-listview"
                }
              ]
            }
          ]
        },
        {
          title: "APIs",
          children: [
            "/reference/sdk-for-ios/authentication/",
            "/reference/sdk-for-ios/protocol/",
            "/reference/sdk-for-ios/mfa/",
            "/reference/sdk-for-ios/scan/",
            "/reference/sdk-for-ios/util/"
          ]
        },
        {
          title: "社会化登录",
          path: "/reference/sdk-for-ios/social/",
          children: [
            "/reference/sdk-for-ios/social/wechat",
            "/reference/sdk-for-ios/social/wecom",
            "/reference/sdk-for-ios/social/alipay",
            "/reference/sdk-for-ios/social/lark",
            "/reference/sdk-for-ios/social/apple"
          ]
        },
        {
          title: "私有化部署",
          path: "/reference/sdk-for-ios/onpremise"
        }
      ]
    },
    {
      title: "Flutter",
      path: "/reference/sdk-for-flutter/",
      children: [
        {
          title: "开始开发",
          path: "/reference/sdk-for-flutter/develop"
        },
        {
          title: "APIs",
          children: [
            "/reference/sdk-for-flutter/authentication/",
            "/reference/sdk-for-flutter/protocol/",
            "/reference/sdk-for-flutter/mfa/",
            "/reference/sdk-for-flutter/scan/",
            "/reference/sdk-for-flutter/social/"
          ]
        },
        {
          title: "私有化部署",
          path: "/reference/sdk-for-flutter/onpremise"
        }
      ]
    },
    {
      title: "React Native",
      path: "/reference/sdk-for-react-native"
    },
    {
      title: "微信小程序",
      path: "/reference/sdk-for-wxapp"
    },
    {
      title: "微信网页授权",
      path: "/reference/sdk-for-wxmp"
    },
    {
      title: "框架集成",
      path: "/reference/frameworks"
    },
    {
      title: "Radius",
      path: "/reference/radius/"
    },
    {
      title: "错误代码",
      path: "/reference/error-code"
    }
  ],
  "/concepts/": [
    {
      title: `什么是 ${BRAND_NAME_ZH_CN}`,
      path: "/concepts/"
    },
    {
      title: "什么是用户池",
      path: "/concepts/user-pool"
    },
    {
      title: "什么是应用",
      path: "/concepts/application"
    },
    {
      title: "什么是认证",
      path: "/concepts/authentication"
    },
    {
      title: "什么是联邦认证",
      path: "/concepts/federation"
    },
    {
      title: "什么是零信任网络",
      path: "/concepts/zero-trust-network"
    },
    {
      title: "单点登录与单点登出",
      path: "/concepts/single-sign-on-and-single-sign-out"
    },
    {
      title: "什么是授权",
      path: "/concepts/authorization"
    },
    {
      title: "认证 vs 授权",
      path: "/concepts/authentication-vs-authorization"
    },
    {
      title: "什么是 JWT Token",
      path: "/concepts/jwt-token"
    },
    {
      title: "什么是 ID Token",
      path: "/concepts/id-token"
    },
    {
      title: "什么是 Access Token",
      path: "/concepts/access-token"
    },
    {
      title: "什么是 Refresh Token",
      path: "/concepts/refresh-token"
    },
    {
      title: "Access Token vs Id Token",
      path: "/concepts/access-token-vs-id-token"
    },
    {
      title: "理解 OIDC 与 OAuth2.0 协议",
      children: [
        {
          title: "OIDC 与 OAuth2.0 综述",
          path: "/concepts/oidc/oidc-overview"
        },
        {
          title: "选择 OIDC 授权模式",
          path: "/concepts/oidc/choose-flow"
        }
      ]
    },
    {
      title: "OIDC 常见问题",
      path: "/concepts/oidc-common-questions"
    },
    {
      title: "理解 SAML2 协议",
      children: [
        {
          title: "SAML2 综述",
          path: "/concepts/saml/saml-overview"
        },
        {
          title: "SAML2 流程",
          path: "/concepts/saml/saml-flow"
        }
        // {
        //   title: 'SAML2 常见问题',
        //   path: '/concepts/saml/faq'
        // },
      ]
    },
    {
      title: "什么是多因素认证",
      path: "/concepts/mfa"
    },
    {
      title: "账号生命周期管理",
      path: "/concepts/account-life-cycle-management"
    },
    {
      title: "托管登录页 vs 可嵌入登录组件",
      path: "/concepts/embeded-vs-hosted"
    },
    {
      title: "CIAM 与 EIAM",
      path: "/concepts/ciam-and-eiam"
    },
    {
      title: "什么是 LDAP",
      path: "/concepts/ldap"
    },
    {
      title: "扫码登录的原理",
      path: "/concepts/how-qrcode-works"
    },
    {
      title: "密码学基本概念",
      path: "/concepts/cryptography"
    }
  ],
  "/integration/": [],
  "/frameworks/": [
    {
      title: "",
      path: ""
    }
  ],
  "/apn/": [
    {
      title: "概览",
      path: "/apn/"
    },
    {
      title: "将你的应用集成 OIDC",
      path: "/apn/integrated-oidc/"
    },
    {
      title: "基于 Authing 测试 OIDC 能力",
      path: "/apn/test-oidc/",
      children: [
        {
          title: "第一步：在 Authing 创建一个自建应用",
          path: "/apn/test-oidc/get-oidc-parameter/step1"
        },
        {
          title: "第二步：点击刚创建的应用，获取 OIDC 参数",
          path: "/apn/test-oidc/get-oidc-parameter/step2"
        },
        {
          title: "第三步：准备一个 Authing 的用户",
          path: "/apn/test-oidc/get-oidc-parameter/step3"
        },
        {
          title: "第四步：通过 Authing 的 IDP 测试你的应用",
          path: "/apn/test-oidc/get-oidc-parameter/step4"
        }
      ]
    },
    {
      title: "加入 APN 前的注意事项",
      path: "/apn/attention/"
    },
    {
      title: "邀请管理员",
      path: "/guides/userpool-config/collaboration-adminstrator"
    },
    {
      title: "提交应用",
      path: "/apn/submit-app/"
    },
    {
      title: "更多 OIDC 测试方法",
      path: "/apn/more-oidc-tests/",
      children: [
        {
          title: "Type 2 授权码 + PKCE 模式测试",
          path: "/apn/more-oidc-tests/type2"
        },
        { title: "Type 3 隐式模式测试", path: "/apn/more-oidc-tests/type3" },
        { title: "Type 4 密码模式测试", path: "/apn/more-oidc-tests/type4" },
        {
          title: "Type 5 Client Credentials 模式测试",
          path: "/apn/more-oidc-tests/type5"
        }
      ]
    }
  ],
  "/tenant/": [
    {
      title: "概览",
      path: "/tenant/"
    },
    {
      title: "快速开始",
      path: "/tenant/quickStart"
    },
    {
      title: "创建租户",
      path: "/tenant/create-tenant"
    },
    {
      path: "/tenant/brand-tenant",
      title: "自定义登录样式"
    },
    {
      path: "/tenant/login-register",
      title: "配置注册和登录方式"
    },
    {
      path: "/tenant/member-management",
      title: "管理租户成员"
    },
    {
      path: "/tenant/tenant-org",
      title: "管理租户下组织机构"
    },
    {
      path: "/tenant/access-control",
      title: "管理租户下权限"
    },
    {
      path: "/tenant/idp-social",
      title: "为租户配置第三方身份源"
    },
    {
      title: "应用租户配置",
      path: "/tenant/tenant-config",
      children: [
        {
          title: "租户下身份源连接的账号匹配规则",
          path: "/tenant/user-mapping"
        }
      ]
    },
    {
      title: "示例：基于 Authing 开发一个叫做 Uthing 的 SaaS 应用",
      path: "/tenant/demo"
    },
    {
      title: "开发集成",
      path: "",
      children: [
        {
          title: "JavaScript/Node.js",
          path:
            "/tenant/reference/sdk-for-node/management/TenantManagementClient"
        },
        {
          title: "Go",
          path: "/tenant/reference/sdk-for-go/management/TenantManagementClient"
        },
        {
          title: "Java",
          path:
            "/tenant/reference/sdk-for-java/management/TenantManagementClient"
        },
        {
          title: "更多语言敬请期待",
          path: "/tenant/reference/sdk-for-node/management/developing"
        }
      ]
    }
  ],
  "/guard/": [
    {
      title: "概览",
      path: "/guard/v2/"
    },
    {
      title: "React",
      path: "/guard/v2/react"
    },
    {
      title: "Vue",
      path: "/guard/v2/vue"
    },
    {
      title: "Angular",
      path: "/guard/v2/angular"
    },
    {
      title: "原生 JavaScript",
      path: "/guard/v2/native-javascript"
    },
    {
      title: "迁移指南",
      path: "/guard/v2/migration"
    },
    {
      title: "Guard Changelog",
      path: "/guard/v2/guard-changelog"
    }
  ],
  "/android/": [
    {
      title: "开始开发",
      path: "/android/develop"
    },
    {
      title: "快速接入",
      path: "/android/quick"
    },
    {
      title: "超组件",
      path: "/android/component/",
      children: [
        {
          title: "教程",
          children: [
            "/android/component/tutorial/example",
            "/android/component/tutorial/basic-login",
            "/android/component/tutorial/advanced-login",
            "/android/component/tutorial/refine-login",
            "/android/component/tutorial/basic-register",
            "/android/component/tutorial/advanced-register",
            "/android/component/tutorial/login-to-register",
            "/android/component/tutorial/reset-password-by-phone",
            "/android/component/tutorial/reset-password-by-email",
            "/android/component/tutorial/reset-password-all"
          ]
        },
        {
          title: "基础组件",
          children: [
            {
              title: "应用图标",
              path: "/android/component/basic/app-logo"
            },
            {
              title: "应用名称",
              path: "/android/component/basic/app-name"
            },
            {
              title: "帐号输入框",
              path: "/android/component/basic/account-edit-text"
            },
            {
              title: "密码输入框",
              path: "/android/component/basic/password-edit-text"
            },
            {
              title: "密码确认输入框",
              path: "/android/component/basic/password-confirm-edit-text"
            },
            {
              title: "电话号码输入框",
              path: "/android/component/basic/phonenumber-edit-text"
            },
            {
              title: "验证码输入框",
              path: "/android/component/basic/verifycode-edit-text"
            },
            {
              title: "获取短信验证码按钮",
              path: "/android/component/basic/get-verifycode-button"
            },
            {
              title: "邮箱输入框",
              path: "/android/component/basic/email-edit-text"
            },
            {
              title: "获取邮箱验证码按钮",
              path: "/android/component/basic/get-emailcode-button"
            },
            {
              title: "登录按钮",
              path: "/android/component/basic/login-button"
            },
            {
              title: "错误文本",
              path: "/android/component/basic/error-text"
            },
            {
              title: "登录方式切换栏",
              path: "/android/component/basic/login-method-tab"
            },
            {
              title: "登录容器",
              path: "/android/component/basic/login-container"
            },
            {
              title: "隐私协议",
              path: "/android/component/basic/privacy-confirm-box"
            },
            {
              title: "注册按钮",
              path: "/android/component/basic/register-button"
            },
            {
              title: "注册方式切换栏",
              path: "/android/component/basic/register-method-tab"
            },
            {
              title: "注册容器",
              path: "/android/component/basic/register-container"
            },
            {
              title: "跳转注册按钮",
              path: "/android/component/basic/go-register-button"
            },
            {
              title: "跳转登录按钮",
              path: "/android/component/basic/go-login-button"
            },
            {
              title: "跳转忘记密码按钮",
              path: "/android/component/basic/go-forgot-password-button"
            },
            {
              title: "跳转问题反馈按钮",
              path: "/android/component/basic/go-feedback-button"
            }
          ]
        },
        {
          title: "社会化组件",
          children: [
            {
              title: "社会化登录列表",
              path: "/android/component/social/social-login-listview"
            }
          ]
        }
      ]
    },
    {
      title: "APIs",
      children: [
        "/android/apis/authentication/",
        "/android/apis/protocol/",
        "/android/apis/mfa/",
        "/android/apis/scan/"
      ]
    },
    {
      title: "社会化登录",
      path: "/android/social/",
      children: [
        "/android/social/wechat",
        "/android/social/wecom",
        "/android/social/alipay",
        "/android/social/lark"
      ]
    },
    {
      title: "典型场景",
      children: [
        "/android/scenario/splash",
        "/android/scenario/tokens",
        "/android/scenario/user-profile",
        "/android/scenario/webview"
      ]
    },
    {
      title: "私有化部署",
      path: "/android/onpremise"
    },
    {
      title: "版本历史",
      path: "/android/version"
    }
  ]
};

/**
 * 英文菜单
 */
const translatedZhCnNavBar = {
  "/guides/": [
    {
      title: "Quick start",
      children: [
        {
          title: "Authenticate your first user",
          path: "/guides/basics/authenticate-first-user/",
          children: [
            {
              title: `Use the hosted login page to complete the authentication`,
              path:
                "/guides/basics/authenticate-first-user/use-hosted-login-page"
            },
            {
              title:
                "Use the embedded login component to complete the authentication",
              path:
                "/guides/basics/authenticate-first-user/use-embeded-login-component/"
            },
            {
              title: "Use API & SDK to complete authentication",
              path: "/guides/basics/authenticate-first-user/use-api-sdk/"
            },
            {
              title: "Verify user credentials (token)",
              path:
                "/guides/basics/authenticate-first-user/how-to-validate-user-token"
            },
            {
              title: `Authority management for users`,
              path:
                "/guides/basics/authenticate-first-user/how-to-implement-access-control"
            },
            {
              title: "Realize logout",
              path: "/guides/basics/authenticate-first-user/how-to-logout-user"
            },
            {
              title: "Next you may need",
              path: "/guides/basics/authenticate-first-user/what-to-do-next"
            }
          ]
        },
        {
          title: "Access methods for different types of applications",
          path: "/guides/basics/platform-guide/integrate-with-regular-web-app",
          children: [
            {
              title: `Integrate ${BRAND_NAME_EN_US} in traditional Web App`,
              path:
                "/guides/basics/platform-guide/integrate-with-regular-web-app"
            },
            {
              title: `Integrate in Single Page Application (SPA) ${BRAND_NAME_EN_US}`,
              path: "/guides/basics/platform-guide/integrate-with-spa"
            },
            {
              title: `Integrate in mobile terminal (iOS, Andriod) ${BRAND_NAME_EN_US}`,
              path: "/guides/basics/platform-guide/integrate-with-mobile-app"
            }
            // {
            // title: `Access ${BRAND_NAME_EN_US} in the back-end API service`,
            // path:
            // "/guides/basics/platform-guide/integrate-with-backend-app",
            // },
          ]
        },
        {
          title: "Console overview",
          path: "/guides/basics/console/"
        }
      ]
    },
    {
      title: "Authenticate the user",
      path: "/guides/authentication/",
      children: [
        {
          title: "Use account password authentication",
          path: "/guides/authentication/basic/password/"
        },
        {
          title: "Use SMS verification code authentication",
          path: "/guides/authentication/basic/sms/"
        },
        {
          title: "Use social login authentication",
          path: "/guides/authentication/social/"
        },
        // {
        // title: "Use social login authentication on the mobile terminal",
        // path: "/guides/authentication/social/mobile/",
        // },
        {
          title: "Use scan code login authentication",
          path: "/guides/authentication/qrcode/use-self-build-app/",
          children: [
            {
              title:
                "Use self-built App to scan the code to log in to the website",
              path: "/guides/authentication/qrcode/use-self-build-app/",
              children: [
                {
                  title: "Complete interface list",
                  path:
                    "/guides/authentication/qrcode/use-self-build-app/full-api-list"
                },
                {
                  title: "Custom configuration items",
                  path:
                    "/guides/authentication/qrcode/use-self-build-app/customize-settings"
                }
              ]
            },
            {
              title:
                "Use the mini program to scan the code to log in to the website",
              path: "/guides/authentication/qrcode/use-wechat-miniprogram/"
            }
          ]
        },
        {
          title: "Certify in Mini Program",
          path: "/guides/authentication/wechat-mini-program/"
        },
        {
          title: "Implement single sign-on (SSO)",
          path: "/guides/authentication/sso/"
        },
        {
          title: "Single sign-on on the mobile terminal",
          path: "/guides/authentication/mobile-sso/"
        },
        {
          title: "Multi-factor authentication (MFA)",
          path: "/guides/authentication/mfa/",
          children: [
            {
              title:
                "MFA of one-time password (TOTP) based on timestamp algorithm",
              path: "/guides/authentication/mfa/totp"
            },
            {
              title: "MFA based on SMS verification code",
              path: "/guides/authentication/mfa/sms"
            },
            {
              title: "MFA based on email verification code",
              path: "/guides/authentication/mfa/email-code"
            },
            {
              title: "Access MFA through SDK",
              path: "/guides/authentication/mfa/mfa-sdk"
            }
          ]
        },
        {
          title: "Extend the authentication process",
          path: "/guides/authentication/extensibility/user-defined-field",
          children: [
            {
              title: "Add user-defined fields",
              path: "/guides/authentication/extensibility/user-defined-field"
            },
            {
              title: "IdToken add custom field",
              path: "/guides/authentication/extensibility/customize-id-token"
            },
            {
              title: "Use a custom database to authenticate users",
              path: "/guides/authentication/extensibility/database-connection"
            },
            {
              title: "Use Pipeline to extend the authentication process",
              path: "/guides/authentication/extensibility/pipeline"
            },
            {
              title: "Use Webhook to monitor authentication events",
              path: "/guides/authentication/extensibility/webhook"
            }
          ]
        },
        {
          title: "Personalize the guard",
          path: "/guides/authentication/branding/"
        }
      ]
    },
    {
      title: "Authority management for users",
      path: "/guides/access-control/",
      children: [
        {
          title: "Choose the appropriate permission model",
          path: "/guides/access-control/choose-the-right-access-control-model"
        },
        {
          title: `Integrate RBAC permission model into your application system`,
          path: "/guides/access-control/rbac"
        },
        {
          title: `Integrate ABAC permission model into your application system`,
          path: "/guides/access-control/abac"
        },
        {
          title: `Use permission group management permission resources`,
          path: "/guides/access-control/resource-group"
        },
        {
          title: `Manage resource permissions`,
          path: "/guides/access-control/resource-acl"
        }
      ]
    },
    {
      title: "Authorization",
      path: "/guides/authorization/",
      children: [
        {
          title: "Inter-application authorization for user permission",
          path: "/guides/authorization/user-consent-authz"
        },
        {
          title: "M2M authorization",
          path: "/guides/authorization/m2m-authz"
        }
      ]
    },
    {
      title: "Manage user accounts",
      path: "/guides/user/",
      children: [
        {
          title: "User field interpretation",
          path: "/guides/user/user-profile"
        },
        {
          title: "Administrator create account",
          path: "/guides/user/create-user/"
        },
        // {
        // title: "Account Lifecycle Management",
        // path: "/guides/user/life-cycle-management",
        // },
        {
          title: "Manage user accounts",
          path: "/guides/user/manage-profile"
        },
        // {
        // title:'Add roles and assign permissions to users',
        // path:'/guides/user/role-and-permission'
        // },
        {
          title: "Binding account",
          path: "/guides/user/bind-social-account"
        },
        {
          title: "Manage user's custom data",
          path: "/guides/user/user-defined-field/"
        },
        {
          title: "View user's login history",
          path: "/guides/user/login-history"
        },
        {
          title: "View the user's geographic location",
          path: "/guides/user/geo"
        },
        {
          title: "Enhance account security",
          path: "/guides/user/security"
        },
        {
          title: "Manage user login status",
          path: "/guides/user/login-state"
        },
        {
          title: "Control which applications users can access",
          path: "/guides/user/application-access"
        },
        {
          title: "User groups",
          path: "/guides/user/user-group"
        }
      ]
    },
    {
      title: "Manage User Directory",
      path: "/guides/users/",
      children: [
        {
          title: "User Directory Configuration Item",
          path: "/guides/users/settings"
        },
        {
          title: "Add custom user field",
          path: "/guides/users/user-defined-field/"
        },
        {
          title: "Search users",
          path: "/guides/users/search"
        },
        {
          title: "Use LDAP user directory",
          path: "/guides/users/ldap-user-directory"
        }
      ]
    },
    {
      title: "Management Application",
      path: "/guides/app/",
      children: [
        {
          title: "Create Application",
          path: "/guides/app/create-app"
        },
        {
          title: "Configure login and registration method",
          path: "/guides/app/config-login-methods"
        },
        {
          title: "Add registration agreement",
          path: "/guides/app/agreements"
        },
        {
          title: "Customize login box style",
          path: "/guides/app/custom-styles"
        },
        {
          title: "Become a source of federal authentication identity",
          path: "/guides/app/identity-provider"
        },
        {
          title: "Enable multi-factor authentication",
          path: "/guides/app/mfa"
        },
        {
          title: "Sub-account management",
          path: "/guides/app/sub-account"
        },
        {
          title: "Implement single sign-on between applications",
          path: "/guides/app/sso"
        },
        {
          title: "Manage user login status",
          path: "/guides/app/session-management"
        }
        // {
        // title:'Open sub-account login',
        // path:'/guides/app/sub-account'
        // },
        // {
        // title:'Authorization Management',
        // path:'/guides/app/authorization'
        //}
      ]
    },
    {
      title: "Become a source of federal authentication identity",
      path: "/guides/federation/",
      children: [
        {
          title: "Become an OpenID Connect Identity Source",
          path: "/guides/federation/oidc.md"
        },
        {
          title: "Become OAuth2.0 Identity Source",
          path: "/guides/federation/oauth.md"
        },
        {
          title: "Become a SAML2 identity source",
          path: "/guides/federation/saml.md"
        },
        {
          title: "Become a CAS Identity Source",
          path: "/guides/federation/cas.md"
        }
      ]
    },
    {
      title: "Connect to an external identity source (IdP)",
      path: "/guides/connections/",
      children: [
        {
          title: "Social Login",
          path: "/guides/connections/social"
        },
        {
          title: "Corporate Identity Source",
          path: "/guides/connections/enterprise"
        },
        DATABASE_CONNECTION_MENU_EN
      ]
    },
    {
      title: "Open up WeChat ecology",
      path: "/guides/wechat-ecosystem/",
      children: [
        {
          title: "PC website uses WeChat scan code to log in",
          path: "/guides/wechat-ecosystem/wechat-pc/"
        },
        {
          title: "PC website use small program to scan code login",
          path: "/guides/wechat-ecosystem/wechat-miniprogram-qrcode/"
        },
        {
          title:
            "Use WeChat authorization to log in to the web page within WeChat",
          path: "/guides/wechat-ecosystem/wechat-webpage-authorization"
        },
        {
          title: "Log in with WeChat in the Mini Program",
          path: "/guides/wechat-ecosystem/wechat-miniprogram"
        },
        {
          title: "Mobile APP use WeChat login",
          path: "/guides/wechat-ecosystem/wechat-mobile"
        },
        {
          title: "Mobile APP use applet to log in",
          path: "/guides/wechat-ecosystem/wechat-miniprogram-applaunch"
        }
      ]
    },
    {
      title: `Migrate users to ${BRAND_NAME_EN_US}`,
      path: "/guides/migrations/",
      children: [
        {
          title: "Use SDK to import users",
          path: "/guides/migrations/use-api"
        },
        {
          title: "Configure custom password function",
          path: "/guides/migrations/custom-password-script/"
        },
        {
          title:
            "Import users from corporate WeChat, DingTalk and other third-party identity sources",
          path: "/guides/migrations/import-from-third-party-identity-provider/"
        }
      ]
    },
    {
      title: "Management organization",
      path: "/guides/org/",
      children: [
        {
          title: "Create or import an organization",
          path: "/guides/org/create-or-import-org/"
        },
        {
          title: "Management organization",
          path: "/guides/org/manage-org/"
        },
        {
          title: "Manage member life cycle",
          path: "/guides/org/staff-life-cycle-management/"
        },
        {
          title:
            "Use LDAP protocol to open organization data to the outside world",
          path: "/guides/org/ldap-user-directory/"
        }
      ]
    },
    {
      title: "Expandable capabilities",
      path: "/guides/extensibility/",
      children: [
        {
          title: "Use Webhook to monitor user events",
          path: "/guides/webhook/"
        },
        {
          title: "Custom authentication process (Pipeline)",
          path: "/guides/pipeline/",
          children: [
            {
              title: "Create your first Pipeline function",
              path: "/guides/pipeline/write-your-first-pipeline-function"
            },
            {
              title: "Pipeline API Reference",
              path: "/guides/pipeline/pipeline-function-api-doc"
            },
            {
              title: "Pipeline application scenario",
              path: "/guides/pipeline/usage"
            },
            {
              title: "Pipeline User Object",
              path: "/guides/pipeline/user-object"
            },
            {
              title: "Pipeline Context Object",
              path: "/guides/pipeline/context-object"
            },
            {
              title: "Use environment variables in Pipeline",
              path: "/guides/pipeline/env"
            },
            {
              title: "Available Node Modules",
              path: "/guides/pipeline/available-node-modules"
            },
            {
              title: "How to debug",
              path: "/guides/pipeline/how-to-debug"
            },
            {
              title: "FAQ",
              path: "/guides/pipeline/faq"
            },
            {
              title: "Private deployment",
              path: "/guides/pipeline/private-cloud"
            }
          ]
        },
        DATABASE_CONNECTION_MENU_EN,
        {
          title: "Configure custom password function",
          path: "/guides/migrations/custom-password-script/"
        }
      ]
    },

    {
      title: "Audit Log",
      path: "/guides/audit/",
      children: [
        {
          title: "Audit of user behavior",
          path: "/guides/audit/user-action"
        },
        {
          title: "Audit of Administrator Behavior",
          path: "/guides/audit/administrator-action"
        }
      ]
    },
    {
      title: "Configure security information",
      children: [
        {
          title: "Configure Web Security Domain",
          path: "/guides/security/config-domain"
        },
        {
          title: "Configure password strength",
          path: "/guides/security/config-password"
        },
        {
          title: "Configure registration frequency limit",
          path: "/guides/security/config-register-limit"
        },
        {
          title: "Configure the limit on the number of failed login attempts",
          path: "/guides/security/config-login-fail-limit"
        }
      ]
    },
    {
      title: "Configure user pool information",
      children: [
        {
          title: "Modify user pool basic information",
          path: "/guides/userpool-config/basic-config"
        },
        {
          title: "Configure mail service and template",
          path: "/guides/userpool-config/email/"
        },
        {
          title: "Configure SMS service and template",
          path: "/guides/userpool-config/sms/"
        },
        {
          title: "Add user pool collaboration administrator",
          path: "/guides/userpool-config/collaboration-adminstrator"
        },
        {
          title: "Developer Configuration",
          path: "/guides/userpool-config/developer-config"
        }
      ]
    },
    {
      title: "Deployment plan",
      path: "/guides/deployment/",
      children: [
        {
          title: "Basic deployment mode",
          path: "/guides/deployment/bare-metal"
        },
        {
          title: "Docker deployment mode",
          path: "/guides/deployment/docker-compose"
        },
        {
          title: "Kubernetes deployment mode",
          path: "/guides/deployment/kubernetes"
        },
        {
          title: "Custom Domain Name Configuration Scheme",
          path: "/guides/deployment/custom-domain"
        }
      ]
    },
    {
      title: "Frequently Asked Questions FAQs",
      children: [
        {
          title: "How to get user pool ID",
          path: "/guides/faqs/get-userpool-id-and-secret.md"
        },
        {
          title: "How to get the application ID",
          path: "/guides/faqs/get-app-id-and-secret.md"
        },
        {
          title: "How to verify user credentials (token)",
          path: "/guides/faqs/how-to-validate-user-token"
        },
        // {
        // title:'How to identify the source of the user',
        // path:'/guides/faqs/how-to-identify-the-source-users'
        // },
        {
          title: `Join table ${BRAND_NAME_EN_US} in the local user and your business data`,
          path: "/guides/faqs/how-to-join-authing-user-with-your-business-data"
        },
        {
          title: `Impact of disabling third-party cookies on Authing`,
          path: "/guides/faqs/block-third-party-cookie-impact"
        },
        {
          title: "How to deploy a transit proxy server",
          path: "/guides/faqs/how-to-build-a-proxy"
        }
      ]
    }
  ],
  "/reference/": [
    {
      title: "Login component",
      path: "/reference/ui-components/",
      children: [
        {
          title: "React",
          path: "/reference/ui-components/react"
        },
        {
          title: "Vue",
          path: "/reference/ui-components/vue"
        },
        {
          title: "Angular",
          path: "/reference/ui-components/angular"
        },
        {
          title: "Native JavaScript",
          path: "/reference/ui-components/native-javascript"
        },
        {
          title: "Complete parameter list",
          path: "/reference/ui-components/parameters"
        }
      ]
    },
    {
      title: "Single Sign-On (SSO)",
      path: "/reference/sdk-for-sso"
    },
    {
      title: "JavaScript/Node.js",
      path: "/reference/sdk-for-node/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-node/authentication",
          children: [
            {
              title: "User authentication module",
              path:
                "/reference/sdk-for-node/authentication/AuthenticationClient"
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-node/authentication/StandardProtocol"
            },
            {
              title: "Scan code login module",
              path:
                "/reference/sdk-for-node/authentication/QrCodeAuthenticationClient"
            },
            {
              title: "Multi-factor authentication module",
              path:
                "/reference/sdk-for-node/authentication/MfaAuthenticationClient"
            },
            {
              title: "Social login module",
              path:
                "/reference/sdk-for-node/authentication/SocialAuthenticationClient"
            },
            {
              title: "Corporate identity source login module",
              path:
                "/reference/sdk-for-node/authentication/EnterpriseAuthenticationClient"
            },
            {
              title: "Main authentication module",
              path:
                "/reference/sdk-for-node/authentication/PrincipalAuthentication"
            }
          ]
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-node/management",
          children: [
            {
              title: `Management user`,
              path: "/reference/sdk-for-node/management/UsersManagementClient"
            },
            {
              title: "Management application",
              path:
                "/reference/sdk-for-node/management/ApplicationManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-node/management/RolesManagementClient"
            },
            {
              title: "Manage resources and permissions",
              path: "/reference/sdk-for-node/management/AclManagementClient"
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-node/management/GroupsManagementClient"
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-node/management/OrgManagementClient"
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-node/management/UdfManagementClient"
            },
            {
              title: "Management registration white list",
              path:
                "/reference/sdk-for-node/management/WhitelistManagementClient"
            },
            {
              title: "Management user pool configuration",
              path:
                "/reference/sdk-for-node/management/UserpoolManagementClient"
            },
            {
              title: "Management MFA",
              path: "/reference/sdk-for-node/management/MFAManagementClient"
            },
            {
              title: "Management subject certification",
              path:
                "/reference/sdk-for-node/management/PrincipalManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "Java / Kotlin",
      path: "/reference/sdk-for-java/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-java/authentication/",
          children: [
            {
              title: "Certified core module",
              path:
                "/reference/sdk-for-java/authentication/AuthenticationClient"
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-java/authentication/StandardProtocol"
            }
            // '/reference/sdk-for-java/authentication/MfaAuthenticationClient',
          ]
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-java/management",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-java/management/UsersManagementClient"
            },
            {
              title: "Management application",
              path:
                "/reference/sdk-for-java/management/ApplicationManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-java/management/RolesManagementClient"
            },
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-java/management/AclManagementClient"
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-java/management/GroupsManagementClient"
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-java/management/OrgManagementClient"
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-java/management/UdfManagementClient"
            },
            {
              title: "Management registration white list",
              path:
                "/reference/sdk-for-java/management/WhitelistManagementClient"
            },
            {
              title: "Management user pool configuration",
              path:
                "/reference/sdk-for-java/management/UserpoolManagementClient"
            },
            {
              title: "Management log statistics",
              path:
                "/reference/sdk-for-java/management/StatisticsManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "Python",
      path: "/reference/sdk-for-python/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-python/authentication/",
          children: [
            {
              title: "Certified core module",
              path:
                "/reference/sdk-for-python/authentication/AuthenticationClient"
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-python/authentication/StandardProtocol"
            },
            {
              title: "Multi-factor authentication module",
              path:
                "/reference/sdk-for-python/authentication/MfaAuthenticationClient"
            }
          ]
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-python/management",
          children: [
            {
              title: "Manage resources and permissions",
              path: "/reference/sdk-for-python/management/AclManagementClient"
            },
            {
              title: "Management application",
              path:
                "/reference/sdk-for-python/management/ApplicationManagementClient"
            },
            {
              title: "Management groups",
              path:
                "/reference/sdk-for-python/management/GroupsManagementClient"
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-python/management/OrgManagementClient"
            },
            {
              title: "Management strategy",
              path:
                "/reference/sdk-for-python/management/PoliciesManagementClient"
            },
            {
              title: "Management subject certification",
              path:
                "/reference/sdk-for-python/management/PrincipalManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-python/management/RolesManagementClient"
            },
            {
              title: "Management log statistics",
              path:
                "/reference/sdk-for-python/management/StatisticsManagementClient"
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-python/management/UdfManagementClient"
            },
            {
              title: "Management user pool configuration",
              path:
                "/reference/sdk-for-python/management/UserpoolManagementClient"
            },
            {
              title: "Management user",
              path: "/reference/sdk-for-python/management/UsersManagementClient"
            },
            {
              title: "Management registration white list",
              path:
                "/reference/sdk-for-python/management/WhitelistManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "C#",
      path: "/reference/sdk-for-csharp/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-csharp/authentication/"
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-csharp/management",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-csharp/management/UsersManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-csharp/management/RolesManagementClient"
            },
            {
              title: "Management permissions, access control",
              path: "/reference/sdk-for-csharp/management/AclManagementClient"
            },
            {
              title: "Management grouping",
              path:
                "/reference/sdk-for-csharp/management/GroupsManagementClient"
            },
            {
              title: "Management userpool configuration",
              path:
                "/reference/sdk-for-csharp/management/UserpoolManagementClient"
            },
            {
              title: "Management registration white list",
              path:
                "/reference/sdk-for-csharp/management/WhitelistManagementClient"
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-csharp/management/UdfManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "PHP",
      path: "/reference/sdk-for-php/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-php/authentication/"
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-php/management/",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-php/management/UsersManagementClient"
            },
            {
              title: "Management application",
              path:
                "/reference/sdk-for-php/management/ApplicationManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-php/management/RolesManagementClient"
            },
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-php/management/AclManagementClient"
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-php/management/GroupsManagementClient"
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-php/management/OrgManagementClient"
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-php/management/UdfManagementClient"
            },
            {
              title: "Management registration white list",
              path:
                "/reference/sdk-for-php/management/WhitelistManagementClient"
            },
            {
              title: "Management userpool configuration",
              path: "/reference/sdk-for-php/management/UserpoolManagementClient"
            },
            {
              title: "Management MFA",
              path: "/reference/sdk-for-php/management/MFAManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "Go",
      path: "/reference/sdk-for-go/",
      children: [
        {
          title: "User authentication module",
          path: "/reference/sdk-for-go/authentication/",
          children: [
            {
              title: "Certified core module",
              path: "/reference/sdk-for-go/authentication/StandardProtocol"
            }
          ]
        },
        {
          title: "Management module",
          path: "/reference/sdk-for-go/management/UsersManagementClient",
          children: [
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-go/management/AclManagementClient"
            },
            {
              title: "Management user",
              path: "/reference/sdk-for-go/management/UsersManagementClient"
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-go/management/OrgManagementClient"
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-go/management/RolesManagementClient"
            }
          ]
        }
      ]
    },
    {
      title: "Ruby",
      path: "/reference/sdk-for-ruby"
    },
    // {
    //   title: "Delphi",
    //   path: "/reference/sdk-for-delphi"
    // },
    {
      title: "Android",
      path: "/reference/sdk-for-android/",
      children: [
        {
          title: "Get started",
          path: "/reference/sdk-for-android/develop"
        },
        {
          title: "Quick start",
          path: "/reference/sdk-for-android/quick"
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-android/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-android/apis/authentication/"
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-android/apis/protocol/"
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-android/apis/mfa/"
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-android/apis/scan/"
            }
          ]
        },
        {
          title: "Social login",
          path: "/reference/sdk-for-android/social/",
          children: [
            {
              title: "Wechat",
              path: "/reference/sdk-for-android/social/wechat"
            },
            {
              title: "Alipay",
              path: "/reference/sdk-for-android/social/alipay"
            }
          ]
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-android/onpremise"
        }
      ]
    },
    {
      title: "iOS",
      path: "/reference/sdk-for-ios/",
      children: [
        {
          title: "Get started",
          path: "/reference/sdk-for-ios/develop"
        },
        {
          title: "Quick start",
          path: "/reference/sdk-for-ios/quick"
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-ios/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-ios/apis/authentication/"
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-ios/apis/protocol/"
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-ios/apis/mfa/"
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-ios/apis/scan/"
            }
          ]
        },
        {
          title: "Social login",
          path: "/reference/sdk-for-ios/social/",
          children: [
            {
              title: "Wechat",
              path: "/reference/sdk-for-ios/social/wechat"
            },
            {
              title: "Alipay",
              path: "/reference/sdk-for-ios/social/alipay"
            },
            {
              title: "Apple",
              path: "/reference/sdk-for-ios/social/apple"
            }
          ]
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-ios/onpremise"
        }
      ]
    },
    {
      title: "Flutter",
      path: "/reference/sdk-for-flutter/",
      children: [
        {
          title: "Get started",
          path: "/reference/sdk-for-flutter/develop"
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-flutter/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-flutter/apis/authentication/"
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-flutter/apis/protocol/"
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-flutter/apis/mfa/"
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-flutter/apis/scan/"
            }
          ]
        },
        {
          title: "Social login",
          path: "/reference/sdk-for-flutter/social/"
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-flutter/onpremise"
        }
      ]
    },
    {
      title: "React Native",
      path: "/reference/sdk-for-react-native"
    },
    {
      title: "WeChat Mini Program",
      path: "/reference/sdk-for-wxapp"
    },
    {
      title: "WeChat webpage authorization",
      path: "/reference/sdk-for-wxmp"
    },
    {
      title: "Framework Integration",
      path: "/reference/frameworks"
    },
    {
      title: "Error code",
      path: "/reference/error-code"
    }
  ],
  "/concepts/": [
    {
      title: `What is ${BRAND_NAME_EN_US}`,
      path: "/concepts/"
    },
    {
      title: "What is the user pool",
      path: "/concepts/user-pool"
    },
    {
      title: "What is an application",
      path: "/concepts/application"
    },
    {
      title: "What is certification",
      path: "/concepts/authentication"
    },
    {
      title: "What is federal certification",
      path: "/concepts/federation"
    },
    {
      title: "What is authorization",
      path: "/concepts/authorization"
    },
    {
      title: "Authentication vs authorization",
      path: "/concepts/authentication-vs-authorization"
    },
    {
      title: "What is JWT Token",
      path: "/concepts/jwt-token"
    },
    {
      title: "What is ID Token",
      path: "/concepts/id-token"
    },
    {
      title: "What is Access Token",
      path: "/concepts/access-token"
    },
    {
      title: "What is Refresh Token",
      path: "/concepts/refresh-token"
    },
    {
      title: "Access Token vs Id Token",
      path: "/concepts/access-token-vs-id-token"
    },
    {
      title: "OIDC FAQ",
      path: "/concepts/oidc-common-questions"
    },
    {
      title: "Understand the SAML2 protocol",
      children: [
        {
          title: "SAML2 Summary",
          path: "/concepts/saml/saml-overview"
        },
        {
          title: "SAML2 Process",
          path: "/concepts/saml/saml-flow"
        }
        // {
        // title:'SAML2 FAQ',
        // path:'/concepts/saml/faq'
        // },
      ]
    },
    {
      title: "Understand OIDC and OAuth2.0 protocol",
      children: [
        {
          title: "Overview of OIDC and OAuth2.0",
          path: "/concepts/oidc/oidc-overview"
        },
        {
          title: "Select OIDC authorization mode",
          path: "/concepts/oidc/choose-flow"
        }
      ]
    },
    {
      title: "What is multi-factor authentication",
      path: "/concepts/mfa"
    },
    {
      title: "Account Lifecycle Management",
      path: "/concepts/account-life-cycle-management"
    },
    {
      title: "Hosted login page vs embeddable login component",
      path: "/concepts/embeded-vs-hosted"
    },
    {
      title: "CIAM and EIAM",
      path: "/concepts/ciam-and-eiam"
    },
    {
      title: "What is LDAP",
      path: "/concepts/ldap"
    },
    {
      title: "Principle of Scan Code Login",
      path: "/concepts/how-qrcode-works"
    }
  ],
  "/integration/": []
};

const addPrefixToLink = (navbar, prefix) => {
  if (!navbar) {
    return;
  }
  return navbar.map(item => ({
    ...item,
    path: item.path && `${prefix}${item.path}`,
    children:
      item.children &&
      item.children.map(link => {
        if (typeof link === "string") {
          return `${prefix}${link}`;
        }
        return {
          ...link,
          path: `${prefix}${link.path}`,
          children: addPrefixToLink(link.children, prefix)
        };
      })
  }));
};

/**
 * 给所有路径加上 /en
 */
const getEnUsNavBar = sidebars => {
  const enUsNavBar = {};

  for (let attr in sidebars) {
    enUsNavBar[`/en${attr}`] = addPrefixToLink(sidebars[attr], "/en");
  }

  return enUsNavBar;
};

module.exports = {
  zhCnNavBar,
  enUsNavBar: getEnUsNavBar(translatedZhCnNavBar),
  BRAND_NAME_ZH_CN,
  BRAND_NAME_EN_US
};
