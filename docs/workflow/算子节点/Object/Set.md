# Set

<strong>Set</strong> 用于将对象中的键设置为指定的值。如果该键不存在，则创建一个新键。

## 输入字段

- `object`：要开始操作的对象。
- `path`：可以是单个顶层键名称（例如 `customer`），也可以是点分隔的路径（例如 `customer.id`，其中 `id` 是子对象中的一个键，或者 `items.5`，其中 `5` 是列表中的一个元素）。或者，您可以将路径的类型更改为接受包含单个键名称的文本列表。
- `value`：键的新值。请确保将值的类型设置为与键所需的类型相匹配（例如文本或数字）。
- `type`:值的类型 `List/Object/Text/Number`

## 输出字段

- `output`：包含指定路径上更新后值的新对象。

## 示例

如果 `object` 为 `{"foo":"1"}`，`path` 为 foo，`value` 为 2，则 `output ` 为 `{"foo":"2"}`。

如果 `object` 为 {"foo":"1"}，`path` 为 bar，`value ` 为 2，则 `output` 为 `{"foo":"1","bar":"2"}`。

如果 `object` 为 {"foo":"1"}，path 为 bar.baz，`value` 为 2，则 `output` 为 `{"foo":"1","bar":{"baz":"2"}}`。

如果 `object` 为 `{"foo":["0","1","2"]}`，`path` 为 foo.1，`value` 为 9，则 `output` 为 `{"foo":["0","9","2"]}`。

如果 `object` 为 `{"foo":{"bar":"1"}}`，`path` 为 foo.bar，`value ` 为 2，则 `output` 为 `{"foo":{"bar":"2"}}`。

或者，您可以将路径的类型设置为文本列表，然后将 "foo" 和 "bar" 作为列表项传入，以获得相同的结果。

使用文本列表时，点被视为所需键名称的一部分，因此如果将 foo.bar 用作输入，并且 path 设置为列表，则会得到 `output` 的值 `{"foo":{"bar":1},"foo.bar":2}`
