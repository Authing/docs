# 在本地如何联表 {{$localeConfig.brandName}} 用户与你的业务数据

<LastUpdated/>

如果你使用 {{$localeConfig.brandName}} ，你的用户资料将安全地存储在 {{$localeConfig.brandName}} 云上的数据库中，你不需要额外保存一份用户资料。你需要在本地将你的业务数据与 {{$localeConfig.brandName}} 用户进行联表，通过用户 ID（User ID）和业务数据进行关联。

比如你的业务系统中有一个订单表（orders），他自身的表结构如下：

```sql
CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_no` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单编号',
  `order_sn` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易号',
  `supplier_id` int(11) NOT NULL COMMENT '商户编码',
  `supplier_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商户名称',
  `order_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '订单状态 0未付款,1已付款,2已发货,3已签收,-1退货申请,-2退货中,-3已退货,-4取消交易',
  `after_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户售后状态 0 未发起售后 1 申请售后 -1 售后已取消 2 处理中 200 处理完毕',
  `product_count` int(11) NOT NULL DEFAULT '0' COMMENT '商品数量',
  `product_amount_total` decimal(12,4) NOT NULL COMMENT '商品总价',
  `order_amount_total` decimal(12,4) NOT NULL DEFAULT '0.0000' COMMENT '实际付款金额',
  `logistics_fee` decimal(12,4) NOT NULL COMMENT '运费金额',
  `address_id` int(11) NOT NULL COMMENT '收货地址编码',
  `pay_channel` tinyint(4) NOT NULL DEFAULT '0' COMMENT '支付渠道 0余额 1微信 2支付宝',
  `out_trade_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '订单支付单号',
  `escrow_trade_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '第三方支付流水号',
  `pay_time` int(11) NOT NULL DEFAULT '0' COMMENT '付款时间',
  `delivery_time` int(11) NOT NULL DEFAULT '0' COMMENT '发货时间',
  `order_settlement_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '订单结算状态 0未结算 1已结算',
  `order_settlement_time` int(11) NOT NULL DEFAULT '0' COMMENT '订单结算时间',
  `is_package` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否是套餐',
  `is_integral` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否是积分产品',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_order_sn_unique` (`order_sn`),
  KEY `order_order_sn_member_id_order_status_out_trade_no_index` (`order_sn`,`member_id`,`order_status`,`out_trade_no`(191))
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

你可以创建一个字段 `owner_id` 表示订单所有者的 ID：

- 数据类型为 varchar(32)；
- 它存储的值应该为 {{$localeConfig.brandName}} 用户的 ID；

```sql
ALTER TABLE orders ADD COLUMN `owner_id` varchar(32) NOT NULL COMMENT '订单所有者用户 ID',
```

如果你需要查询某个用户的所有订单，可以使用以下 `SQL` 语句：

```sql
SELECT * FROM orders WHERE owner_id = '6035120c3xxxxxe890e080db'
```