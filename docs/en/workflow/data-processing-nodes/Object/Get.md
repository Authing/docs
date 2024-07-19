# Get

<strong>"Get"</strong> is used to read the value stored on the given path in the object. For example, if the object is `{"a":"one", "b":"two", "c": 17}`, then the specified path b will retrieve the text `two`.

You can retrieve values from nested objects by separating key names with dots. For example, if the object is ` {" a ": {" b" : "this", "c" : "that"}} `, then path a.c will retrieve out that value. If the path contains a list, you can use the index number in the path. For example, if the object is ` {" a ": [{" b" : "first"}, {" b ":" the second "}, {" b ":" third "}]} `, then the path ` a. 2. B ` will retrieve a ` third ` values.

## Enter the field

- `object` : The object to be started.
- `path` : can be a single top-level key name (for example, `customer`), or a dot-separated path (for example, `customer.id` where id is a key in a child object, or `items.5`, where `5` is an element in a list). Alternatively, you can change the type of the path to accept a text list containing a single key name.

## Output field

- Specifies the value on the path

## Example

Get ` {" a ": [{" b" : "first"}, {" b ":" the second "}, {" b ":" third "}]} ` of elements

If `path` is a.1.b is second

If get ` key ` for a direct return ` [{" b ":" first "}, {" b ":" the second "}, {" b ":" third "}] `