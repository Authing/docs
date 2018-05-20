# authing-py-sdk

----------

Authing Python SDK目前只支持Python3+。

[官方文档请点击这里](https://docs.authing.cn)。

## 安装

----------

#### pip

当构建大规模应用时，我们推荐使用```pip```进行安装， 它可以与一些模块打包工具很好地配合使用。
注意，authing目前仅能从pip3以上安装。

``` shell
# latest stable
$ pip install authing
```

## 开始使用

----------

``` python
from authing import Authing

clientId = 'your_client_id'
secret = 'your_app_secret'

authing = Authing(clientId, secret)

# 如果authing验证clientId和secret失败，将会抛出一个错误。所以在初始化构造函数的时候，可以使用try...catch保证程序不会挂掉。

user = authing.login({
    'email': 'test@testmail.com',
    'password': 'testpassword'
})

if user.get('errors'):
    # 出错
else:
    # 未出错
```

[怎样获取client ID ?](https://docs.authing.cn/#/quick_start/howto)。

获取Client ID和Client Secret，请[点击这里](https://docs.authing.cn/#/quick_start/howto)。

## 错误处理

----------

SDK中的接口返回数据若出错会存在"errors"字段，因此可以用如下代码检查是否出错：

``` python
result = authing.xxx() # 执行authing的某方法

if result.get('errors'):
    # 出错，如 
    """
    {'code': 500, 'message': 'Cast to ObjectId failed for value "5aec1ea610ecb800018db176xx" at path "_id" for model "User"', 'data': None, 'errors': True}
    """
else:
    # 未发生错误，直接使用数据即可，如：
    """
    {'_id': '5aec1ea610ecb800018db176', 'email': 'xieyang@dodora.cn', 'isDeleted': False}
    """
```
了解更多报错的详情，请查看[错误代码列表](https://docs.authing.cn/#/quick_start/error_code)。

[接口相关文档请点击这里](https://docs.authing.cn/#/user_service/add_user)。
