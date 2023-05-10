# 读取 RSS

# 节点介绍

「读取 RSS」节点主要用于配置 RSS 路径获取订阅资源

- URL，订阅资源资源路径。

# 快速开始

## 添加节点

在添加节点页面，在「数据处理」分类中找到「读取 RSS」应用节点。

![](../static/PtMybeUfmo2Jnnx9kSxcCLiNnef.png)

或通过输入「读取 RSS」关键字进行应用筛选。

![](../static/BvkQbbznNo5gdwxfyqAc5ku2nvB.png)

点击节点将会自动将该节点添加到工作流中。

![](../static/BiWTb5YrsoVAEtxJM2scbrrnnCe.png)

## 节点配置

在工作流画布中点击该节点或点击下方的「编辑」按钮，将进入节点的配置页面。

![](../static/N5KVbvvMCobSTRxZseLc1Famnwh.png)

按以下方式配置好节点的各个配置项：

- 「数据源」选择左边的「传入 JSON 数据」中的「output」下的「data」属性进行装配；
- 「每批数目」填入 1，表示每批次将包含 1 条数据。

![](../static/L1LvbcqEJoxEmtx6VLeckRCknPg.png)

## 测试运行

点击节点上的「执行此节点以前的链路」按钮，执行该节点。

![](../static/KCaPbUTQOo4HfLxGW9tcTH5DnsX.png)

再次确认之后，该节点之前的所有流程简单将会被执行。

![](../static/FDzQbFCDsobSzJxi4lYcBbO3nrg.png)

点击「确认执行」按钮之后，将会看到「节点执行中」的消息提示。

![](../static/Itghbg7nOou3rHxBHFDcfZQOnDh.png)

点击「运行日志」栏，依次点击最新的「执行批次」和「读取 RSS」节点左边的展开按钮，查看节点执行结果。

![](../static/LSR2bViVYoIvNyxGHPCczhlbnff.png)
