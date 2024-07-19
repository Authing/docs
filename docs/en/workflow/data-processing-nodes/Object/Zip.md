# Zip

Create an object from two lists by mapping keys from the first list to values from the second list. This is especially useful when creating objects with keys with points in the key name.

Because a point is usually a separator for a child object, creating an object with a key name with a point can be difficult.

For example, if you want to generate this object: `{"first.name":"John","last.name":"Doe"}`, you can create it with <strong>Zip</strong> and the following two inputs:

`keys`：`[ "first.name", "last.name" ]`

`values`：`[ "John", "Doe" ]`

## Enter the field

- `keys` (text list) : list of key names
- `values` (list) : indicates a list of values. The list should have the same number of items as the key.

## Output field

- `object` : A newly created object using the supplied keys and values.