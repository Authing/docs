# Parse

用适当的编码将 URL 字符串解析为其组件。

## 输入参数

- `url`：要解析的格式化 URL 值。

## 输出参数

- `protocol`：URL 协议字段。例如 http 或 https 。
- `host`：主机名。
- `port`：端口号。通常 HTTP 为 80,HTTPS 为 443。
- `path`：主机内的资源路径。
- `query`：不带?的查询字符串问号。

## 示例

对于输入 URL [http://www.test.com/test](http://www.test.com:8080/test) URL ?value=example&value2=URL，此函数卡返回以下值:

- `protocol`: `http`
- `host`: `www.test.com`
- `port`: `8080`
- `path`: `/test%20url`
- `query`: `value=example&value2=URL`
