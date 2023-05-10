# Clear Empty

<strong>Clear Empty</strong> 用于从对象中删除没有关联值（例如 `null`，""，{}）的键。它类似于<strong> Object - Filter </strong>功能，但具有选择是否进行递归过滤的额外功能。

## 输入字段

- `object`：要操作的对象。
- `recursive`：指示如何处理具有子对象的对象（如下面的示例所示）。

  - 当为 `false` 时：仅在顶层清除具有空值的键
  - 当为 `true` 时：在任何级别上清除任何空键

## 输出字段

- `output`：您的输入对象，其中不包含空键

## 示例

- 如果输入对象为 `{"Name":"Emily", "Age":"", "Settings": {"test":{ }, "test2":"value2"}`
- 如果 `recursive` 设置为 `false`，则输出为 `{"Name":"Emily", "Settings":{"test":{ },"test2":"value2"}}`
- 如果 `recursive` 设置为 `true`，则输出为 `{"Name":"Emily", "Settings":{"test2":"value2"}}`
