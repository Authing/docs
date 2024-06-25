# Unset

Deletes a key/value pair from an object.

## Enter the field

- `object` : The object from which the key/value pair is to be deleted
- `path` : The key to delete, which can be the top-level key name, a path to a subkey with a dot separator, or a list of key names. (See example below)

## Output field

- `output`: indicates a new object

## Example

- If you want to remove the top-level key, simply provide the key name as the path.

For example, if the object is ` {" foo ": 1," bar ": 2} `, and the path is ` foo `, the output will be ` {2}" bar ": `.

Paths can also be used to specify keys in a child object, where dots represent the child object.

For example, if the object is ` {" a ":" one ", "b" : {" foo ": 1," bar ": 2}} `, and the path is ` b. oo `, output as ` {" a" : "one", "b" : {" bar ": 2}} `

- You can also use a number to indicate the NTH element of the list, so the effective path is `foo.7.bar`, which means to remove the  `bar` key/value pair on the 7th element of the object list at the  `foo`  key.
- The path with the dot separator is simple and powerful, but it is not suitable for all cases. For example, if the Key contains a dot, or if the Key is a number, the path may not be available. In this case, you can explicitly control the path by using a text list; Each item in the list will be treated as a single Key (no attempt will be made to interpret numbers or points).

For example: If the object is ` {" a ":" one ", "b. oo" : {" 7 ":" bar ", "eight" : "baz"}} `, if you want to get output ` {" a ":" one ", "b. oo" : {" eight ":" baz "}} `, you will need to set the path to the list (use the type drop-down list), 'B.oo' is the first term and '8' is the second term.