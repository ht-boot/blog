---
title: git 绑定多个远程仓库
outline: deep
author: ht
date: 2021-5
tags: ['Git']
---

### 🍎 Git 绑定多个远程库

我们想要的时 git push 后代码自动提交到两个远程仓库，所有要绑定多个远程库。

#### 🌽 命令


- `git remote -v`

- `git remote add name 远程仓库地址`

这里的 `name` 是 自定义名称

```shell

git remote add github https://github.com/xxxxx/test.git

# 查看绑定的仓库
git remote -v
github  https://github.com/xxxx/test.git (fetch)
github  https://github.com/xxxx/test.git (push)
origin  https://gitee.com/xxxx/demo.git (fetch)
origin  https://gitee.com/xxxx/demo.git (push)

```

此后，若需进行push操作，则需要指定目标仓库，git push `<repo> <branch>`，对这两个远程仓库分别操作：
```sh
# 提交代码
git push origin master
git push github master
```

同理，pull操作也需要指定从哪个远程仓库拉取，git pull `<repo> <branch>`，从这两个仓库中选择其一:

```sh

git pull origin master
git pull github master
```