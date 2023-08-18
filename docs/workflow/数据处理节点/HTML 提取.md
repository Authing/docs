# HTML 提取

# 节点介绍

「HTML 提取」节点主要用于对数据中 HTML 中相关属性的提取。

节点主要包括以下配置：

- 数据源，待拆分的原始数据，可自行输入，也可通过数据装配来装配当前节点之前的数据源。
- 二进制属性，可以在其中找到要提取数据的 HTML 的二进制属性的名称。
- JSON 属性值，可以在其中找到要提取数据的 HTML 的 JSON 属性的名称。属性可以包含字符串或字符串数组。
- CSS 选择器，要使用的 CSS 选择器。
- 返回值，支持 attribute，html，text，value。

# 快速开始

## 添加节点

在添加节点页面，在「数据处理」分类中找到「HTML 提取」应用节点。

![](../static/KPMWbqJElomBDoxziOucqKLXnKb.png)

或通过输入「HTML 提取」关键字进行应用筛选。

![](../static/B8zfbx4rboZzONx5QVnc0PnOnZg.png)

点击节点将会自动将该节点添加到工作流中。

![](../static/Sb4cbcbnBoRs3VxBJUKc0zP7nWd.png)

## 节点配置

在工作流画布中点击该节点或点击下方的「编辑」按钮，将进入节点的配置页面。

![](../static/Iq0FbKYtCoLyhNxxQV0cFcaAnFg.png)

按以下方式配置好节点的各个配置项：

- 「数据源」选择左边的「传入 JSON 数据」中的「output」下的「data」属性进行装配；
- 「每批数目」填入 1，表示每批次将包含 1 条数据。

![](../static/CTEhbiUkaoh8etxiAO9cnTQcntb.png)

## 测试运行

点击节点上的「执行此节点以前的链路」按钮，执行该节点。

![](../static/IBCNbKUiDoXXyexA4Vkc2FEPnnc.png)

再次确认之后，该节点之前的所有流程简单将会被执行。

![](../static/NgMUbeKm9ooOQ0xiyf6cwbDPnog.png)

点击「确认执行」按钮之后，将会看到「节点执行中」的消息提示。

![](../static/QS61bC1PKoyo4BxMrJgcfN3DnbN.png)

点击「运行日志」栏，依次点击最新的「执行批次」和「HTML 提取」节点左边的展开按钮，查看节点执行结果。
