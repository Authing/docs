# Decode Query

Decode the URL encoded query string into a query object.

Is the query string the remainder of a string? The question mark in the URL. Some special characters (such as spaces,:,?, or/) require encoding because they have special meanings within the URL itself.

## Input parameters

- `query`: Query string.

## Output parameters

- `output`: Query object.

## Example

In the [https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America](https://www.example.com/searchcustomers?name=John%20Doe&region=North%20America)In, the query string starts with name. Decode Query feature card converts this URL to this object:

```json
{
"name": "John Doe",
"region": "North America"
}
```
