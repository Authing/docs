# Python

----------

Python SDK of Authing only supports **python3+**.

## Installation

----------

#### pip

``` shell
#lastest stable
$ pip install authing
```

## Getting Started

#### Usage

``` python
from authing import Authing

clientId = 'your_client_id'
Auth = Authing(clientId)

email = 'test@testmail.com'
password = 'testpassword'

result = Auth.login(email=email, password=password)

if(result.success) {
	print('login success')
}else {
	print('login failed')
}

```

To know how to get a client id, please read  [How to get a client ID](/quick_start/howto.md).

For more API please continue reading.
