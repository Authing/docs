# How to get a client ID

----------

The client id can be applied on [Authing](http://authing.cn).

#### Login

Login at here: [Login - Authing](http://authing.cn/login).

#### Create a client

Create a client at here: [Login - Authing](http://authing.cn/dashboard).


#### Get the client ID

Then go to the client dashboard to get the client ID.

#### Use the client ID

``` javascript
import Authing from 'authing';
let clientId = '59e374332023830871913ebf';
let Auth = new Authing({
	clientId
});

//use Auth

```
