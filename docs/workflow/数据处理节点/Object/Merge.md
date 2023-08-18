# Merge

<strong>Merge</strong>用于将多个对象合并为一个对象。输出对象包含任何输入对象中出现的所有键（及其关联值）。如果相同的键出现在多个输入对象中，则只取一个值。默认情况下有两个输入，但可以添加更多。

## 输入字段

- `object 1`：要合并的对象。
- `object 2`：要合并的第二个对象。

注意：您可以通过单击灰色占位符输入或将对象拖放到其中来合并第三个对象。之后，将出现一个新的占位符，用于第四个或更多的输入。

## 输出字段

- `output`：新合并的对象。

## 示例

`object 1`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "id":123}`

`object 2`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "first":"Jane", "last":"Doe"}`

`output`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "id":123, "first":"Jane", "last":"Doe"}`
