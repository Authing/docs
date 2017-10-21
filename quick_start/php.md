# PHP

----------

## Installation

----------

#### Composer

``` shell
#lastest stable
$ Composer install authing
```

## Getting Started

#### Usage

``` php
include('Authing');

$clientId = 'your_client_id';
$Auth = new Authing($clientId);

$email = 'test@testmail.com';
$password = 'testpassword';

$result = $Auth.login($email, $password);

if($result['success']) {
	print('login success')
}else {
	print('login failed')
}

```

To know how to get a client id, please read  [How to get a client ID](/quick_start/howto.md).

For more API please continue reading.
