# Encode Component

Encode the text into URL encoded text for use within the URL.

This function encodes all reserved characters in the URL, such as spaces,:,?,/.

## Input parameters

- `text`: The text to be encoded.

## Output parameters

- `output`: Encoded text.

## Example

If your input is Sherlock Holmes: Detective, then the encoded output is Sherlock% 20Holmes% 3A% 20Detective.

You can use the Concatenate function and then add the encoded output to the [https://www.example.com/searchcustomers?name](https://www.example.com/searchcustomers?name)=以获得 [https://www.example.com/searchcustomers?name=Sherlock%20Holmes%3A%20Detective](https://www.example.com/searchcustomers?name=Sherlock%20Holmes%3A%20Detective) To build the URL.
