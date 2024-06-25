# Replace

Search and replace text.

## Input parameters

- `look in`: the text in which to perform a search on a string.
- `look for`: The string on which to perform a search. The value can be a pattern using regular expressions
- `replace with`: a string used to replace input text.
- `all instances`: indicates whether to replace all strings that match the values in `look for` . The default is `False`.
- `case sensitive`: Indicates whether to replace all matching string values and search for uppercase and lowercase strings. The default is `True`.

For example, if case sensitivity is set to False, the Test value in the search will match test, Test, and TEST.

## Output parameters

- `result text`: Replace the string value after matching the string value.

If no instance of the search is found, the result text is the same as the original input value of the search field.
