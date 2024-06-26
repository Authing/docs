# Zip

从两个列表创建一个对象，通过将第一个列表中的键映射到第二个列表中的值。当创建具有点在键名称中的键的对象时，这特别有用。

因为点通常是子对象的分隔符，所以创建具有带有点的键名的对象可能会很困难。

例如，如果要生成此对象：`{"first.name":"John","last.name":"Doe"}`，可以使用 <strong>Zip</strong> 和以下两个输入创建它：

`keys`：`[ "first.name", "last.name" ]`

`values`：`[ "John", "Doe" ]`

## 输入字段

- `keys`（文本列表）：键名列表
- `values`（列表）：值列表。该列表应该具有与键相同数量的项。

## 输出字段

- `object`（对象）：使用提供的键和值新创建的对象。
