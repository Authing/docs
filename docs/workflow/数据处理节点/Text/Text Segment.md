# Text Segment

从字符串值中提取文本。

## 输入参数

- `text`：从中提取文本的字符串。
- `separator`:要从文本字段中的字符串值中提取的第一个字符的位置，其中 0 是第一个字符，1 是第二个字符，以此类推。如果 `end before`` ` 字段中没有提供值，那么将提取与该字段中输入值在数量上相等的第一组字符。
- `end before`:比要提取的最后一个字符大一个的位置。如果该值大于文本字段中字符串的长度，则将提取整个字符串。如果 `start at`` ` 字段中没有提供任何值，那么将提取与该字段中输入值在数量上相等的第一组字符。

## 输出参数

- `segment`：提取的文本段。
