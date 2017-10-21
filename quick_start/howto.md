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

##### ES5

``` javascript

var Authing = require('authing');

var clientId = 'your_client_id'; //your client ID applied on our website

var myAccount = 'myemail@myemail.com';
var myPasswd = 'myPasswd';

var auth = new Authing({
	clientId: clientId,
	email: myAccount,
	pasword: myPasswd
});

auth.then(function(auth) {

	//use auth
	
});

```

##### ES6+

``` javascript
import Authing from 'authing';

let clientId = 'your_client_id';

const myAccount = 'myemail@myemail.com';
const myPasswd = 'myPasswd';

const Auth = await new Authing({
	clientId: clientId,
	email: myAccount,
	pasword: myPasswd
});

//use Auth

```
