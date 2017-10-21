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

#### #Import

##### ES5

``` javascript
var Authing = require('authing');
```

##### ES6+

``` javascript
import Authing from 'authing';
```

----------

#### #Usage

##### ES5

We use **Promise** to handle asynchronous programming in ES5.

``` javascript
var Authing = require('authing');

var clientId = 'your_client_id';
var Auth = new Authing({
	clientId: clientId
});

var username = 'test@testmail.com';
var password = 'testpassword';

Auth.login({
	username: username,
	password: password,
	clientId: clientId
}).then(function(res) {
	console.log(res);	
}).catch(function(error) {
	conosle.log(error);	
});
```

##### ES6+

We use **async function** and keyword **await** to handle asynchronous programming in ES6+.

``` javascript
import Authing from 'authing';

const main = async () => {

	let clientId = 'your_client_id';

	const Auth = new Authing({
		clientId
	});

	let username = 'test@testmail.com';
	let password = 'testpassword';

	const res = await Auth.login({
		username,
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


