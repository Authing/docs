# Authing doc 贡献指南

贡献新文档或者修改时建议 Fork 项目后，提交 PR 合并到主分支。

## 环境准备

- [VS Code](https://code.visualstudio.com/)
- [Source Tree](https://www.sourcetreeapp.com/) 或者 Github [桌面客户端](https://desktop.github.com/)
- Node.js 16.x [长期支持版本](https://nodejs.org/)

本地调试，在 VS Code 终端中安装环境依赖：

```bash
# 只需要全局安装一次
npm i -g yarn
# 安装依赖，可以每次更新代码时都跑一遍，如果没有新的依赖项则秒结束
yarn
# 运行本项目
yarn docs:dev
# CTRL + C 停止，重新执行再次启动，不要重复启动多个
```

## 编译、热更新过慢

本地调试时，可以针对性的移动 `docs/xxx` 目录，到 `demo/xxx` 下，然后调试的时候编译就会非常快，在提交代码之前把移动的文件夹再都放回来即可。

docs 目录中需要一直保持的核心文件夹：

```bash
.vuepress
common
images
```

其他根据当前需要调试的章节保留一个目录即可。

---

## 使用

```bash
# start dev server
npm run docs:dev

# delete cache then build
npm run docs:no-cache

# build to static HTMLs in docs/.vuepress/dist
npm run docs:build
```

## 常用组件

`page-ref`:

```bash
# 普通 md: 绝对路径

::: page-ref /quickstart/hello-world.md
:::

# README.md 可省略
::: page-ref /scan-qrcode/wxapp-qrcode/
:::

```

`embed`:

```bash
::: embed
[title](link)
:::
```

`hints`:

```bash
::: hint-success
text
:::

::: hint-info
::: hint-warning
::: hint-danger
```

`api-method`:

````markdown
<!-- 组件的 prop 都可以用 slot 代替，纯字符串时可以用 prop，有 Markdown 时用 slot -->

<ApiMethodSpec method="get" host="https://core.authing.cn" path="/oauth/me" summary="使用 access_token 换取用户信息">
<template slot="queryParams">
<ApiMethodParam name="access_token" type="string" required description="access_token" />
</template>
<template slot="response">
<ApiMethodResponse httpCode="200" description="请求结果">

```json
{
  "a": "1"
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>
````

## 插值

按 vue 语法使用插值，可以在具体 md 文件的头部定义，也可使用全局变量（即 config 中的所有配置），常用的全局插值如下：

- \$localeConfig.brandName，品牌名，如 Authing
- \$themeConfig.apiDomain，api 地址
- \$themeConfig.sampleAppDomain，体验地址
- \$themeConfig.consoleDomain，控制台地址

## 注意！！！

写好的文档发布完后要去线上看一眼，刷新页面，然后点击菜单看能否跳到其他页面。很多情况会报以下错，会导致后续 vue 代码无法执行，跳转不了页面：

```
DOMException: Failed to execute 'appendChild' on 'Node': This node type does not support this method.
```

### 加粗内容不能有中文标点符号

### 链接无法加粗

如：

```markdown
[**百度**](https://baidu.com)
**[百度](https://baidu.com)**
```

都会导致报错，可用如下方法实现

```html
<a class="strong" href="https://baidu.com" target="_blank">百度</a>
```

## 更新 SDK v5 文档

- 1、执行文档生成 Github Actions： https://github.com/Authing/authing-docs-factory/actions
- 2、执行脚本： `sh sdk-v5.sh`
- 3、如有内容更新需要调整边栏，手动复制 Sidebar 配置到对应注释说明位置
- 4、提交代码更新
