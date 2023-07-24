---
title: nvm
outline: deep
author: ht
date: 2021-5
tags: ['Git']
---

### 🥔 nvm node 版本管理器

> 一个 nvm 可以管理多个 node 版本（包含 npm 与 npx），可以方便快捷的 安装、切换 不同版本的 node。  

#### 🥦 nvm 安装

下载地址 | [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

![Alt text](/image-1.png)

安装后打开终端 输入 `nvm -v` 显示以下这说明安装成功

![Alt text](/image.png)


#### 🥦 查看可安装 node 版本

```shell
nvm list available
```

#### 🥦 查看以安装 node 版本

```shell
nvm list
```

#### 🥦 安装 node 指定版本

```
nvm install <node 版本号>
```

#### 🥦 切换使用node

```
nvm use <安装的 node 版本号>
```


#### 🥦 卸载 node

```
nvm uninstall <安装的 node 版本号>
```

<p style="color: #DB7093">注意：在使用nvm-window 时得环境变量的配置，尤其Path 是否正确。</p>