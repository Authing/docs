# Filter

<strong>Filter</strong> removes keys that have no associated value (for example, 'null', "", {}) from the object. If the object may contain other objects, use <strong>Clear Empty </strong> instead.

## Enter the field

- `object` : indicates the object to be operated on.

## Output field

- `output` : An input object that does not contain a null key.

## Example

- input object: ` {" Name ":" Emily ", "Age" : ""," Settings ": {" test" : {}, "test2", "value2"}} `

Output object: ` {" Name ":" Emily ", "Settings" : {" test ": {}," test2 ", "value2"}} `

If you want to remove the Empty key from the child Object, use the <strong>Clear Empty</strong>[](/workflow/ data processing node/object /Clear Empty.html) function instead.