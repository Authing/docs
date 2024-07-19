# Clear Empty

<strong>Clear Empty</strong> removes keys that have no associated values (such as' null ', "", {}) from the object. It is similar to the <strong> Object-Filter </strong> function, but has the additional function of choosing whether to filter recursively or not.

## Enter the field

- `object` : indicates the object to be operated on.
- `recursive` : indicates how objects with child objects are processed (as shown in the example below).

- When `false` : Only keys with null values are cleared at the top level
- When  `true`  : Clear any empty keys at any level

## Output field

- `output` : Your input object, which does not contain empty keys

## Example

- if the input object to ` {" Name ":" Emily ", "Age" : ""," Settings ": {" test" : {}, "test2", "value2"} `
- if ` recursive ` set to ` false `, output as ` {" Name ":" Emily ", "Settings" : {" test ": {}," test2 ", "value2"}} `
- if ` recursive ` set to ` true `, output as ` {" Name ":" Emily ", "Settings" : {" test2 ", "value2"}} `