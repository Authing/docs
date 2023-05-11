# Move

<strong>Move</strong><strong> </strong>用于将一个键的值从一个键移动到另一个键，从而重命名键而保持值不变。

## 输入字段

- `object`：要操作的对象。
- `source`：包含要重命名的值的原始对象中的键。
- `destination`：要将该值移动到的新键。

## 输出字段

- `output`：重命名的键值对现在位于对象末尾的新对象。

## 示例

如果输入对象为 `{"one":"hello", "two":"goodbye"}`，并且 `source` 为"one"，`destination` 为 three，

那么输出对象将是 `{"two":"goodbye", "three":"hello"}`。
