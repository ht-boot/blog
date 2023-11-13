---
title: React 样式模块化引入
outline: deep
author: ht
date: 2023-1
tags: ["style", "react"]
---

## React 组件如何引入自己的样式？

> react 组件引入自己的样式， 如果直接使用 `import './index.less'` 那么会造成其他组件的类名相同时所出现的样式污染。

#### 如何组件内引入样式 （模块化样式管理）

```js
import styles from "./index.module.less";

const App = () => {
  return <div className={styles.box}>hello world</div>;
};
```
