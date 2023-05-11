# Markdown

# 节点介绍

「Markdown」节点主要用于对源数据 HTML 转化 Markdown 以及 Markdown 转化 HTML。

- 模式，HTML 转化 Markdown 或者 Markdown 转化 HTML。
- 目标属性，输入输出的字段。使用点指定嵌套字段，例如 level1.level2.newKey 。

# 快速开始

## 添加节点

在添加节点页面，在「数据处理」分类中找到「Markdown」应用节点。

![](../static/Pq4ubIO8loqEnaxC5h2ciJcFnzX.png)

或通过输入「Markdown」关键字进行应用筛选。

![](../static/Z8q2bI6hqodKZGxjhWAcEKovnzc.png)

点击节点将会自动将该节点添加到工作流中。

![](../static/Zyu0bAQzeoPXELxBkeGc9LesnsH.png)

## 节点配置

在工作流画布中点击该节点或点击下方的「编辑」按钮，将进入节点的配置页面。

![](../static/EPxPbVZqQog7J6xhWfmcgTMjn9u.png)

按以下方式配置好节点的各个配置项：

- 「HTML」选择左边的「传入 JSON 数据」中的「output」下的「data」属性进行装配；
- 「模式」支持 HTML 转 Markdown,以及 Markdown 转 HTML。
- 目标属性 默认值 data

![](../static/VqAibaP1Ko1hWUxVGWDcAjDrnXc.png)

## 测试运行

点击节点上的「执行此节点以前的链路」按钮，执行该节点。

![](../static/NxNGbTmtMo40SNxCs9icTeIynCs.png)

再次确认之后，该节点之前的所有流程简单将会被执行。

![](../static/MMo2bg1e2oqRjTxnEtNc6xkwnsb.png)

点击「确认执行」按钮之后，将会看到「节点执行中」的消息提示。

![](../static/TUiIbbUtxoCr3sxvVkUcmxvInVb.png)

点击「运行日志」栏，依次点击最新的「执行批次」和「Markdown」节点左边的展开按钮，查看节点执行结果。
