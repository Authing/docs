


 降价
 [#](#markdown "永久链接")
===========================================



 Markdown节点在Markdown和HTML格式之间进行转换。
 



 选项
 [#](#选项 "永久链接")
-----------------------------------------



 可以使用配置节点的输出
 **选项**
 点击
 **添加选项**
 查看和选择选项。
 




 测试选项
 



 其中一些选项相互依赖，或者可以相互作用。我们建议测试选项，以检查效果是否符合您的要求。
 



### 
 标记为HTML
 [#](#markdown到html "永久链接")




| 
 选项
  | 
 描述
  | 
 违约
  |
| --- | --- | --- |
|**将空白添加到链接***|
 是否打开新窗口的链接（启用）或不打开（禁用）。
  | 
 残疾人
  |
|**自动链接到URL**|
 是否自动链接到URL（启用）或禁用（禁用）。如果启用，n8n将其标识为URL的任何字符串转换为链接。
  | 
 残疾人
  |
|**Backl像h Escapes HTML标记**|
 是否允许HTML标记的反斜杠转义（启用）或不允许（禁用）。启用时，n8n将转义任何
 `<` 
 或
 `>` 
 以…开头
 `\` 
 例如
 `\<div\>`
 渲染为
 `&lt；div&gt；`
 .
  | 
 残废
  |
|**完整HTML文档***|
 是输出完整的HTML文档（启用）还是HTML片段（禁用）。完整的HTML文档包括
 `<DOCTYPE HTML>`
 公告
 `<html>`
 和
 `<正文>`
 标签，以及
 `<head>`
 要素
  | 
 残疾人
  |
|**自定义标题ID**|
 是否支持自定义标题ID（启用）或不支持（禁用）。启用后，可以使用添加自定义标题ID
 `｛此处为标头ID｝`
 在标题文本之后。
  | 
 残废
  |
|**表情符号支持**|
 是否支持表情符号（启用）或不支持（禁用）。
  | 
 残废
  |
|**对电子邮件进行编码**|
 是否将ASCII字符电子邮件转换为其等效的十进制实体（启用）或不转换（禁用）。
  | 
 启用
  |
|**从URL中排除尾部标点符号**|
 是否从自动链接的URL中排除尾随标点（启用）或不排除（禁用）。用于
 **自动链接到URL**
 .
  | 
 残疾人
  |
|**GitHub代码块**|
 是否启用GitHub Flavored Markdown代码块（已启用）或未启用（已禁用）。
  | 
 启用
  |
|**GitHub兼容的标头ID**|
 是否生成GitHub Flavored Markdown标题ID（已启用）（已禁用）。GitHub Flavored Markdown生成标题ID
 `-` 
 并删除非字母数字字符。
  | 
 残废
  |
|**GitHub提及链接**|
 更改使用的链接
 **GitHub提及**
 .
  | 
 残废
  |
|**GitHub提及**|
 是否支持使用标记GitHub用户
 `@` 
 （启用）或不（禁用）。启用时，n8n替换
 `@名称`
 具有
 `https://github.com/name` 
 .
  | 
 残废
  |
|**GitHub任务列表**|
 是否支持GitHub Flavored Markdown任务列表（已启用）或不支持（已禁用）。
  | 
 残疾人
  |
|**标题级别开始***|
 数字设置标头的起始级别。例如，将此字段更改为
 `2` 
 导致n8n治疗
 `#` 
 像
 `<h2>`
 ,
 `##` 
 as
 `<h3>`
 等等。
  | 
 1.
  |
|**标题前必须有空格**|
 是否在
 `#` 
 是否需要标题文本（启用）（禁用）。启用时，n8n将标题显示为
 `##某些标题文本`
 字面意思（它不会将其转换为标题元素）
  | 
 残废
  |
|**中间词星号**|
 n8n是否应将单词中的星号视为Markdown（禁用）或将其呈现为文字星号（启用）。
  | 
 残废
  |
|**中间词下划线**|
 n8n是否应将单词中的下划线视为Markdown（禁用）或将其呈现为文字下划线（启用）。
  | 
 残废
  |
|**无标题ID**|
 禁用自动生成标头ID（已启用）。
  | 
 残疾人
  |
|**分析图像尺寸***|
 支持在Markdown语法中设置最大图像尺寸（已启用）。
  | 
 残废
  |
|**前缀标头ID**|
 定义要添加到标头ID的前缀。
  | 
 没有一个
  |
|**原始标题ID**|
 是否删除空格，
 `'` 
 和
 `"` 
 从标头ID，包括前缀，将其替换为
 `-` 
 （启用）或不（禁用）。
  | 
 残废
  |
|**原始前缀标头ID**|
 是否阻止n8n修改标头前缀（已启用）或禁用（已禁用）
  | 
 残疾人
  |
|**简单换行符**|
 是否在行尾创建不带双空格的换行符（启用）或不创建（禁用）。
  | 
 残废
  |
|**智能缩进修复**|
 是否尝试巧妙地修复与缩进代码块中的ES6模板字符串相关的缩进问题（启用）或禁用（禁用）。
  | 
 残疾人
  |
|**空格缩进子列表**|
 是否删除缩进子列表四个空格的要求（启用）或不删除（禁用）。
  | 
 残废
  |
|**拆分相邻的块引号**|
 是否拆分相邻的块引号块（启用）或不拆分（禁用）。如果不启用此选项，n8n将处理引号（由
 `>` 
 在行的开头）作为单个块引号显示在单独的行上，即使用空行分隔。
  | 
 残废
  |
|**删除线**|
 是否支持删除线语法（启用）或不支持（禁用）。启用后，可以使用
 `~~` 
 围绕单词或短语。
  | 
 残疾人
  |
|**表格标题ID**|
 是否向表头标记添加ID（启用）或不添加ID（禁用）。
  | 
 残疾人
  |
|**表支持***|
 是否支持表（启用）或不支持表（禁用）。
  | 
 残废
  |


### 
 HTML标记
 [#](#html标记 "永久链接")




| 
 选项
  | 
 说明
  | 
 违约
  |
| --- | --- | --- |
|**项目符号标记**|
 指定用于无序列表的字符。
  | 
 \*
  |
|**代码块围栏**|
 指定用于代码块的字符。
  | 
 ```
  |
|**强调 Delimiter**  | 
 Specify the character
 `<em>` 
 .
  | 
 \_
  |
| **Global Escape Pattern**  | 
 Overrides the default character escape settings. You may want to use Text Replacement Pattern instead.
  | 
 None
  |
| **Ignored Elements**  | 
 Ignore given HTML elements, and their children.
  | 
 None
  |
| **Keep Images With Data**  | 
 Whether to keep images with data (enabled) or not (disabled). Support files up to 1MB.
  | 
 Disabled
  |
| **Line Start Escape Pattern**  | 
 Overrides the default character escape settings. You may want to use Text Replacement Pattern instead.
  | 
 None
  |
| **Max Consecutive New Lines**  | 
 Number. Specify the maximum number of consecutive new lines allowed.
  | 
 3
  |
| **Place URLs At The Bottom**  | 
 Whether to place URLs at the bottom of the page and format using link reference definitions (enabled) or not (disabled).
  | 
 Disabled
  |
| **Strong Delimiter**  | 
 Specify the characters for
 `<strong>` 
 .
  | 
 \*\*
  |
| **Style For Code Block**  | 
 Specify the styling for code blocks. Options are
 **Fence** 
 and
 **Indented** 
 .
  | 
 Fence
  |
| **Text Replacement Pattern**  | 
 Define a text replacement pattern using regex.
  | 
 None
  |
| **Treat As Blocks**  | 
 Specify HTML elements to treat as blocks (surround with blank lines)
  | 
 None
  |



 Parsers
 [#](#parsers "Permanent link")
-----------------------------------------



 n8n uses the following parsers:
 


* To convert from HTML to Markdown:
 [node-html-markdown](https://www.npmjs.com/package/node-html-markdown)
* To convert from Markdown to HTML:
 [Showdown](https://www.npmjs.com/package/showdown) 
 . Some options allow you to extend your Markdown with
 [GitHub Flavored Markdown](https://github.github.com/gfm/) 
 .




