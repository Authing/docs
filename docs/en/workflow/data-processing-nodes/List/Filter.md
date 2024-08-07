# Filter

Filters the list so that it contains only items that meet the specified criteria.

## Enter parameters

- `list1` : indicates the list that is the search target of the Filter function card.
- `list2` : A specific comparison to perform on a list (see relational operator table below).
- `path` : When searching in the object list, path is the name of the key that holds the value to be compared. Use a period to specify a path to an object inside another object. For example, customer.id.

For spreadsheets, full path values are required to specify columns. For example, for a column labeled `Status`, the path value is `Columns.1- Status`.

Leave this field blank when searching in a list of text, numbers, or dates/times.

- `comparison` : indicates the value for comparison.

## Output parameters

- `list` : A new list containing only items that match the specified criteria.