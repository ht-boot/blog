---
title: Vue3 computed watch
outline: deep
author: ht
date: 2021-5
tags: ["vscode", "JavaScript"]
---

### 🌮 vite.config.ts 文件配置

>

#### 🍊 server 配置（端口修改、跨域）

如有其他需求， 🖱[了解更多](https://cn.vitejs.dev/config/server-options.html#server-proxy)

```ts
server: {
  open: true, // 项目启动自动打开浏览器
  port: 8999, // 自定义端口号
  host: "0.0.0.0", // 开启本地ip
  strictPort: true, // 若端口已被占用则会直接退出，而不是尝试下一个可用端口。
  proxy: {
      '/api': {
        target: 'http://localhost:8080/', // 需要代理的地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite 重写路径,替换/api
      }
    }
  }
},
```

#### 🍊 css 配置 插入 css 预处理器

```sh
// 1. 安装css预处理插件
npm i less -D
npm i less-loader -D
```

```js
// 2. vite.config.ts 添加如下代码
css: {
  // css预处理器
  preprocessorOptions: {
    less: {
      charset: false,
      additionalData: '@import "./src/assets/style/global.less";', // 全局样式 可配置可不配置。
    },
    scss {
        // 配置
    }
  },
},

```

#### 🍊 路径别名与智能路径提示

定义路径别名是我们常用的一个功能， 我们通常会给 src 定义别名为@

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 路径别名
    },
  },
});
```

```json
// tsconfig.json
"compilerOptions": {
    // 配置@别名
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
}
```

如果运行不了或报错，安装@types/node

```sh

npm install @types/node

```

智能路径提示: 安装 vscode 插件 Path Autocomponent 。

安装好后就可以使用了。

![Alt text](/image-2.png)

#### 🍊 css.postcss 处理 css

PostCSS 是用来处理 css 的，可以通过添加各种插件来处理 css。像浏览器样式兼容问题、浏览器适配问题等等，都可以通过使用 PostCSS 来解决。  
我们只需要安装相应的插件即可。如移动端适配可使用 postcss-px-to-viewport 对不同设备进行布局适配。

```sh
npm install postcss-px-to-viewport -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import postcssPxToViewport from 'postcss-px-to-viewport'

export default defineConfig({
    css: {
        postcss: {
            plugins: {
                // viewport 布局适配
                postcssPxToViewport({
                    viewportWidth: 375
                })
            }
        }
    }
})
```
