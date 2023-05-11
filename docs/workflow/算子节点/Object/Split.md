# Split

将对象拆分为一系列具有键和值属性的对象列表。这是 <strong>Collapse</strong> 功能卡的反函数。

## 输入字段

- `object`（对象）：将拆分为对象列表的键/值对 JSON 对象。

## 输出字段

- `list`：结果对象列表。

## 示例

考虑以下输入：

`{"foo":"bar","baz":"taz"}`

Split 函数卡将对象拆分为两个对象：

```json
[
    {"key":  "foo",  "value": "bar"},
    {"key":  "baz",  "value": "taz"},
}
```
