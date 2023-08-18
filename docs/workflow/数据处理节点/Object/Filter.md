# Filter

<strong>Filter</strong> 将从对象中删除没有关联值（例如 `null`，""，{}）的键。如果对象可能包含其他对象，请改用 <strong>Clear Empty </strong>。

## 输入字段

- `object`：要操作的对象。

## 输出字段

- `output`：不包含空键的输入对象。

## 示例

- 输入对象：`{"Name":"Emily", "Age":"", "Settings": {"test":{ }, "test2":"value2"}}`

输出对象：`{"Name":"Emily", "Settings":{"test":{ },"test2":"value2"}}`

如果您想从子对象中删除空键，请改用 <strong>Clear Empty</strong>[ ](/workflow/数据处理节点/Object/Clear Empty.html)功能。
