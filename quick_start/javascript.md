# JavaScript

----------

JavaScript SDK of Authing supports **Angular.js**, **React.js**, **Vue.js** and also **Node.js**.They have compeletely same programming interfaces.

## Installation

----------

#### NPM

NPM is the recommended installation method when building large scale applications. It pairs nicely with module bundlers such as Webpack or Browserify.

``` shell
# latest stable
$ npm install authing
```

## Getting Started

----------

#### #Usage

##### ES5

We use **Promise** to handle asynchronous programming in ES5.

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

	var email = 'test@testmail.com';
	var password = 'testpassword';

	Auth.login({
		email: email,
		password: password,
		clientId: clientId
	}).then(function(res) {
		console.log(res);	
	}).catch(function(error) {
		conosle.log(error);	
	});
	
});

```

To know how to get a client id, please read  [How to get a client ID](/quick_start/howto.md).


##### ES6+

We use **async function** and keyword **await** to handle asynchronous programming in ES6+.

``` javascript
import Authing from 'authing';

const main = async () => {

	let clientId = 'your_client_id';

	const myAccount = 'myemail@myemail.com';
	const myPasswd = 'myPasswd';

	const Auth = await new Authing({
		clientId: clientId,
		email: myAccount,
		pasword: myPasswd
	});

	let email = 'test@testmail.com';
	let password = 'testpassword';

	const res = await Auth.login({
		email,
		password
	});

	if(res) {
		console.log('login success');
	}else {
		console.log('login failed');
	}

}

main();

```

For more API please continue reading.

