# Set

<strong>Set</strong> is used to set the key in the object to the specified value. If the key does not exist, a new key is created.

## Enter the field

- `object` : The object to be started.
- `path` : can be a single top-level key name (for example, `customer`), or a dot-separated path (for example, `customer.id` where  `id` is a key in a child object, or `items.5`, where `5` is an element in a list). Alternatively, you can change the type of the path to accept a text list containing a single key name.
- `value` : indicates the new value of the key. Make sure that the type of the value is set to match the type required by the key (for example, text or number).
- `type` : specifies the type of the value List/Object/Text/Number

## Output field

- `output` : contains a new object with updated values on the specified path.

## Example

If ` object ` for ` {" foo ":" 1 "} `,  path for foo, ` value ` to 2, then ` output ` for ` ` {" foo ":" 2 "}.

If ` object ` for ` {" foo ":" 1 "}`,  path  for bar, ` value ` to 2, then ` output ` for ` {" foo ":" 1 ", "bar" : "2"} `.

If ` object ` for ` {" foo ":" 1 "}`, the path for the bar. Baz, ` value ` to 2, then ` output ` for ` {" foo ":" 1 ", "bar" : {" baz ":" 2 "}} `.

If ` object ` for ` {" foo ": [" 0", "1", "2"]} `, ` path for foo ` 1, ` value ` 9, is ` output ` for ` {" foo ": [" 0", "9", "2"]} `.

If ` object ` for ` {" foo ": {" bar" : "1"}} `, ` path ` for foo bar, ` value ` to 2, then ` output ` for ` {" foo ": {" bar" : "2"}} `.

Alternatively, you can set the type of the path to a text list and then pass in "foo" and "bar" as list items to get the same result.

When using a text list, the point is treated as part of the desired key name, so if foo.bar is used as input and path is set to list, you get the value of 'output' `{"foo":{"bar":1},"foo.bar":2}`