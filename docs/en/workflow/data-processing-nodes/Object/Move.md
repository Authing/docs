# Move

<strong>Move</strong><strong> </strong> is used to move the value of a key from one key to another, thus renaming the key without leaving the value unchanged.

## Enter the field

- `object` : indicates the object to be operated on.
- `source` : The key in the original object containing the value to be renamed.
- `destination` : The new key to move the value to.

## Output field

- `output` : New object whose renamed key-value pair is now at the end of the object.

## Example

If the input object is `{"one":"hello", "two":"goodbye”}` and' source 'is' one' and 'destination' is' three ',

Then the output object will be `{"two":"goodbye", "three":"hello"}`