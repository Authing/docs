# Parse

Parse the URL string into its components using appropriate encoding.

## Input parameters

- `url`: The formatted URL value to be parsed.

## Output parameters

- `protocol`: URL protocol field. For example, HTTP or HTTPS.
- `host`: Host name.
- `port`: Port number. Typically, HTTP is 80 and HTTPS is 443.
- `path`: The resource path within the host.
- `query`: Not included? The query string question mark for.

## Example

For input URL [http://www.test.com/test](http://www.test.com:8080/test) URL?value=example&value2=URL， This function card returns the following values:

- `protocol`: `http`
- `host`: `www.test.com`
- `port`: `8080`
- `path`: `/test%20url`
- `query`: `value=example&value2=URL`
