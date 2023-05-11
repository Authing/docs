# Encode Query

将查询对象编码为 URL 编码的查询对象。查询字符串是?之后的所有内容。URL 中的问号。

某些特殊字符(如空格、:、?或/)需要编码，因为它们在 URL 本身中具有特殊含义。

要使用此节点，请使用 object 函数(如 Construct 、Set 或 Zip 函数卡)构建查询对象。当使用来自前面步骤的动态输入时，这更容易完成。然后使用此编码查询功能卡将其编码为字符串。

## 输入参数

- `data`：查询对象。

## 输出参数

- `output`：查询字符串。

## 示例

在 [https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America](https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America) 中，查询字符串是以 name 开头的部分。你可以用这个输入使用 Encode Query 创建它:

```json
{
"name": "John Doe",
"region": "North America"
}
```

该对象被编码为查询字符串 name=John%20Doe&region=North%20America。
