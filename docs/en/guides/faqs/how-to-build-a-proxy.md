---
meta:
  - name: description
    content: How To Build a Proxy Server
---

# How To Build a Proxy Server?

## HTTP proxy

Here taking [goproxy](https://github.com/snail007/goproxy/blob/master/README_ZH.md) as an example, briefly introduce the deployment process of https proxy. For detailed official documents, please see:[https://github.com/snail007/goproxy/blob/master/README_ZH.md](https://github.com/snail007/goproxy/blob/master/README_ZH.md)

Run as root user:

```
curl -L https://mirrors.host900.com/snail007/goproxy/install_auto.sh | bash   
```

Waiting for its running to complete, when the following prompt is displayed, it means the installation has been successful:
```
>>> installing ...
>>> install done, thanks for using snail007/goproxy free_10.0
>>> install path /usr/bin/proxy
>>> configuration path /etc/proxy
>>> uninstall just exec : rm /usr/bin/proxy && rm -rf /etc/proxy
>>> How to using? Please visit : https://snail007.github.io/goproxy/manual/zh/
```

Run (replace $PORT with the port you want to use):
```
proxy http -t tcp -p "0.0.0.0:$PORT"
```

When the following prompt appears, the operation is successful:

```
2020/09/23 19:25:34 tcp http(s) proxy on [::]:xxxxxx
```

Please make sure that the firewall rules of the server allow Approw server access.The external IP of the Approw server is:
```
52.80.250.250
140.179.19.50
```
