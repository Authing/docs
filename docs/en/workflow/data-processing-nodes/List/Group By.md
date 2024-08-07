# Group By

This function takes a list and outputs an object grouped by the values in the original list on the specified path.

Returns an object that groups a list of items (for example, objects, strings, numbers) by the value of the specified path. Each unique value of the specified path in the input list has a corresponding key in the object. For each key in the returned object, the function returns a list of entries from the input list whose values match the specified path of the key.

## Enter parameters

- `list` : (List of items (objects, strings, numbers)) A list of objects that you want to group by the specified path.
- `path` <strong> : </strong> The value or element that groups the list

## Output parameters

- `output` : Output object where the key is the unique value on the path for each element in the original list