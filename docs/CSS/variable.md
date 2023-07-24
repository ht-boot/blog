---
title: CSS 自定义属性
outline: deep
author: ht
date: 2022-3
tags: ['CSS']
---

### ✴️ CSS 自定义属性 (变量)

自定义属性也被叫做 CSS 变量， 它包含的值可以在整个变量中使用。

自定义属性：<span style="color: #CD5C5C"> 以 -- 开头（例如：--main-color: red;）, 由 var() 函数来获取（例如： color: var(--main-color)）。</span> 

```css

body {
    --main-bg-color: #CD5C5C;
}

.main-bg-color {
  background-color: var(--main-bg-color);
}
```

 ❗❗ 注意: 定义自定义属性的可见作用域，通常最佳方式是定义在根伪类 :root 下， 这样就可以在 HTML 文档的任何地方访问到它。

 #### 🟨 :root

 :root 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，:root 表示 `<html>` 元素, 除了优先级更高以外，与 html 选择器相同。


 ```css

 :root {
    --main-bg-color: #CD5C5C;
 }

 .main-bg-color {
  background-color: var(--main-bg-color);
}

 ```

:::warning 备注
自定义属性名是大小写敏感的， --my-color 和 --My-color 会被认为是两个不同的自定义属性。
:::
