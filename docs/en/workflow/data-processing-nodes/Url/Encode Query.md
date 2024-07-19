# Encode Query

Encode the query object as a URL encoded query object. What is the query string? All subsequent content. The question mark in the URL.

Some special characters (such as spaces,:,?, or/) require encoding because they have special meanings within the URL itself.

To use this node, use an object function (such as Construct, Set, or Zip function card) to build a query object. This is easier to accomplish when using dynamic input from the previous steps. Then use this encoding query function card to encode it into a string.

## Input parameters

- `data`: Query object.

## Output parameters

- `output`: Query string.

## Example

In the [https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America](https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America) In, the query string starts with name. You can use this input to create it using Encode Query:

```json
{
"name": "John Doe",
"region": "North America"
}
```

The object is encoded as the query string name=John% 20Do&region=North% 20America.
