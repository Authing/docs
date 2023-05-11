# Index By

该函数是为公共 API 模式设计的，其中服务返回字段值列表作为对象列表，每个对象包含字段名作为一个键，字段值作为另一个键。

在这种情况下，该函数可用于将该列表转换为包含每个字段作为键值对的对象。Index By 允许您指定一个 keyPath 和一个 valuePath，从而解决了这个问题。对于列表中的每个项，该函数在输出对象中创建一个新的键值对。

例如，如果您有这个列表 : [{"fieldname":"x"，"myvalue":"one"}，{"fieldname":"y"，"myvalue":"two"}，{"fieldname":"z":"three"}] 并使用 Index By with keyPath="fieldname"和 valuePath="myvalue"，那么输出是以下对象 : {"x":"one"，"y":"two"，"z":"three"}

## 输入参数

- `list`：对象列表
- `keyPath`<strong>：</strong>对象中具有键名的键(在上面的示例中为 “fieldname” )
- `valuePath (text)`: 包含值的键(上面示例中的 “myvalue” )

## 输出参数

- `output`：包含输入列表定义的键/值对的对象
