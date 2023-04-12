const BRAND_NAME_ZH_CN = "Authing";
const BRAND_NAME_ZH_CN_LOWER_CASE = "authing";
const BRAND_NAME_EN_US = "Authing";
const BRAND_NAME_EN_US_LOWER_CASE = "authing";

const DATABASE_CONNECTION_MENU_EN = {
  title: "Custom database",
  path: "/guides/database-connection/overview.html",
  children: [
    {
      title: "Configure database connection and scripting",
      path: "/guides/database-connection/configuration/",
    },
    {
      title: `Lazy migration of users to ${BRAND_NAME_EN_US}`,
      path: "/guides/database-connection/lazy-migration",
    },
    {
      title: "Fully use a custom database to save user data",
      path: "/guides/database-connection/custom-user-store.md",
    },
    {
      title: "Best Practice",
      path: "/guides/database-connection/best-practices.md",
    },
  ],
};

/**
 * 中文菜单
 */
const zhCnNavBar = {
  "/quickstarts/": [
    {
      title: "单页 Web 应用",
      path: "/quickstarts/spa/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "React",
          path: "/quickstarts/spa/react",
        },
      ],
    },
    {
      title: "标准 Web 应用",
      path: "/quickstarts/webApp/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "Node.js Express Web App",
          path: "/quickstarts/webApp/nodeJsExpress",
        },
      ],
    },
    {
      title: "后端 / API 服务",
      path: "/quickstarts/apiServer/",
      redirect: "/quickstarts/",
      children: [
        {
          title: "Node.js Express API",
          path: "/quickstarts/apiServer/nodeJsExpress/",
        },
      ],
    },
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
              path: "/guides/basics/authenticate-first-user/use-hosted-login-page",
            },
            {
              title: "使用内嵌登录组件完成认证",
              path: "/guides/basics/authenticate-first-user/use-embeded-login-component/",
            },
            {
              title: "使用 API & SDK 完成认证",
              path: "/guides/basics/authenticate-first-user/use-api-sdk/",
            },
            {
              title: "验证用户身份凭证（token）",
              path: "/guides/basics/authenticate-first-user/how-to-validate-user-token",
            },
            {
              title: `对用户进行权限管理`,
              path: "/guides/basics/authenticate-first-user/how-to-implement-access-control",
            },
            {
              title: "退出登录",
              path: "/guides/basics/authenticate-first-user/how-to-logout-user",
            },
            {
              title: "接下来你可能需要",
              path: "/guides/basics/authenticate-first-user/what-to-do-next",
            },
          ],
        },
        {
          title: "不同类型应用的接入方式",
          children: [
            {
              title: `在标准 Web 应用中集成 ${BRAND_NAME_ZH_CN}`,
              path: "/guides/basics/platform-guide/integrate-with-regular-web-app",
            },
            {
              title: `在单页 Web 应用中集成 ${BRAND_NAME_ZH_CN}`,
              path: "/guides/basics/platform-guide/integrate-with-spa",
            },
            {
              title: `在客户端应用中集成 ${BRAND_NAME_ZH_CN}`,
              path: "/guides/basics/platform-guide/integrate-with-mobile-app",
            },
            // {
            //   title: `在后端 API 服务中接入 ${BRAND_NAME_ZH_CN}`,
            //   path:
            //     "/guides/basics/platform-guide/integrate-with-backend-app",
            // },
          ],
        },
        {
          title: "体验期",
          path: "/guides/basics/trial/",
          children: [
            {
              title: `管理员相关操作`,
              path: "/guides/basics/trial/admin",
            },
            {
              title: `终端用户相关操作`,
              path: "/guides/basics/trial/end-user",
            },
          ],
        },
        {
          title: "控制台概览",
          path: "/guides/basics/console/",
        },
      ],
    },
    {
      title: "对用户进行认证",
      path: "/guides/authentication/",
      children: [
        {
          title: "使用账号密码认证",
          path: "/guides/authentication/basic/password/",
        },
        {
          title: "使用短信验证码认证",
          path: "/guides/authentication/basic/sms/",
        },
        {
          title: "使用社会化登录认证",
          path: "/guides/authentication/social/",
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
              path: "/guides/authentication/qrcode/use-self-build-app/overview",
              children: [
                {
                  title: "概述",
                  path: "/guides/authentication/qrcode/use-self-build-app/overview",
                },
                {
                  title: "完整接口列表",
                  path: "/guides/authentication/qrcode/use-self-build-app/full-api-list",
                },
                {
                  title: "自定义配置项",
                  path: "/guides/authentication/qrcode/use-self-build-app/customize-settings",
                },
              ],
            },
            {
              title: "使用小程序扫码登录网站",
              path: "/guides/authentication/qrcode/use-wechat-miniprogram/",
            },
          ],
        },
        {
          title: "在小程序中进行认证",
          path: "/guides/authentication/wechat-mini-program/",
        },
        {
          title: "手机号一键登录",
          path: "/guides/oneauth/",
        },
        {
          title: "实现单点登录（SSO）",
          path: "/guides/app-new/sso/",
        },
        {
          title: "在移动端实现单点登录",
          path: "/guides/authentication/mobile-sso/",
        },
        {
          title: "多因素认证",
          path: "/guides/security/mfa/",
        },
        {
          title: "对认证流程进行扩展",
          children: [
            {
              title: "添加用户自定义字段",
              path: "/guides/authentication/extensibility/user-defined-field",
            },
            {
              title: "添加角色自定义字段",
              path: "/guides/authentication/extensibility/role-extend",
            },
            {
              title: "添加部门自定义字段",
              path: "/guides/authentication/extensibility/department-extend",
            },
            {
              title: "IdToken 添加自定义字段",
              path: "/guides/authentication/extensibility/customize-id-token",
            },
            {
              title: "使用自定义数据库对用户进行认证",
              path: "/guides/authentication/extensibility/database-connection",
            },
            {
              title: "使用 Pipeline 对认证流程进行扩展",
              path: "/guides/authentication/extensibility/pipeline",
            },
            {
              title: "使用 Webhook 监听认证事件",
              path: "/guides/authentication/extensibility/webhook",
            },
          ],
        },
        {
          title: "对登录框进行个性化配置",
          path: "/guides/authentication/branding/",
        },
      ],
    },
    {
      title: "对用户进行权限管理",
      path: "/guides/access-control/",
      children: [
        {
          title: "选择合适的权限模型",
          path: "/guides/access-control/choose-the-right-access-control-model",
        },
        {
          title: `集成 RBAC 权限模型到你的应用系统`,
          path: "/guides/access-control/rbac",
        },
        {
          title: `集成 ABAC 权限模型到你的应用系统`,
          path: "/guides/access-control/abac",
        },
        {
          title: `使用权限分组管理权限资源`,
          path: "/guides/access-control/resource-group",
        },
        {
          title: `管理资源权限`,
          path: "/guides/access-control/resource-acl",
        },
      ],
    },
    {
      title: "授权",
      path: "/guides/authorization/",
      children: [
        {
          title: "用户许可的资源授权",
          path: "/guides/authorization/user-consent-authz",
        },
        {
          title: "机器间（M2M）授权",
          path: "/guides/authorization/m2m-authz",
        },
      ],
    },
    {
      title: "管理用户账号",
      path: "/guides/user/",
      children: [
        {
          title: "用户字段释义",
          path: "/guides/user/user-profile",
        },
        {
          title: "管理员创建账号",
          path: "/guides/user/create-user/",
        },
        // {
        //   title: "账号生命周期管理",
        //   path: "/guides/user/life-cycle-management",
        // },
        {
          title: "管理用户账号",
          path: "/guides/user/manage-profile",
        },
        // {
        //   title: '给用户添加角色、分配权限',
        //   path: '/guides/user/role-and-permission'
        // },
        {
          title: "绑定账号",
          path: "/guides/user/bind-social-account",
        },
        {
          title: "管理用户的自定义数据",
          path: "/guides/user/user-defined-field/",
        },
        {
          title: "查看用户的登录历史记录",
          path: "/guides/user/login-history",
        },
        {
          title: "查看用户的地理位置",
          path: "/guides/user/geo",
        },
        {
          title: "增强账号的安全性",
          path: "/guides/user/security",
        },
        {
          title: "管理用户的登录态",
          path: "/guides/user/login-state",
        },
        {
          title: "控制用户能访问哪些应用",
          path: "/guides/user/application-access",
        },
        {
          title: "用户组管理",
          path: "/guides/user/user-group",
        },
      ],
    },
    {
      title: "管理用户目录",
      path: "/guides/users/",
      children: [
        {
          title: "用户目录配置项",
          path: "/guides/users/settings",
        },
        {
          title: "添加自定义用户字段",
          path: "/guides/users/user-defined-field/",
        },
        {
          title: "搜索用户",
          path: "/guides/users/search",
        },
        {
          title: "使用 LDAP 用户目录",
          path: "/guides/users/ldap-user-directory",
        },
      ],
    },
    {
      title: "同步中心",
      path: "/guides/sync-new/",
      children: [
        {
          title: "创建同步任务",
          path: "/guides/sync-new/create-sync-new/",
          children: [
            {
              title: "获取应用配置信息和权限",
              path: "/guides/sync-new/create-sync-new/get-config-new/",
              children: [
                {
                  title: "获取飞书配置项和权限",
                  path: "/guides/sync-new/create-sync-new/get-config-new/feishu",
                },
                {
                  title: "获取企业微信配置项和权限",
                  path: "/guides/sync-new/create-sync-new/get-config-new/wechatwork",
                },
                {
                  title: "获取钉钉配置项和权限",
                  path: "/guides/sync-new/create-sync-new/get-config-new/dingding",
                },
                {
                  title: "获取纷享销客配置项和权限",
                  path: "/guides/sync-new/create-sync-new/get-config-new/fxiaoke",
                },
                {
                  title: "获取其他应用配置项和权限",
                  path: "/guides/sync-new/create-sync-new/get-config-new/others",
                },
              ],
            },
            {
              title: "筛选同步范围",
              path: "/guides/sync-new/create-sync-new/sync-scope-new",
            },
            {
              title: "配置同步字段映射",
              path: "/guides/sync-new/create-sync-new/field-mapping-new",
            },
            {
              title: "配置同步时机",
              path: "/guides/sync-new/create-sync-new/sync-type-new",
            },
            {
              title: "配置同步策略",
              path: "/guides/sync-new/create-sync-new/sync-policy-new",
            },
          ],
        },
        {
          title: "执行同步任务",
          path: "/guides/sync-new/perform-sync-new",
        },
        {
          title: "处理删除保护",
          path: "/guides/sync-new/risky-operation",
        },
        {
          title: "维护同步任务",
          path: "/guides/sync-new/maintain-sync",
        },
      ],
    },
    {
      title: "应用",
      path: "/guides/app-new/",
      children: [
        {
          title: "自建应用",
          path: "/guides/app-new/create-app/",
          children: [
            {
              title: "创建自建应用",
              path: "/guides/app-new/create-app/create-app",
            },
            {
              title: "快速开始",
              path: "/guides/app-new/create-app/quick-start",
            },
            {
              title: "应用配置",
              path: "/guides/app-new/create-app/app-configuration",
            },
            {
              title: "协议配置",
              path: "/guides/app-new/create-app/protocol-config",
              children: [
                {
                  title: "配置 OIDC 协议",
                  path: "/guides/federation/oidc",
                },
                {
                  title: "自定义 OIDC Scope",
                  path: "/guides/app-new/create-app/oidc-scope",
                },
                {
                  title: "配置 OAuth 协议",
                  path: "/guides/federation/oauth",
                },
                {
                  title: "配置 SAML 协议",
                  path: "/guides/federation/saml",
                },
                {
                  title: "配置 CAS 协议",
                  path: "/guides/federation/cas",
                },
              ],
            },
            {
              title: "登录控制",
              path: "/guides/app-new/create-app/login-control",
            },
            {
              title: "访问授权",
              path: "/guides/app-new/create-app/application-access-control",
            },
            {
              title: "品牌化",
              path: "/guides/app-new/create-app/customize-guard",
            },
            {
              title: "安全管理",
              path: "/guides/app-new/create-app/security-management",
            },
            {
              title: "高级配置",
              path: "/guides/app-new/create-app/advanced-settings",
            },
            {
              title: "租户配置",
              path: "/guides/app-new/create-app/tenant-config",
            },
          ],
        },
        {
          title: "单点登录 SSO",
          path: "/guides/app-new/sso/",
          children: [
            {
              title: "应用面板",
              path: "/guides/dashboard/",
            },
            {
              title: "集成应用 SSO 方案",
              path: "/guides/apn/",
              children: [],
            },
            {
              title: "自建应用 SSO 方案",
              path: "/guides/app-new/sso/create-app-sso.md",
            },
            {
              title: "第三方 SSO 方案",
              path: "/guides/app-new/sso/third-party-sso/",
              children: [
                {
                  title: "飞书工作台 SSO 方案",
                  path: "/guides/lark-sso/",
                },
                {
                  title: "企业微信 SSO 方案",
                  path: "/guides/qiwei-sso/",
                },
                {
                  title: "钉钉 SSO 方案",
                  path: "/guides/dingding-sso/",
                },
                {
                  title: "WeLink SSO 方案",
                  path: "/guides/welink-sso/",
                },
              ],
            },
            {
              title: "ASA 表单代填",
              path: "/guides/asa/",
            },
          ],
        },
      ],
    },
    {
      title: "成为联邦认证身份源",
      path: "/guides/federation/",
      children: [
        {
          title: "成为 OpenID Connect 身份源",
          path: "/guides/federation/oidc.md",
        },
        {
          title: "成为 OAuth2.0 身份源",
          path: "/guides/federation/oauth.md",
        },
        {
          title: "成为 SAML2 身份源",
          path: "/guides/federation/saml.md",
        },
        {
          title: "成为 CAS 身份源",
          path: "/guides/federation/cas.md",
        },
      ],
    },
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
              path: "/guides/basics/authenticate-first-user/use-hosted-login-page",
            },
            {
              title:
                "Use the embedded login component to complete the authentication",
              path: "/guides/basics/authenticate-first-user/use-embeded-login-component/",
            },
            {
              title: "Use API & SDK to complete authentication",
              path: "/guides/basics/authenticate-first-user/use-api-sdk/",
            },
            {
              title: "Verify user credentials (token)",
              path: "/guides/basics/authenticate-first-user/how-to-validate-user-token",
            },
            {
              title: `Authority management for users`,
              path: "/guides/basics/authenticate-first-user/how-to-implement-access-control",
            },
            {
              title: "Realize logout",
              path: "/guides/basics/authenticate-first-user/how-to-logout-user",
            },
            {
              title: "Next you may need",
              path: "/guides/basics/authenticate-first-user/what-to-do-next",
            },
          ],
        },
        {
          title: "Access methods for different types of applications",
          path: "/guides/basics/platform-guide/integrate-with-regular-web-app",
          children: [
            {
              title: `Integrate ${BRAND_NAME_EN_US} in traditional Web App`,
              path: "/guides/basics/platform-guide/integrate-with-regular-web-app",
            },
            {
              title: `Integrate in Single Page Application (SPA) ${BRAND_NAME_EN_US}`,
              path: "/guides/basics/platform-guide/integrate-with-spa",
            },
            {
              title: `Integrate in mobile terminal (iOS, Andriod) ${BRAND_NAME_EN_US}`,
              path: "/guides/basics/platform-guide/integrate-with-mobile-app",
            },
            // {
            // title: `Access ${BRAND_NAME_EN_US} in the back-end API service`,
            // path:
            // "/guides/basics/platform-guide/integrate-with-backend-app",
            // },
          ],
        },
        {
          title: "Console overview",
          path: "/guides/basics/console/",
        },
      ],
    },
    {
      title: "Authenticate the user",
      path: "/guides/authentication/",
      children: [
        {
          title: "Use account password authentication",
          path: "/guides/authentication/basic/password/",
        },
        {
          title: "Use SMS verification code authentication",
          path: "/guides/authentication/basic/sms/",
        },
        {
          title: "Use social login authentication",
          path: "/guides/authentication/social/",
        },
        // {
        // title: "Use social login authentication on the mobile terminal",
        // path: "/guides/authentication/social/mobile/",
        // },
        {
          title: "Use scan code login authentication",
          children: [
            {
              title:
                "Use self-built App to scan the code to log in to the website",
              path: "/guides/authentication/qrcode/use-self-build-app/overview",
              children: [
                {
                  title: "Overview",
                  path: "/guides/authentication/qrcode/use-self-build-app/overview",
                },
                {
                  title: "Complete interface list",
                  path: "/guides/authentication/qrcode/use-self-build-app/full-api-list",
                },
                {
                  title: "Custom configuration items",
                  path: "/guides/authentication/qrcode/use-self-build-app/customize-settings",
                },
              ],
            },
            {
              title:
                "Use the mini program to scan the code to log in to the website",
              path: "/guides/authentication/qrcode/use-wechat-miniprogram/",
            },
          ],
        },
        {
          title: "Certify in Mini Program",
          path: "/guides/authentication/wechat-mini-program/",
        },
        {
          title: "Implement single sign-on (SSO)",
          path: "/guides/authentication/sso/",
        },
        {
          title: "Single sign-on on the mobile terminal",
          path: "/guides/authentication/mobile-sso/",
        },
        {
          title: "Multi-factor authentication (MFA)",
          path: "/guides/authentication/mfa/",
          children: [
            {
              title:
                "MFA of one-time password (TOTP) based on timestamp algorithm",
              path: "/guides/authentication/mfa/totp",
            },
            {
              title: "MFA based on SMS verification code",
              path: "/guides/authentication/mfa/sms",
            },
            {
              title: "MFA based on email verification code",
              path: "/guides/authentication/mfa/email-code",
            },
            {
              title: "Access MFA through SDK",
              path: "/guides/authentication/mfa/mfa-sdk",
            },
          ],
        },
        {
          title: "Extend the authentication process",
          path: "/guides/authentication/extensibility/user-defined-field",
          children: [
            {
              title: "Add user-defined fields",
              path: "/guides/authentication/extensibility/user-defined-field",
            },
            {
              title: "IdToken add custom field",
              path: "/guides/authentication/extensibility/customize-id-token",
            },
            {
              title: "Use a custom database to authenticate users",
              path: "/guides/authentication/extensibility/database-connection",
            },
            {
              title: "Use Pipeline to extend the authentication process",
              path: "/guides/authentication/extensibility/pipeline",
            },
            {
              title: "Use Webhook to monitor authentication events",
              path: "/guides/authentication/extensibility/webhook",
            },
          ],
        },
        {
          title: "Personalize the guard",
          path: "/guides/authentication/branding/",
        },
      ],
    },
    {
      title: "Authority management for users",
      path: "/guides/access-control/",
      children: [
        {
          title: "Choose the appropriate permission model",
          path: "/guides/access-control/choose-the-right-access-control-model",
        },
        {
          title: `Integrate RBAC permission model into your application system`,
          path: "/guides/access-control/rbac",
        },
        {
          title: `Integrate ABAC permission model into your application system`,
          path: "/guides/access-control/abac",
        },
        {
          title: `Use permission group management permission resources`,
          path: "/guides/access-control/resource-group",
        },
        {
          title: `Manage resource permissions`,
          path: "/guides/access-control/resource-acl",
        },
      ],
    },
    {
      title: "Authorization",
      path: "/guides/authorization/",
      children: [
        {
          title: "Inter-application authorization for user permission",
          path: "/guides/authorization/user-consent-authz",
        },
        {
          title: "M2M authorization",
          path: "/guides/authorization/m2m-authz",
        },
      ],
    },
    {
      title: "Manage user accounts",
      path: "/guides/user/",
      children: [
        {
          title: "User field interpretation",
          path: "/guides/user/user-profile",
        },
        {
          title: "Administrator create account",
          path: "/guides/user/create-user/",
        },
        // {
        // title: "Account Lifecycle Management",
        // path: "/guides/user/life-cycle-management",
        // },
        {
          title: "Manage user accounts",
          path: "/guides/user/manage-profile",
        },
        // {
        // title:'Add roles and assign permissions to users',
        // path:'/guides/user/role-and-permission'
        // },
        {
          title: "Binding account",
          path: "/guides/user/bind-social-account",
        },
        {
          title: "Manage user's custom data",
          path: "/guides/user/user-defined-field/",
        },
        {
          title: "View user's login history",
          path: "/guides/user/login-history",
        },
        {
          title: "View the user's geographic location",
          path: "/guides/user/geo",
        },
        {
          title: "Enhance account security",
          path: "/guides/user/security",
        },
        {
          title: "Manage user login status",
          path: "/guides/user/login-state",
        },
        {
          title: "Control which applications users can access",
          path: "/guides/user/application-access",
        },
        {
          title: "User groups",
          path: "/guides/user/user-group",
        },
      ],
    },
    {
      title: "Manage User Directory",
      path: "/guides/users/",
      children: [
        {
          title: "User Directory Configuration Item",
          path: "/guides/users/settings",
        },
        {
          title: "Add custom user field",
          path: "/guides/users/user-defined-field/",
        },
        {
          title: "Search users",
          path: "/guides/users/search",
        },
        {
          title: "Use LDAP user directory",
          path: "/guides/users/ldap-user-directory",
        },
      ],
    },
    {
      title: "Management Application",
      path: "/guides/app/",
      children: [
        {
          title: "Create Application",
          path: "/guides/app/create-app",
        },
        {
          title: "Configure login and registration method",
          path: "/guides/app/config-login-methods",
        },
        {
          title: "Add registration agreement",
          path: "/guides/app/agreements",
        },
        {
          title: "Customize login box style",
          path: "/guides/app/custom-styles",
        },
        {
          title: "Security management",
          path: "/guides/app/security-management",
        },
        {
          title: "Become a source of federal authentication identity",
          path: "/guides/app/identity-provider",
        },
        {
          title: "Enable multi-factor authentication",
          path: "/guides/app/mfa",
        },
        {
          title: "Sub-account management",
          path: "/guides/app/sub-account",
        },
        {
          title: "Implement single sign-on between applications",
          path: "/guides/app/sso",
        },
        {
          title: "Manage user login status",
          path: "/guides/app/session-management",
        },
      ],
    },
    {
      title: "Become a source of federal authentication identity",
      path: "/guides/federation/",
      children: [
        {
          title: "Become an OpenID Connect Identity Source",
          path: "/guides/federation/oidc.md",
        },
        {
          title: "Become OAuth2.0 Identity Source",
          path: "/guides/federation/oauth.md",
        },
        {
          title: "Become a SAML2 identity source",
          path: "/guides/federation/saml.md",
        },
        {
          title: "Become a CAS Identity Source",
          path: "/guides/federation/cas.md",
        },
      ],
    },
    {
      title: "Connect to an external identity provider (IdP)",
      path: "/guides/connections/",
      children: [
        {
          title: "Social Identity Provider",
          path: "/guides/connections/social.html",
          children: [
            {
              title: "WeChat QR Code on PC",
              path: "/guides/connections/social/wechat-pc/",
            },
            {
              title: "Mini Program QR Code on PC",
              path: "/guides/connections/social/wechat-miniprogram-qrconnect/",
            },
            {
              title: "WeChat Official Accounts QR Code",
              path: "/guides/connections/social/wechatmp-qrcode/",
            },
            {
              title: "Mobile App Use WeChat Login",
              path: "/guides/connections/social/wechat-mobile/",
            },
            {
              title: "Mobile App Use WeChat Mini Program Login",
              path: "/guides/connections/social/wechat-miniprogram-applaunch/",
            },
            {
              title: "WeChat Web Page",
              path: "/guides/connections/social/wechat-mp/",
            },
            {
              title: "WeChat Mini Program",
              path: "/guides/connections/social/wechat-miniprogram/",
            },
            {
              title: "Tencent QQ",
              path: "/guides/connections/social/qq/",
            },
            {
              title: "Sina Weibo",
              path: "/guides/connections/social/weibo/",
            },
            {
              title: "GitHub",
              path: "/guides/connections/social/github/",
            },
            {
              title: "Facebook",
              path: "/guides/connections/social/facebook/",
            },
            {
              title: "Twitter",
              path: "/guides/connections/social/twitter/",
            },
            {
              title: "Google",
              path: "/guides/connections/social/google/",
            },
            {
              title: "Apple Mobile",
              path: "/guides/connections/social/apple-mobile/",
            },
            {
              title: "Apple Web",
              path: "/guides/connections/social/apple-web/",
            },
            {
              title: "Alipay",
              path: "/guides/connections/social/alipay-web/",
            },
            {
              title: "Slack",
              path: "/guides/connections/social/slack/",
            },
            {
              title: "Gitee",
              path: "/guides/connections/social/gitee/",
            },
            {
              title: "GitLab",
              path: "/guides/connections/social/gitlab/",
            },
            {
              title: "Baidu",
              path: "/guides/connections/social/baidu/",
            },
            {
              title: "NetEase YIDUN",
              path: "/guides/connections/social/yidun/",
            },
            {
              title: "QingCloud",
              path: "/guides/connections/social/qingcloud/",
            },
            {
              title: "Instagram",
              path: "/guides/connections/social/instagram/",
            },
            {
              title: "LinkedIn",
              path: "/guides/connections/social/linkedin/",
            },
          ],
        },
        {
          title: "Enterprise Identity Provider",
          path: "/guides/connections/enterprise.html",
          children: [
            {
              title: "WeCom Self-built App QR Code",
              path: "/guides/connections/enterprise/wecom-corp-qrconnect/",
            },
            {
              title:
                "WeCom Self-built App QR Code Login(Delegated Development Mode)",
              path: "/guides/connections/enterprise/wecom-agency-qrconnect/",
            },
            {
              title: "WeCom Service Provider App QR Code",
              path: "/guides/connections/enterprise/wecom-service-provider-qrconnect/",
            },
            {
              title: "WeCom Mobile",
              path: "/guides/connections/enterprise/wecom-mobile/",
            },
            {
              title: "DingTalk H5 Micro Application (Internal Development)",
              path: "/guides/connections/enterprise/dingtalk/",
            },
            {
              title: "Feishu Marketplace App",
              path: "/guides/connections/enterprise/lark-public/",
            },
            {
              title: "Feishu Custom App",
              path: "/guides/connections/enterprise/lark-internal/",
            },
            {
              title: "Windows AD",
              path: "/guides/connections/enterprise/windows-ad/",
            },
            {
              title: "AD Quick Login",
              path: "/guides/connections/enterprise/ad-kerberos/",
            },
            {
              title: "Azure AD",
              path: "/guides/connections/enterprise/azure-ad/",
            },
            {
              title: "OIDC",
              path: "/guides/connections/enterprise/oidc/",
            },
            {
              title: "OAuth 2.0",
              path: "/guides/connections/enterprise/oauth2/",
            },
            {
              title: "LDAP",
              path: "/guides/connections/enterprise/ldap/",
            },
            {
              title: "SAML",
              path: "/guides/connections/enterprise/saml/",
            },
            {
              title: "CAS",
              path: "/guides/connections/enterprise/cas/",
            },
            {
              title: "WeLink",
              path: "/guides/connections/enterprise/welink/",
            },
          ],
        },
        DATABASE_CONNECTION_MENU_EN,
      ],
    },
    {
      title: "Open up WeChat ecology",
      path: "/guides/wechat-ecosystem/",
      // children: [
      //   {
      //     title: "PC website uses WeChat scan code to log in",
      //     path: "/guides/wechat-ecosystem/wechat-pc/"
      //   },
      //   {
      //     title: "PC website use small program to scan code login",
      //     path: "/guides/wechat-ecosystem/wechat-miniprogram-qrcode/"
      //   },
      //   {
      //     title:
      //       "Use WeChat authorization to log in to the web page within WeChat",
      //     path: "/guides/wechat-ecosystem/wechat-webpage-authorization"
      //   },
      //   {
      //     title: "Log in with WeChat in the Mini Program",
      //     path: "/guides/wechat-ecosystem/wechat-miniprogram"
      //   },
      //   {
      //     title: "Mobile APP use WeChat login",
      //     path: "/guides/wechat-ecosystem/wechat-mobile"
      //   },
      //   {
      //     title: "Mobile APP use applet to log in",
      //     path: "/guides/wechat-ecosystem/wechat-miniprogram-applaunch"
      //   }
      // ]
    },
    {
      title: `Migrate users to ${BRAND_NAME_EN_US}`,
      path: "/guides/migrations/",
      children: [
        {
          title: "Use SDK to import users",
          path: "/guides/migrations/use-api",
        },
        {
          title: "Configure custom password function",
          path: "/guides/extensibility/custom-password-script",
        },
        {
          title:
            "Import users from corporate WeChat, DingTalk and other third-party identity sources",
          path: "/guides/migrations/import-from-third-party-identity-provider/",
        },
      ],
    },
    {
      title: "Management organization",
      path: "/guides/org/",
      children: [
        {
          title: "Create or import an organization",
          path: "/guides/org/create-or-import-org/",
        },
        {
          title: "Management organization",
          path: "/guides/org/manage-org/",
        },
        {
          title: "Manage member life cycle",
          path: "/guides/org/staff-life-cycle-management/",
        },
        {
          title:
            "Use LDAP protocol to open organization data to the outside world",
          path: "/guides/org/ldap-user-directory/",
        },
      ],
    },
    {
      title: "Expandable capabilities",
      path: "/guides/extensibility/",
      children: [
        {
          title: "Use Webhook to monitor user events",
          path: "/guides/webhook/",
        },
        {
          title: "Custom authentication process (Pipeline)",
          path: "/guides/pipeline/",
          children: [
            {
              title: "Create your first Pipeline function",
              path: "/guides/pipeline/write-your-first-pipeline-function",
            },
            {
              title: "Pipeline API Reference",
              path: "/guides/pipeline/pipeline-function-api-doc",
            },
            {
              title: "Pipeline application scenario",
              path: "/guides/pipeline/usage",
            },
            {
              title: "Pipeline User Object",
              path: "/guides/pipeline/user-object",
            },
            {
              title: "Pipeline Context Object",
              path: "/guides/pipeline/context-object",
            },
            {
              title: "Use environment variables in Pipeline",
              path: "/guides/pipeline/env",
            },
            {
              title: "Available Node Modules",
              path: "/guides/pipeline/available-node-modules",
            },
            {
              title: "How to debug",
              path: "/guides/pipeline/how-to-debug",
            },
            {
              title: "FAQ",
              path: "/guides/pipeline/faq",
            },
            {
              title: "Private deployment",
              path: "/guides/pipeline/private-cloud",
            },
          ],
        },
        // DATABASE_CONNECTION_MENU_EN,
      ],
    },

    {
      title: "Audit Log",
      path: "/guides/audit/",
      children: [
        {
          title: "Audit of user behavior",
          path: "/guides/audit/user-action",
        },
        {
          title: "Audit of Administrator Behavior",
          path: "/guides/audit/administrator-action",
        },
      ],
    },
    {
      title: "Configure security information",
      children: [
        {
          title: "General security",
          children: [
            {
              title: "Configure web security domain",
              path: "/guides/security/config-domain",
            },
            {
              title: "Configure registration frequency limit",
              path: "/guides/security/config-register-limit",
            },
            {
              title:
                "Configure the limit on the number of failed login attempts",
              path: "/guides/security/config-login-fail-limit",
            },
          ],
        },
        {
          title: "Configure password security",
          children: [
            {
              title: "Configure password policy",
              path: "/guides/security/pw-security/config-password",
            },
            {
              title: "Configure user-defined password function",
              path: "/guides/security/pw-security/custom-password-script",
            },
          ],
        },
      ],
    },
    {
      title: "Configure user pool information",
      children: [
        {
          title: "Modify user pool basic information",
          path: "/guides/userpool-config/basic-config",
        },
        {
          title: "Configure mail service and template",
          path: "/guides/userpool-config/email/",
        },
        {
          title: "Configure SMS service and template",
          path: "/guides/userpool-config/sms/",
        },
        {
          title: "Add user pool collaboration administrator",
          path: "/guides/userpool-config/collaboration-adminstrator",
        },
        {
          title: "Developer Configuration",
          path: "/guides/userpool-config/developer-config",
        },
      ],
    },
    {
      title: "Deployment plan",
      path: "/guides/deployment/",
      children: [
        {
          title: "Basic deployment mode",
          path: "/guides/deployment/bare-metal",
        },
        {
          title: "Docker deployment mode",
          path: "/guides/deployment/docker-compose",
        },
        {
          title: "Kubernetes deployment mode",
          path: "/guides/deployment/kubernetes",
        },
        {
          title: "Custom Domain Name Configuration Scheme",
          path: "/guides/deployment/custom-domain",
        },
      ],
    },
    {
      title: "Frequently Asked Questions FAQs",
      children: [
        {
          title: "How to get user pool ID",
          path: "/guides/faqs/get-userpool-id-and-secret.md",
        },
        {
          title: "How to get the application ID",
          path: "/guides/faqs/get-app-id-and-secret.md",
        },
        {
          title: "How to verify user credentials (token)",
          path: "/guides/faqs/how-to-validate-user-token",
        },
        // {
        // title:'How to identify the source of the user',
        // path:'/guides/faqs/how-to-identify-the-source-users'
        // },
        {
          title: `Join table ${BRAND_NAME_EN_US} in the local user and your business data`,
          path: "/guides/faqs/how-to-join-authing-user-with-your-business-data",
        },
        {
          title: `Impact of disabling third-party cookies on Authing`,
          path: "/guides/faqs/block-third-party-cookie-impact",
        },
        {
          title: "How to deploy a transit proxy server",
          path: "/guides/faqs/how-to-build-a-proxy",
        },
      ],
    },
  ],
  "/reference/": [
    {
      title: "Single Sign-On (SSO)",
      path: "/reference/sdk-for-sso",
    },
    {
      title: "Login component",
      path: "/reference/ui-components/",
      children: [
        {
          title: "React",
          path: "/reference/ui-components/react",
        },
        {
          title: "Vue",
          path: "/reference/ui-components/vue",
        },
        {
          title: "Angular",
          path: "/reference/ui-components/angular",
        },
        {
          title: "Native JavaScript",
          path: "/reference/ui-components/native-javascript",
        },
        {
          title: "Complete parameter list",
          path: "/reference/ui-components/parameters",
        },
      ],
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
              path: "/reference/sdk-for-node/authentication/AuthenticationClient",
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-node/authentication/StandardProtocol",
            },
            {
              title: "Scan code login module",
              path: "/reference/sdk-for-node/authentication/QrCodeAuthenticationClient",
            },
            {
              title: "Multi-factor authentication module",
              path: "/reference/sdk-for-node/authentication/MfaAuthenticationClient",
            },
            {
              title: "Social login module",
              path: "/reference/sdk-for-node/authentication/SocialAuthenticationClient",
            },
            {
              title: "Corporate identity source login module",
              path: "/reference/sdk-for-node/authentication/EnterpriseAuthenticationClient",
            },
            {
              title: "Main authentication module",
              path: "/reference/sdk-for-node/authentication/PrincipalAuthentication",
            },
          ],
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-node/management",
          children: [
            {
              title: `Management user`,
              path: "/reference/sdk-for-node/management/UsersManagementClient",
            },
            {
              title: "Management application",
              path: "/reference/sdk-for-node/management/ApplicationManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-node/management/RolesManagementClient",
            },
            {
              title: "Manage resources and permissions",
              path: "/reference/sdk-for-node/management/AclManagementClient",
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-node/management/GroupsManagementClient",
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-node/management/OrgManagementClient",
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-node/management/UdfManagementClient",
            },
            {
              title: "Management registration white list",
              path: "/reference/sdk-for-node/management/WhitelistManagementClient",
            },
            {
              title: "Management user pool configuration",
              path: "/reference/sdk-for-node/management/UserpoolManagementClient",
            },
            {
              title: "Management MFA",
              path: "/reference/sdk-for-node/management/MFAManagementClient",
            },
            {
              title: "Management subject certification",
              path: "/reference/sdk-for-node/management/PrincipalManagementClient",
            },
          ],
        },
      ],
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
              path: "/reference/sdk-for-java/authentication/AuthenticationClient",
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-java/authentication/StandardProtocol",
            },
            // '/reference/sdk-for-java/authentication/MfaAuthenticationClient',
          ],
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-java/management",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-java/management/UsersManagementClient",
            },
            {
              title: "Management application",
              path: "/reference/sdk-for-java/management/ApplicationManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-java/management/RolesManagementClient",
            },
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-java/management/AclManagementClient",
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-java/management/GroupsManagementClient",
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-java/management/OrgManagementClient",
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-java/management/UdfManagementClient",
            },
            {
              title: "Management registration white list",
              path: "/reference/sdk-for-java/management/WhitelistManagementClient",
            },
            {
              title: "Management user pool configuration",
              path: "/reference/sdk-for-java/management/UserpoolManagementClient",
            },
            {
              title: "Management log statistics",
              path: "/reference/sdk-for-java/management/StatisticsManagementClient",
            },
          ],
        },
      ],
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
              path: "/reference/sdk-for-python/authentication/AuthenticationClient",
            },
            {
              title: "Standard agreement certification module",
              path: "/reference/sdk-for-python/authentication/StandardProtocol",
            },
            {
              title: "Multi-factor authentication module",
              path: "/reference/sdk-for-python/authentication/MfaAuthenticationClient",
            },
          ],
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-python/management",
          children: [
            {
              title: "Manage resources and permissions",
              path: "/reference/sdk-for-python/management/AclManagementClient",
            },
            {
              title: "Management application",
              path: "/reference/sdk-for-python/management/ApplicationManagementClient",
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-python/management/GroupsManagementClient",
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-python/management/OrgManagementClient",
            },
            {
              title: "Management strategy",
              path: "/reference/sdk-for-python/management/PoliciesManagementClient",
            },
            {
              title: "Management subject certification",
              path: "/reference/sdk-for-python/management/PrincipalManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-python/management/RolesManagementClient",
            },
            {
              title: "Management log statistics",
              path: "/reference/sdk-for-python/management/StatisticsManagementClient",
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-python/management/UdfManagementClient",
            },
            {
              title: "Management user pool configuration",
              path: "/reference/sdk-for-python/management/UserpoolManagementClient",
            },
            {
              title: "Management user",
              path: "/reference/sdk-for-python/management/UsersManagementClient",
            },
            {
              title: "Management registration white list",
              path: "/reference/sdk-for-python/management/WhitelistManagementClient",
            },
          ],
        },
      ],
    },
    {
      title: "C#",
      path: "/reference/sdk-for-csharp/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-csharp/authentication/",
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-csharp/management",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-csharp/management/UsersManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-csharp/management/RolesManagementClient",
            },
            {
              title: "Management permissions, access control",
              path: "/reference/sdk-for-csharp/management/AclManagementClient",
            },
            {
              title: "Management grouping",
              path: "/reference/sdk-for-csharp/management/GroupsManagementClient",
            },
            {
              title: "Management userpool configuration",
              path: "/reference/sdk-for-csharp/management/UserpoolManagementClient",
            },
            {
              title: "Management registration white list",
              path: "/reference/sdk-for-csharp/management/WhitelistManagementClient",
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-csharp/management/UdfManagementClient",
            },
          ],
        },
      ],
    },
    {
      title: "PHP",
      path: "/reference/sdk-for-php/",
      children: [
        {
          title: "User Authentication Module",
          path: "/reference/sdk-for-php/authentication/",
        },
        {
          title: "Management Module",
          path: "/reference/sdk-for-php/management/",
          children: [
            {
              title: "Management user",
              path: "/reference/sdk-for-php/management/UsersManagementClient",
            },
            {
              title: "Management application",
              path: "/reference/sdk-for-php/management/ApplicationManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-php/management/RolesManagementClient",
            },
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-php/management/AclManagementClient",
            },
            {
              title: "Management groups",
              path: "/reference/sdk-for-php/management/GroupsManagementClient",
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-php/management/OrgManagementClient",
            },
            {
              title: "Management User Custom Fields",
              path: "/reference/sdk-for-php/management/UdfManagementClient",
            },
            {
              title: "Management registration white list",
              path: "/reference/sdk-for-php/management/WhitelistManagementClient",
            },
            {
              title: "Management userpool configuration",
              path: "/reference/sdk-for-php/management/UserpoolManagementClient",
            },
            {
              title: "Management MFA",
              path: "/reference/sdk-for-php/management/MFAManagementClient",
            },
          ],
        },
      ],
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
              path: "/reference/sdk-for-go/authentication/StandardProtocol",
            },
          ],
        },
        {
          title: "Management module",
          path: "/reference/sdk-for-go/management/UsersManagementClient",
          children: [
            {
              title: "Management resources and permissions",
              path: "/reference/sdk-for-go/management/AclManagementClient",
            },
            {
              title: "Management user",
              path: "/reference/sdk-for-go/management/UsersManagementClient",
            },
            {
              title: "Management organization",
              path: "/reference/sdk-for-go/management/OrgManagementClient",
            },
            {
              title: "Management role",
              path: "/reference/sdk-for-go/management/RolesManagementClient",
            },
          ],
        },
      ],
    },
    {
      title: "Ruby",
      path: "/reference/sdk-for-ruby",
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
          title: "Quick start",
          path: "/reference/sdk-for-android/quick",
        },
        {
          title: "Hosting page",
          path: "/reference/sdk-for-android/develop",
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-android/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-android/apis/authentication/",
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-android/apis/protocol/",
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-android/apis/mfa/",
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-android/apis/scan/",
            },
          ],
        },
        {
          title: "Third-party identity source",
          path: "/reference/sdk-for-android/social/",
          children: [
            {
              title: "Wechat",
              path: "/reference/sdk-for-android/social/wechat",
            },
            {
              title: "Alipay",
              path: "/reference/sdk-for-android/social/alipay",
            },
            {
              title: "Google",
              path: "/reference/sdk-for-android/social/google",
            },
            {
              title: "Facebook",
              path: "/reference/sdk-for-android/social/facebook",
            },
            {
              title: "Wechat MiniProgram",
              path: "/reference/sdk-for-android/social/miniprogram",
            },
            {
              title: "QQ",
              path: "/reference/sdk-for-android/social/qq",
            },
            {
              title: "Weibo",
              path: "/reference/sdk-for-android/social/weibo",
            },
            {
              title: "Baidu",
              path: "/reference/sdk-for-android/social/baidu",
            },
            {
              title: "Linkedin",
              path: "/reference/sdk-for-android/social/linkedin",
            },
            {
              title: "Github",
              path: "/reference/sdk-for-android/social/github",
            },
            {
              title: "Gitee",
              path: "/reference/sdk-for-android/social/gitee",
            },
            {
              title: "GitLab",
              path: "/reference/sdk-for-android/social/gitlab",
            },
            {
              title: "Douyin",
              path: "/reference/sdk-for-android/social/douyin",
            },
            {
              title: "Kuaishou",
              path: "/reference/sdk-for-android/social/kuaishou",
            },
            {
              title: "Huawei",
              path: "/reference/sdk-for-android/social/huawei",
            },
            {
              title: "OPPO",
              path: "/reference/sdk-for-android/social/oppo",
            },
            {
              title: "Xiaomi",
              path: "/reference/sdk-for-android/social/xiaomi",
            },
            {
              title: "Line",
              path: "/reference/sdk-for-android/social/line",
            },
            {
              title: "Slack",
              path: "/reference/sdk-for-android/social/slack",
            },
            {
              title: "Amazon",
              path: "/reference/sdk-for-android/social/amazon",
            },
            {
              title: "Wecom",
              path: "/reference/sdk-for-android/social/wecom",
            },
            {
              title: "Lark",
              path: "/reference/sdk-for-android/social/lark",
            },
            {
              title: "DingTalk",
              path: "/reference/sdk-for-android/social/dingtalk",
            },
          ],
        },
        {
          title: "Scenario",
          path: "/reference/sdk-for-android/scenario/",
          children: [
            {
              title: "Logout",
              path: "/reference/sdk-for-android/scenario/logout",
            },
            {
              title: "Overseas",
              path: "/reference/sdk-for-android/scenario/overseas",
            },
            {
              title: "Authing OTP",
              path: "/reference/sdk-for-android/scenario/otp",
            },
          ],
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-android/onpremise",
        },
        {
          title: "Android Guard Change log",
          path: "/reference/sdk-for-android/version",
        },
        {
          title: "Error code",
          path: "/reference/sdk-for-android/errorcode",
        },
      ],
    },
    {
      title: "iOS",
      path: "/reference/sdk-for-ios/",
      children: [
        {
          title: "Quick start",
          path: "/reference/sdk-for-ios/quick",
        },
        {
          title: "Auth Flow",
          path: "/reference/sdk-for-ios/develop",
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-ios/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-ios/apis/authentication/",
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-ios/apis/protocol/",
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-ios/apis/mfa/",
            },
            {
              title: "User management",
              path: "/reference/sdk-for-ios/apis/user/",
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-ios/apis/scan/",
            },
          ],
        },
        {
          title: "Third-party identity source",
          path: "/reference/sdk-for-ios/social/",
          children: [
            {
              title: "Wechat",
              path: "/reference/sdk-for-ios/social/wechat",
            },
            {
              title: "Apple",
              path: "/reference/sdk-for-ios/social/apple",
            },
            {
              title: "Google",
              path: "/reference/sdk-for-ios/social/google",
            },
            {
              title: "Facebook",
              path: "/reference/sdk-for-ios/social/facebook",
            },
            {
              title: "Wechat Miniprogram",
              path: "/reference/sdk-for-ios/social/miniprogram",
            },
            {
              title: "Tencent",
              path: "/reference/sdk-for-ios/social/tencent",
            },
            {
              title: "Sina Weibo",
              path: "/reference/sdk-for-ios/social/weibo",
            },
            {
              title: "Baidu",
              path: "/reference/sdk-for-ios/social/baidu",
            },
            {
              title: "LinkedIn",
              path: "/reference/sdk-for-ios/social/linkedin",
            },
            {
              title: "Github",
              path: "/reference/sdk-for-ios/social/github",
            },
            {
              title: "Gitee",
              path: "/reference/sdk-for-ios/social/gitee",
            },
            {
              title: "GitLab",
              path: "/reference/sdk-for-ios/social/gitlab",
            },
            {
              title: "Xiaomi",
              path: "/reference/sdk-for-ios/social/xiaomi",
            },
            {
              title: "WeCom",
              path: "/reference/sdk-for-ios/social/wecom",
            },
            {
              title: "Lark",
              path: "/reference/sdk-for-ios/social/lark",
            },
            {
              title: "DingTalk",
              path: "/reference/sdk-for-ios/social/dingtalk",
            },
            {
              title: "Line",
              path: "/reference/sdk-for-ios/social/line",
            },
            {
              title: "Slack",
              path: "/reference/sdk-for-ios/social/slack",
            },
          ],
        },
        {
          title: "Typical scene",
          path: "/reference/sdk-for-ios/scenario/",
          children: [
            {
              title: "WebAuthn",
              path: "/reference/sdk-for-ios/webauthn",
            },
          ],
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-ios/onpremise",
        },
        {
          title: "WebAuthn",
          path: "/reference/sdk-for-ios/webauthn",
        },
        {
          title: "Error Code List",
          path: "/reference/sdk-for-ios/errorcode",
        },
      ],
    },
    {
      title: "Flutter",
      path: "/reference/sdk-for-flutter/",
      children: [
        {
          title: "Quick start",
          path: "/reference/sdk-for-flutter/develop",
        },
        {
          title: "APIs",
          path: "/reference/sdk-for-flutter/apis/",
          children: [
            {
              title: "Authentication",
              path: "/reference/sdk-for-flutter/apis/authentication/",
            },
            {
              title: "OIDC",
              path: "/reference/sdk-for-flutter/apis/protocol/",
            },
            {
              title: "MFA",
              path: "/reference/sdk-for-flutter/apis/mfa/",
            },
            {
              title: "Scan to login",
              path: "/reference/sdk-for-flutter/apis/scan/",
            },
          ],
        },
        {
          title: "Social login",
          path: "/reference/sdk-for-flutter/social/",
        },
        {
          title: "On-premise",
          path: "/reference/sdk-for-flutter/onpremise",
        },
      ],
    },
    {
      title: "React Native",
      path: "/reference/sdk-for-react-native",
    },
    {
      title: "WeChat Mini Program",
      path: "/reference/sdk-for-wxapp",
    },
    {
      title: "WeChat webpage authorization",
      path: "/reference/sdk-for-wxmp",
    },
    {
      title: "Framework Integration",
      path: "/reference/frameworks",
    },
    {
      title: "Error code",
      path: "/reference/error-code",
    },
  ],
  "/concepts/": [
    {
      title: `What is ${BRAND_NAME_EN_US}`,
      path: "/concepts/",
    },
    {
      title: "What is the user pool",
      path: "/concepts/user-pool",
    },
    {
      title: "What is an application",
      path: "/concepts/application",
    },
    {
      title: "What is certification",
      path: "/concepts/authentication",
    },
    {
      title: "What is federal certification",
      path: "/concepts/federation",
    },
    {
      title: "What is authorization",
      path: "/concepts/authorization",
    },
    {
      title: "Authentication vs authorization",
      path: "/concepts/authentication-vs-authorization",
    },
    {
      title: "What is JWT Token",
      path: "/concepts/jwt-token",
    },
    {
      title: "What is ID Token",
      path: "/concepts/id-token",
    },
    {
      title: "What is Access Token",
      path: "/concepts/access-token",
    },
    {
      title: "What is Refresh Token",
      path: "/concepts/refresh-token",
    },
    {
      title: "Access Token vs Id Token",
      path: "/concepts/access-token-vs-id-token",
    },
    {
      title: "OIDC FAQ",
      path: "/concepts/oidc-common-questions",
    },
    {
      title: "Understand the SAML2 protocol",
      children: [
        {
          title: "SAML2 Summary",
          path: "/concepts/saml/saml-overview",
        },
        {
          title: "SAML2 Process",
          path: "/concepts/saml/saml-flow",
        },
        // {
        // title:'SAML2 FAQ',
        // path:'/concepts/saml/faq'
        // },
      ],
    },
    {
      title: "Understand OIDC and OAuth2.0 protocol",
      children: [
        {
          title: "Overview of OIDC and OAuth2.0",
          path: "/concepts/oidc/oidc-overview",
        },
        {
          title: "Select OIDC authorization mode",
          path: "/concepts/oidc/choose-flow",
        },
      ],
    },
    {
      title: "What is multi-factor authentication",
      path: "/concepts/mfa",
    },
    {
      title: "Account Lifecycle Management",
      path: "/concepts/account-life-cycle-management",
    },
    {
      title: "Hosted login page vs embeddable login component",
      path: "/concepts/embeded-vs-hosted",
    },
    {
      title: "CIAM and EIAM",
      path: "/concepts/ciam-and-eiam",
    },
    {
      title: "What is LDAP",
      path: "/concepts/ldap",
    },
    {
      title: "Principle of Scan Code Login",
      path: "/concepts/how-qrcode-works",
    },
  ],
  "/integration/": [],
};

const addPrefixToLink = (navbar, prefix) => {
  if (!navbar) {
    return;
  }
  return navbar.map((item) => ({
    ...item,
    path: item.path && `${prefix}${item.path}`,
    children:
      item.children &&
      item.children.map((link) => {
        if (typeof link === "string") {
          return `${prefix}${link}`;
        }
        return {
          ...link,
          path: `${prefix}${link.path}`,
          children: addPrefixToLink(link.children, prefix),
        };
      }),
  }));
};

/**
 * 给所有路径加上 /en
 */
const getEnUsNavBar = (sidebars) => {
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
  BRAND_NAME_EN_US,
};
