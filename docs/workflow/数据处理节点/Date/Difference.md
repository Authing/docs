# Difference

计算两个日期之间的时间差。

## 输入参数

- `end date`：比较较早日期(开始日期)的较晚日期和时间。
- `start date`：比较较晚日期(结束日期)的较早日期和时间。如果值“开始日期”较晚，则输出值将为负值，表明它超过了“结束日期”的值。

## 输出参数

所有输出都表示从该单元的开始日期到结束日期所需的全部时间。例如，如果结束日期正好是开始日期后的一天，那么天的输出值将是 1，小时将是 24。

- `days`：结束日期和开始日期之间的天数差，包括部分天数。
- `months`：结束日期和开始日期值之间的月差，包括部分月。
- `years`：结束日期和开始日期的年数之差，包括部分年份。
- `hours`：结束日期和开始日期值之间的小时差，包括部分小时。
- `minutes`：结束日期和开始日期值之间的分钟差，包括部分分钟。
- `seconds`：结束日期和开始日期值之间的秒差。
- `milliseconds`：结束日期和开始日期值之间的毫秒差。
