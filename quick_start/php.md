# authing-php-sdk

----------

Authing SDK for PHP目支持PHP5.6+。

[官方文档请点击这里](https://docs.authing.cn)。

## 安装

----------

#### composer

当构建大规模应用时，我们推荐使用```composer```进行安装， 它可以与一些模块打包工具很好地配合使用。

``` shell
# latest stable
$ composer require authing/authing-php-sdk
```

## 开始使用

----------

``` php
use Authing\Client;

try {
    $data = [
        'clientId' => 'your id',
        'secret'   => 'your secret',
    ];
    
    $client = new Client($data);

    $client->login([
                       'email' => '376155014@qq.com',
                       'password' => '654321',
                   ]);
} catch (\Exception $e) {
    // 出错了
    print_r($e->getMessage());
}
```

[怎样获取client ID ?](https://docs.authing.cn/#/quick_start/howto)。

获取Client ID和Client Secret，请[点击这里](https://docs.authing.cn/#/quick_start/howto)。

## 错误处理

----------

统一使用try...catch处理错误

了解更多报错的详情，请查看[错误代码列表](https://docs.authing.cn/#/quick_start/error_code)。

[接口相关文档请点击这里](https://docs.authing.cn/#/user_service/add_user)。
