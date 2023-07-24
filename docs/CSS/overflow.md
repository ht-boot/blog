---
title: CSS 文本溢出
outline: deep
author: ht
date: 2022-5
tags: ['CSS']
---

### 〰︎ 单行文本溢出

```CSS

element {
    /* 文本字段不换行 */
    white-space: nowrap;
    /* 设置文本超出隐藏 */
    overflow: hidden;
    /* 设置文本超出部分用省略号显示 */
    text-overflow: ellipsis;
}

```

### 〰︎ 多行文本溢出

```CSS

element {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 将div 变成弹性伸缩盒子模型 */
    display: -webkit-box;
    /* 设置要出现省略号的行数，这里表示第三行出现省略号 */
    -webkit-line-clamp: 3;
    /* 设置或检索伸缩的子元素的排列方式 */
    -webkit-box-orient: vertical;


}

```