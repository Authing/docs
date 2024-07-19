# Index By

This function is designed for the public API pattern, where the service returns a list of field values as a list of objects, each containing the field name as one key and the field value as another key.

In this case, the function can be used to convert the list into an object containing each field as a key-value pair. Index By solves this problem by allowing you to specify a keyPath and a valuePath. For each item in the list, the function creates a new key-value pair in the output object.

For example, if you have this list: [{"fieldname":"x"，"myvalue":"one"}，{"fieldname":"y"，"myvalue":"two"}，{"fieldname":"z":"three"}] and using Index By with keyPath="fieldname" and valuePath="myvalue", then the output is the following object: {"x":"one", "y":"two", "z":"three"}

## Enter parameters

- `list` : indicates a list of objects
- `keyPath` <strong> : The key with the key name in the </strong> object (fieldname in the above example)
- `valuePath (text)` : The key containing the value (" myvalue "in the example above)

## Output parameters

- `output` : object containing the key/value pairs defined by the input list