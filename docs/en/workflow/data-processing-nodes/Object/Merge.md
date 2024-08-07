# Merge

<strong>Merge</strong> is used to merge multiple objects into one object. The output object contains all the keys (and their associated values) that appear in any input object. If the same key appears in multiple input objects, only one value is taken. There are two inputs by default, but more can be added.

## Enter the field

- `object 1` : indicates the object to be merged.
- `object 2` : The second object to be merged.

Note: You can merge the third object by clicking the gray placeholder input or dragging and dropping the object into it. After that, a new placeholder will appear for the fourth or more input.

## Output field

- `output` : indicates the newly merged object.

## Example

`object 1`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "id":123}`

`object 2`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "first":"Jane", "last":"Doe"}`

`output`:`{"email":"`<u>jane@doe.commailto:jane@doe.com</u>`", "id":123, "first":"Jane", "last":"Doe"}`