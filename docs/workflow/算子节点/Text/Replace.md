# Replace

搜索和替换文本。

## 输入参数

- `look in`：在其中执行对字符串的搜索的文本。
- `look for` ：要对其执行搜索的字符串。值可以是使用正则表达式的模式
- `replace with`：用来替换输入文本的字符串。
- `all instances`：表示是否替换所有匹配 `look for` 中的值的字符串。默认为 `False`。
- `case sensitive` :指示是否替换所有匹配字符串值和查找大小写的字符串。默认为 `True`。

例如，如果区分大小写设置为 False，则查找中的 Test 值将匹配 test、Test 和 TEST。

## 输出参数

- `result text`：替换匹配字符串值后的字符串值。

如果没有找到查找的实例，则结果文本与查找字段的原始输入值相同。
