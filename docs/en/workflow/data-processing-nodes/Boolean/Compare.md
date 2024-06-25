# Compare

Please ensure to compare the types of parameter 1 and parameter 2 to reflect how you wish to compare them. For example, the operator "greater than" compares numbers based on numerical values, while text based on alphabetical sorting compares numbers based on alphabetical sorting. Therefore, comparing numbers 80>9 is true, but comparing texts 80>9 is false

## Input Fields

- `input1` (comparison parameter a): the value being compared
- `input2` (compare parameter b): the value to be compared
- Comparison:

- Equal to: Compare two texts, numbers, dates, or to see if they have the same value.
- Not equal: Compare two texts, numbers, dates, or true/false to see if they have different values. To compare objects, use this option instead of doing it have key.
- Greater than or equal: Compare two texts, numbers, or dates to see if the first one has the same or greater value as the second one.
- Less than or equal: Compare two texts, numbers, or dates to see if their values are the same or smaller than the latter.
- Greater than: Compare two texts, numbers, or dates to see if the first value is greater than the second value.
- Less than: Compare two texts, numbers, or dates to see if the first value is smaller than the second value.
- In: Compare two texts to see if the value a is part of the value b. For example, "test" appears in "this is a test", but there is no "i" in "team".
- Not in: Compare two texts to see if the value a is not part of the value b.
- Has key: When value a is an object and value b is text, test whether the object has a key with the specified name. For example, if the value a is {"test": 123} ` and the value b is "test", then it is true.
- Doesn't have key: When value a is an object and value b is text, test if the object does not have a key with the specified name.
- Support different data types based on the selected comparison type

## Output Fields

- `result`(return result):<strong></strong>Boolean value returns the result
