# Collapse

<strong>Collapse</strong> 用于将具有键和值属性的对象列表组合成一个单独的 JSON  对象。这与 <strong>Split</strong> 功能的作用相反。

## 输入字段

- `list` (对象列表): 要组合的对象列表

单击空输入字段以添加第二个或随后的 JSON 对象列表，您还希望将其组合成单个 JSON  对象。

## 输出字段

- `output`: 包含键/值对的 JSON 对象

## 示例

以下是将要组合的两个对象：

```css
{
    "key":  "foo",
    "value": "bar"
}
{
    "key":  "baz",
    "value": "taz"
}
```

执行 `Collapse` 后，输出将为：

```json
{"foo":"bar","baz":"taz"}
```

这将两个对象中的属性按名称组合到一个对象中，并创建一个键值对列表。
