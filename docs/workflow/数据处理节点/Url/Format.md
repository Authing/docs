# Format

从它的组件构造一个 URL 字符串。

## 输入参数

- `protocol`：URL 协议字段。例如 http 或 https 。
- `host`：主机名。
- `port`：端口号 通常 HTTP 为 80 , HTTPS 为 443 。
- `path`：主机内的资源路径。
- `query`：不带 ? 的查询字符串问号。

## 输出参数

- `url`：格式化的 URL 值。
