# Split

Split an object into a list of objects with key and value properties. This is the inverse of the <strong>Collapse</strong> function card.

## Enter the field

- `object` : JSON object that splits the key/value pair into a list of objects.

## Output field

- `list`: list of result objects.

## Example

Consider the following inputs:

`{"foo":"bar","baz":"taz"}`

The Split function card splits the object into two objects:

```json
[
{"key":  "foo",  "value": "bar"},
{"key":  "baz",  "value": "taz"},
}
```