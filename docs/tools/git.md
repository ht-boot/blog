---
title: Git
outline: deep
author: ht
date: 2021-5
tags: ["Git"]
---

### 🍉 Git 是什么？

> Git 是一个开源的分布式版本控制系统。

### 🍉 Git 学习推荐

> 推荐 Git 官网 | [https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)

### ⚙︎ Git 安装

- 我是用的 window 系统的。这里介绍 window 版本的。
- 下载地址: [https://git-scm.com/downloads](https://git-scm.com/downloads)。
- 安装包下载后，点击安装， 选择自己想安装的地址， 无脑点击 `next`。
- 安装完成后， 鼠标右键桌面， 选择 Git Bash, 输入以下命令。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改。

```sh

git config --global user.name "你的名字"
git config --global user.email "你的邮箱地址"

```

### 🍉 git 常用命令合集

>

#### 🥕 绑定远程仓库

创建一个本地的 Git 仓库。（文件夹内会多出 .git 的隐藏文件夹）

```shell
git init
git add README.md
git commit -m "first commit"
git remote add origin <地址>
git push -u origin master

```

通过命令行推送一个已存在的版本库

```shell
git remote add origin <地址>
git push -u origin master
```

#### 🥕 查看当前文件状态

```shell

git status

On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

```

表示跟踪的文件在上次已经提交都未被更改。

#### 🥕 状态简览

```shell

git status -s

M src/App.vue
M src/style.css
```

```shell
git status

On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/App.vue
        modified:   src/style.css
```

表示跟踪的文件 src 目录下 App.vue、style.css 在本地已经发生改变了。

#### 🥕 跟踪新文件

使用命令 git add 开始跟踪一个文件。 所以，要跟踪 README 文件，运行：

```shell
git add README
```

#### 🥕 忽略文件

一般有些文件不需要上传 Git 的管理。 这时我们要创建 创建一个 `.gitignore` 的文件， 列出要忽略的文件。

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

#### 🥕 查看未暂存文件修改部分

请注意，git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。

```shell

git diff

```

#### 🥕 提交更新

```shell

git commit - '提交注释'

```

#### 🥕 移除文件

从暂存区域移除某个文件, 可以用 git rm 命令完成此项工作，并连带从工作目录中删除指定的文件。

```shell

git rm README.md

```

#### 🥕 查看提交历史

```shell

git log

```

#### 🥕 修改 git 提交记录用

```shell

git commit --amend

```

#### 🥕 推送到远程仓库

git push 将你的暂存区代码推送到 github 上

```shell

git push

```

首次推送， 绑定完仓库后首次提交 push 要这样 👇

```shell
git push -u origin main
```

#### 🥕 代码克隆到本地

```shell
git clone 远程仓库代码地

```

克隆分支代码

```shell
git clone -b 分支代码地
```

#### 🥕 查看分支

```shell
git branch
```

#### 🥕 创建分支

```shell
git branch 分支名称
```

#### 🥕 切换分支

```shell
git checkout 分支名称
```

#### 🥕 创建并切换分支

```shell
git checkout -b 分支名称
```

#### 🥕 合并分支

注意： 将分支合并到当前分支

```shell
git merge 分支名称
```

#### 🥕 删除分支

```shell

git branch -d 分支名称

```

#### 🥕 拉取远程代码

```shell
git pull
```
