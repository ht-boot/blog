---
title: $attrs 的使用
outline: deep
author: ht
date: 2023-6
tags: ["vue"]
---

## vue3 , $attrs 的使用

> 简单来说，$attrs 是一个包含了父组件中绑定的非 Props 属性数据的对象。( $attrs 主要接收没在 props 里定义，但父组件又传过来的属性。)

例如一下代码：

```js
// 父组件
<template>
    <div class="parentNode">
      <MyInput a="1" b="232" c="3"></MyInput>
    </div>
</template>

// 子组件 $attrs接收没在 props 里定义，但父组件又传过来的属性.
<template>
  <div class="my-input">
    <el-input  />
    <div>{{ a }} {{ $attrs.b }} {{ $attrs.c }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  a: {
    type: String,
  },
});
</script>
```

> 说到这里，就会想起 $attrs 多用来做 ui 组件二次封装接收传递参数。所以再补充一下组件的二次封装。

### ui 组件的二次封装

```js
// 父组件
<template>
    <MyInput a="1" b="232" c="3" v-model="text">
    </MyInput>
</template>

<template>
  <div class="my-input">
    <el-input v-bind="$attrs">

    </el-input>
  </div>
</template>
```

到这里我们只完成了，子组件接收父组件传递的参数。 那么如果有插槽应该怎么办呢?

```js
// 父组件
 <MyInput a="1" b="232" c="3" v-model="text">
    <template #prepend>Http://</template>
    <template #append>.com</template>
  </MyInput>

// 子组件
<template>
  <div class="my-input">
    <el-input v-bind="$attrs">
      <template #prefix="scopedData">
        <slot name="prefix" v-bind="scopedData"></slot>
      </template>
      <template #suffix> <slot name="suffix"></slot> </template>
      <template #prepend> <slot name="prepend"></slot> </template>
      <template #append> <slot name="append"></slot> </template
    ></el-input>
  </div>
</template>
```

到这里就解决了 插槽的问题了。 但是看起来是不是很繁琐呢? 有没有更优的方案呢?

#### 更优的方案

```js
// 父组件
<MyInput a="1" b="232" c="3" v-model="text">
    <template #prepend>Http://</template>
    <template #append>.com</template>
</MyInput>


//子组件
<template>
  <div class="my-input">

    {/* 代码优化部分 */}
    <el-input v-bind="$attrs">
      <template v-for="(_item, name, i) in slots" #[name] :key="i">
        <slot :name="name"> </slot>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
// 获取使用的插槽
import { useSlots } from "vue";

const slots = useSlots();

console.log(slots);
</script>

```

ok， 到目前为止就写完了。
