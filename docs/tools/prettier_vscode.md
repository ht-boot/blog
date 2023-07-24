---
title: prettier 自动格式代码
outline: deep
author: ht
date: 2021-5
tags: ["vscode", "格式代码"]
---

### 🟩 用 prettier 和 vscode 实现代码自动格式化

1. 在 vscode 插件里搜索 prettier, 安装即可。
2. vscode 配置文件 setting.json 中加入以下代码。

```json
{
  "editor.formatOnSave": true,
  // vue 文件格式化配置
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  // javascript 文件格式化配置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // typescript 文件格式化配置
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.tabWidth": 2,
  "prettier.semi": true
}
```
