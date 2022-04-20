---
meta:
  - name: description
    content: 部署中转代理服务器
---

# 如何部署中转代理服务器

<LastUpdated/>

## HTTP 代理

下文以 [goproxy](https://github.com/snail007/goproxy/blob/master/README_ZH.md) 为例，简要介绍一下 https 代理的部署流程，详细的官方文档请见：[https://github.com/snail007/goproxy/blob/master/README_ZH.md](https://github.com/snail007/goproxy/blob/master/README_ZH.md) 。

以 root 用户身份运行：

```
curl -L https://mirrors.host900.com/snail007/goproxy/install_auto.sh | bash   
```

等待其运行完成，当输出以下提示的时候表示已安装成功：

```
>>> installing ...
>>> install done, thanks for using snail007/goproxy free_10.0
>>> install path /usr/bin/proxy
>>> configuration path /etc/proxy
>>> uninstall just exec : rm /usr/bin/proxy && rm -rf /etc/proxy
>>> How to using? Please visit : https://snail007.github.io/goproxy/manual/zh/
```

运行（将 $PORT 替换为你想要使用的端口）：

```
proxy http -t tcp -p "0.0.0.0:$PORT"
```

当出现以下提示的表示运行成功：

```
2020/09/23 19:25:34 tcp http(s) proxy on [::]:xxxxxx
```

请确保服务器的防火墙规则允许 {{$localeConfig.brandName}} 服务器访问。{{$localeConfig.brandName}} 服务器的对外 IP 为：

```
52.80.250.250
140.179.19.50
```