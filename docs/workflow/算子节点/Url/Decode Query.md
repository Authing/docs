# Decode Query

将 URL 编码的查询字符串解码为查询对象。

查询字符串是字符串的余数 ? URL 中的问号。某些特殊字符(如 空格 ，: ，? 或 / )需要编码，因为它们在 URL 本身中具有特殊含义。

## 输入参数

- `query`：查询字符串。

## 输出参数

- `output`：查询对象。

## 示例

在 [https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America](https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America) 中，查询字符串是以 name 开头的部分。Decode Query 功能卡将此 URL 转换为该对象:

```json
{
"name": "John Doe",
"region": "North America"
}
```
