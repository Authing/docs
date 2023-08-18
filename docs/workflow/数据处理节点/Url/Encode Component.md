# Encode Component

将文本编码为 URL 编码的文本，以便在 URL 中使用。

该函数对 URL 中所有保留字符(如空格， : ， ? ，/ )进行编码。

## 输入参数

- `text`：要编码的文本。

## 输出参数

- `output`：编码的文本。

## 示例

如果你的输入是 Sherlock Holmes: Detective，那么编码后的输出是 Sherlock%20Holmes%3A%20Detective。

您可以使用 Concatenate 函数，然后通过将编码的输出添加到 [https://www.example.com/searchcustomers?name](https://www.example.com/searchcustomers?name)=以获得 [https://www.example.com/searchcustomers?name=Sherlock%20Holmes%3A%20Detective](https://www.example.com/searchcustomers?name=Sherlock%20Holmes%3A%20Detective) 来构建 URL。
