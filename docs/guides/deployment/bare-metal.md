# 基础部署模式

<LastUpdated/>

## 概述

基于编排的容器化部署运维逐渐已成为目前的主流方式，无论是基于 Kubernetes 还是 Docker 的基础设施环境，都可以通过编排的方式快速的搭建业务组件，同时也可以高效的运维管理，这里我们推荐你使用基于容器的部署方案。

[Kubernetes 部署模式](./kubernetes.md) 或者 [Docker 部署方案](./docker-compose.md)

当然我们也提供了传统的基于物理机部署 Authing 的方案，物理机部署的优势在于可以充分利用物理机的资源并且能够精细化控制部署流程。

本文描述了 Authing IDaaS 平台基础部署方案以及具体的操作指导。

## 整体架构

<img src="./images/basic-deployment.png" style="margin-top: 10px;" class="md-img-padding" />

Authing IDaaS 平台架构中主要组件包括：对象存储服务、Redis、ElasticSearch、Postgres 及 Authing Server。Authing Server 作为 Authing IDaaS 平台的主服务，接收来自客户端的请求；对象存储作为存储静态资源的服务；Redis 存储 Session 信息、数据缓存等；Postgres 用来存储核心业务数据；ElasticSearch 用作数据统计分析、日志采集分析的工作。

## 部署方案

**1. 组件规划**

|                         服务器                         |                            组件包                            |                          功能说明                           |
| :----------------------------------------------------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
| ElasticSearch<img width=180 class="md-table-padding"/> | elasticsearch-7.7.0<img width=180 class="md-table-padding"/> | 搜索引擎、日志服务<img width=180 class="md-table-padding"/> |
|                     Authing Server                     |                     authing-server-1.2.0                     |                       Authing 主服务                        |
|                         Redis                          |                         redis-4.0.0                          |                          缓存服务                           |
|                       PostgreSQL                       |                        postgres-12.5                         |                         数据库服务                          |
|                        Logstash                        |                        logstash-7.7.0                        |                     日志收集、分析服务                      |
|                       JDBC-River                       |                  jdbc-logstash-river:1.0.0                   |                        后台数据服务                         |
|                      Staticfiles                       |                  authing-staticfiles:1.0.0                   |                        静态资源服务                         |

**2. 系统环境要求**

服务器配置：

| 项目 <img width=180 class="md-table-padding"/> | 最低配置<img width=180 class="md-table-padding"/> | 推荐配置 <img width=180 class="md-table-padding"/> |
| :--------------------------------------------: | :-----------------------------------------------: | :------------------------------------------------: |
|                      CPU                       |                  X86 64 位 8 核                   |                  X86 64 位 16 核                   |
|                      内存                      |                       32 GB                       |                    64 GB 及以上                    |
|                      硬盘                      |                      500 GB                       |                        2 TB                        |
|                    内网带宽                    |                     100 Mbps                      |                       1 Gbps                       |

操作系统环境要求：
| 项目 <img width=180 class="md-table-padding"/> | 最低配置 <img width=180 class="md-table-padding"/> | 推荐配置 <img width=180 class="md-table-padding"/> |
| :----: | :----: | :----: |
| 操作系统平台 | linux/amd64 | - |
| 内核版本 | linux 3.10.0 及以上 | - |

**3. 相关文档**

| 名称 <img width=350 class="md-table-padding"/> | 说明 <img width=350 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|   《Authing IDaaS 平台使用指南 1.2.0 版本》    |        介绍 Authing IDaaS 平台操作指导         |
|   《Authing IDaaS 平台产品文档 1.2.0 版本》    |        介绍 Authing IDaaS 平台产品功能         |

**注：以上资源请联系 <a href="mailto:sales@authing.cn">Authing 售前人员</a> 获取。**

**4. 安装包**

| 名称 <img width=350 class="md-table-padding"/> | 说明 <img width=350 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|    authing-jdbc-logstash-river-1.0.0.tar.gz    |           Authing 后端数据服务安装包           |
|          authing-server-1.2.0.tar.gz           |               Authing 服务安装包               |
|        authing-staticfiles-1.0.0.tar.gz        |               静态资源服务安装包               |
|    elasticsearch-7.7.0-linux-x86_64.tar.gz     |            ElasticSearch 服务安装包            |
|       logstash-7.7.0-linux-x86_64.tar.gz       |              Logstash 服务安装包               |
|       postgres-12.5-linux-x86_64.tar.gz        |             PostgreSQL 服务安装包              |
|        redis-4.0.0-linux-x86_64.tar.gz         |                Redis 服务安装包                |

**注：以上资源请联系 <a href="mailto:sales@authing.cn">Authing 售前人员</a> 获取。**
